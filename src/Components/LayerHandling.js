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
  const filteredCounties = props.filteredCounties
  const setFilteredCounties = props.setFilteredCounties

  const [districtName, setDistrictName] = useState()
  const [bounds, setBounds] = useState()

  function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0).toUpperCase()
    const remaining = word.slice(1).toLowerCase()

    return firstLetter + remaining
  }

  function categoryColor(threat, level) {
    const colors = {
      flood: {
        N: "#ffffff",
        VL: "#eff3ff",
        L: "#bdd7e7",
        M: "#6baed6",
        H: "#3182bd",
        VH: "#08519c",
      },
      heatwave: {
        VL: "#feebe2",
        L: "#fbb4b9",
        M: "#f768a1",
        H: "#c51b8a",
        VH: "#7a0177",
        N: "#ffffff",
      },
      drought: {
        VL: "#fee5d9",
        L: "#fcae91",
        M: "#fb6a4a",
        H: "#de2d26",
        VH: "#a50f15",
        N: "#ffffff",
      },
      landslide: {
        N: "#ffffff",
        VL: "#ffffd4",
        L: "#fed98e",
        M: "#fe9929",
        H: "#d95f0e",
        VH: "#993404",
      },
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
    </>
  ) : (
    <>
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
    </>
  )
}

export default LayerHandling
