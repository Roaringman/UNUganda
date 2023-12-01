import { LayersControl, LayerGroup } from "react-leaflet"
import React, { useState, useEffect, useMemo } from "react"
import { useMap, useMapEvent } from "react-leaflet/hooks"
import Districts from "./layers/District"
import SubCounties from "./layers/SubCouncties"
import Legend from "./Legend"

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
  const zoomBounds = props.zoomBounds
  const zoomToBounds = props.zoomToBounds

  const categoryColor = props.categoryColor

  const map = props.map

  const [districtName, setDistrictName] = useState()
  const [bounds, setBounds] = useState()

  function capitalizeFirstLetter(word) {
    const firstLetter = word.charAt(0).toUpperCase()
    const remaining = word.slice(1).toLowerCase()

    return firstLetter + remaining
  }

  function shortToLongThreat(shortName) {
    switch (shortName) {
      case "N":
        return "No Threat"
      case "VL":
        return "Very Low"
      case "L":
        return "Low"
      case "M":
        return "Medium"
      case "H":
        return "High"
      case "VH":
        return "Very High"
      default:
        return null
    }
  }

  /* var tempBounds = zoomBounds
  if (zoomBounds === tempBounds) {
    map.fitBounds(zoomBounds)
  }*/

  function filterSubcounties(district, subcounties) {
    let filteredSubcounties = []

    filteredSubcounties = subcounties.features.filter(
      (county) => county.properties.District === district.properties.District
    )

    setFilteredCounties(filteredSubcounties)
  }

  const sectorRiskColor = ["#7DE1AB", "#FDFF89", "#FA3A7F"]
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
        zoomBounds={zoomBounds}
        zoomToBounds={zoomToBounds}
        shortToLongThreat={shortToLongThreat}
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
        shortToLongThreat={shortToLongThreat}
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
        shortToLongThreat={shortToLongThreat}
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
        shortToLongThreat={shortToLongThreat}
      ></SubCounties>
    </>
  )
}

export default LayerHandling
