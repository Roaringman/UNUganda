import { LayersControl, LayerGroup } from "react-leaflet"
import React, { useState, useEffect, useMemo } from "react"
import { useMap, useMapEvent } from "react-leaflet/hooks"
import Districts from "./layers/District"
import SubCounties from "./layers/SubCouncties"

function LayerHandling(props) {
  const districts = props.districtGeom
  const startingBounds = props.startingBounds
  const subcounties = props.subcounties
  const timeScale = props.selectedTimeScale
  const selectedThreat = props.selectedThreat
  const population = props.population
  const populationDistrict = props.populationDistrict
  const sector = props.sectorSelector
  const sectorThreat = props.sectorThreat
  const selectedDistrict = props.selectedDistrict
  const setSelectedDistrict = props.setSelectedDistrict

  const [districtName, setDistrictName] = useState()
  const [filteredCounties, setFilteredCounties] = useState([])
  const [bounds, setBounds] = useState()

  function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0).toUpperCase()
    const remaining = word.slice(1).toLowerCase()

    return firstLetter + remaining
  }

  function categoryColor(threat, level) {
    const colors = {
      flood: { Low: "#4AA8E8", Medium: "#4E84F2", High: "#515ADB" },
      heatwave: { Low: "#DFA652", Medium: "#F59B4E", High: "#EB7D4B" },
      drought: {
        "Very Low": "#fee5d9",
        Low: "#fcae91",
        Medium: "#fb6a4a",
        High: "#de2d26",
        "Very High": "#a50f15",
        "No Threat": "#d3d3d3",
      },
      landslide: { Low: "#E6D6BA", Medium: "#E0B973", High: "#615031" },
    }
    const categoryColor = colors[`${threat}`][`${level}`]
      ? colors[`${threat}`][`${level}`]
      : "transparent"
    return categoryColor
  }

  function filterSubcounties(district, subcounties) {
    let filteredSubcounties = []

    filteredSubcounties = subcounties.features.filter(
      (county) => county.properties.District === district.properties.District
    )

    setFilteredCounties(filteredSubcounties)
  }

  const sectorRiskColor = ["#7DE1AB", "#FDFF89", "#FA3A7F"]
  const map = useMap()
  return selectedThreat === "drought" ? (
    <>
      <LayersControl.BaseLayer checked name={`${selectedThreat} risk`}>
        <LayerGroup>
          <Districts
            districts={districts}
            subcounties={subcounties}
            selectedThreat={selectedThreat}
            map={map}
            populationDistrict={populationDistrict}
            population={population}
            districtName={districtName}
            sector={sector}
            sectorRiskColor={sectorRiskColor}
            sectorThreat={sectorThreat}
            categoryColor={categoryColor}
            filterSubcounties={filterSubcounties}
            setFilteredCounties={setFilteredCounties}
            capitalizeFirstLetter={capitalizeFirstLetter}
            setSelectedDistrict={setSelectedDistrict}
            selectedDistrict={selectedDistrict}
            bounds={bounds}
          ></Districts>
          <SubCounties
            selectedThreat={selectedThreat}
            map={map}
            population={population}
            startingBounds={startingBounds}
            filteredCounties={filteredCounties}
            setSelectedDistrict={setSelectedDistrict}
            setFilteredCounties={setFilteredCounties}
            categoryColor={categoryColor}
            capitalizeFirstLetter={capitalizeFirstLetter}
          ></SubCounties>
        </LayerGroup>
      </LayersControl.BaseLayer>
    </>
  ) : (
    <>
      <LayersControl.BaseLayer name={`${selectedThreat} risk`}>
        <LayerGroup>
          <Districts
            districts={districts}
            subcounties={subcounties}
            selectedThreat={selectedThreat}
            map={map}
            populationDistrict={populationDistrict}
            population={population}
            districtName={districtName}
            sector={sector}
            sectorRiskColor={sectorRiskColor}
            sectorThreat={sectorThreat}
            categoryColor={categoryColor}
            filterSubcounties={filterSubcounties}
            setFilteredCounties={setFilteredCounties}
            capitalizeFirstLetter={capitalizeFirstLetter}
            setSelectedDistrict={setSelectedDistrict}
            selectedDistrict={selectedDistrict}
            bounds={bounds}
          ></Districts>
          <SubCounties
            selectedThreat={selectedThreat}
            map={map}
            population={population}
            startingBounds={startingBounds}
            filteredCounties={filteredCounties}
            setSelectedDistrict={setSelectedDistrict}
            setFilteredCounties={setFilteredCounties}
            categoryColor={categoryColor}
            capitalizeFirstLetter={capitalizeFirstLetter}
          ></SubCounties>
        </LayerGroup>
      </LayersControl.BaseLayer>
    </>
  )
}

export default LayerHandling
