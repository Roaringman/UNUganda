import { Polygon, Tooltip, Circle } from "react-leaflet"
import React from "react"
import * as turf from "@turf/turf"

function Districts(props) {
  const districts = props.districts
  const selectedThreat = props.selectedThreat
  const map = props.map
  const districtName = props.districtName
  const sector = props.sector
  const populationToggle = props.population
  const populationDistrict = props.populationDistrict
  const sectorRiskColor = props.sectorRiskColor
  const subcounties = props.subcounties
  const selectedDistrict = props.selectedDistrict
  const bounds = props.bounds

  const categoryColor = props.categoryColor
  const filterSubcounties = props.filterSubcounties
  const setFilteredCounties = props.setFilteredCounties
  const setSelectedDistrict = props.setSelectedDistrict
  const capitalizeFirstLetter = props.capitalizeFirstLetter
  return (
    <>
      {districts.features
        .sort((apop, bpop) => {
          return bpop.properties.Dist_pop_N - apop.properties.Dist_pop_N
        })
        .map((district) => {
          const coordinates = district.geometry.coordinates[0].map((item) => [
            item[1],
            item[0],
          ])

          if (coordinates.length >= 4) {
            const polygon = turf.polygon([coordinates])
            const center = turf.centerOfMass(polygon)

            const population = populationDistrict.filter(
              (districtData) =>
                districtData.District.toUpperCase() ===
                district.properties.District
            )

            const sectorThreat = props.sectorThreat.filter(
              (sectorData) =>
                sectorData.District.toUpperCase() ===
                district.properties.District
            )
            return populationToggle !== "show" ? (
              <Polygon
                pathOptions={{
                  fillColor: categoryColor(
                    selectedThreat,
                    district.properties[selectedThreat]
                      ? district.properties[selectedThreat]
                      : "none"
                  ),
                  fillOpacity:
                    district.properties.District === selectedDistrict
                      ? 0
                      : selectedDistrict != ""
                      ? 0.2
                      : 1,
                  weight: 2,
                  opacity:
                    district.properties.District === selectedDistrict ? 0.2 : 1,
                  dashArray: 1,
                  color: "white",
                }}
                key={district.properties.District}
                positions={coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target
                    layer.setStyle({
                      weight: 7,
                      fillOpacity: 1,
                      color: "white",
                    })
                  },
                  mouseout: (e) => {
                    const layer = e.target
                    layer.setStyle({
                      fillOpacity: selectedDistrict != "" ? 0.2 : 1,
                      weight: 2,
                      dashArray: "3",
                      color: "white",
                    })
                  },
                  preclick: (e) => {
                    filterSubcounties(district, subcounties)
                  },
                  click: (e) => {
                    if (district.properties.District === selectedDistrict) {
                      setSelectedDistrict("")
                      setFilteredCounties([])
                      //map.fitBounds(bounds)
                    } else {
                      setSelectedDistrict(district.properties.District)
                      //map.fitBounds(e.target.getBounds())
                    }
                  },
                }}
              >
                <Tooltip>
                  <h3>{capitalizeFirstLetter(district.properties.District)}</h3>
                  <p>
                    {`${capitalizeFirstLetter(selectedThreat)} threat : ${
                      district.properties[selectedThreat]
                        ? capitalizeFirstLetter(
                            district.properties[selectedThreat]
                          )
                        : "No data"
                    }`}
                  </p>
                </Tooltip>
              </Polygon>
            ) : (
              <Circle
                weight={2}
                fillColor={categoryColor(
                  selectedThreat,
                  district.properties[selectedThreat]
                    ? district.properties[selectedThreat]
                    : "none"
                )}
                fillOpacity={1}
                color={"white"}
                key={`${district.properties.District}-circle`}
                radius={population[0] ? population[0].SUM_Population / 40 : 100}
                center={center.geometry.coordinates}
                eventHandlers={{
                  mouseover: (e) => {
                    const layer = e.target
                    layer.setStyle({
                      weight: 7,
                      fillOpacity: 1,
                      color: "white",
                    })
                  },
                  mouseout: (e) => {
                    const layer = e.target
                    layer.setStyle({
                      fillOpacity: selectedDistrict != "" ? 0.2 : 1,
                      weight: 2,
                      color: "white",
                    })
                  },
                  preclick: (e) => {
                    filterSubcounties(district, subcounties)
                  },
                  click: (e) => {
                    if (district.properties.District === selectedDistrict) {
                      setSelectedDistrict("")
                      setFilteredCounties([])
                      //map.fitBounds(bounds)
                    } else {
                      setSelectedDistrict(district.properties.District)
                      //map.fitBounds(e.target.getBounds())
                    }
                  },
                }}
              >
                <Tooltip>
                  {population[0]
                    ? `${capitalizeFirstLetter(
                        district.properties.District
                      )} population: ${population[0].SUM_Population}`
                    : `${capitalizeFirstLetter(
                        district.properties.District
                      )} no data`}
                  <br />
                  {`${capitalizeFirstLetter(selectedThreat)} threat : ${
                    district.properties[selectedThreat]
                      ? capitalizeFirstLetter(
                          district.properties[selectedThreat]
                        )
                      : "No data"
                  }`}
                </Tooltip>
              </Circle>
            )

            /*{sector !== null ? (
                <Circle
                  weight={1}
                  fillColor={
                    sectorRiskColor[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
                  }
                  fillOpacity={0.5}
                  color={"#45DA89"}
                  key={2000 + Math.ceil(Math.random() * 3000)}
                  radius={
                    population[0]
                      ? (population[0].SUM_Population / 100) *
                          Math.random() *
                          (1.5 - 0.5 + 1) +
                        0.5
                      : 100
                  }
                  center={center.geometry.coordinates}
                ></Circle>
              ) : null}*/
          }
        })}
    </>
  )
}
export default Districts
