import { Polygon, Tooltip, Circle, LayerGroup } from "react-leaflet"
import React, { useState, useEffect, useMemo } from "react"
import * as turf from "@turf/turf"

function SubCounties(props) {
  const categoryColor = props.categoryColor
  const filteredCounties = props.filteredCounties
  const setFilteredCounties = props.setFilteredCounties
  const map = props.map
  const startingBounds = props.startingBounds
  const selectedThreat = props.selectedThreat
  const setSelectedDistrict = props.setSelectedDistrict
  const populationToggle = props.population
  const capitalizeFirstLetter = props.capitalizeFirstLetter

  return (
    <>
      {filteredCounties.map((subcounty) => {
        const coordinates = subcounty.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ])
        if (coordinates.length >= 4) {
          const polygon = turf.polygon([coordinates])
          const center = turf.centerOfMass(polygon)
          return (
            <>
              {populationToggle !== "show" ? (
                <Polygon
                  pathOptions={{
                    fillColor: categoryColor(
                      selectedThreat,
                      subcounty.properties[selectedThreat]
                    ),
                    fillOpacity: 1,
                    weight: 2,
                    opacity: 1,
                    dashArray: 3,
                    color: "white",
                    key: subcounty.properties.Subcounty,
                  }}
                  positions={coordinates}
                  key={subcounty.properties.OBJECTID}
                  eventHandlers={{
                    contextmenu: (e) => {
                      setSelectedDistrict("")
                      setFilteredCounties([])
                      map.fitBounds(startingBounds)
                    },
                    click: (e) => {
                      setSelectedDistrict("")
                      setFilteredCounties([])
                      map.fitBounds(startingBounds)
                    },
                    mouseover: (e) => {
                      const layer = e.target
                      layer.setStyle({
                        dashArray: "",
                        weight: 7,
                        opacity: 1,
                        color: "white",
                      })
                    },
                    mouseout: (e) => {
                      const layer = e.target
                      layer.setStyle({
                        weight: 2,
                        dashArray: "3",
                        color: "white",
                        fillColor: categoryColor(
                          selectedThreat,
                          subcounty.properties[selectedThreat]
                        ),
                      })
                    },
                  }}
                >
                  <Tooltip>
                    <h3>
                      {capitalizeFirstLetter(subcounty.properties.Subcounty)}
                    </h3>
                    <p>
                      {`${capitalizeFirstLetter(selectedThreat)} threat : ${
                        subcounty.properties[selectedThreat]
                          ? capitalizeFirstLetter(
                              subcounty.properties[selectedThreat]
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
                    subcounty.properties[selectedThreat]
                      ? subcounty.properties[selectedThreat]
                      : "none"
                  )}
                  fillOpacity={1}
                  color={"white"}
                  key={`${subcounty.properties.Subcounty}-circle`}
                  radius={
                    subcounty.properties.Population
                      ? subcounty.properties.Population / 20
                      : 10
                  }
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
                        fillColor: categoryColor(
                          selectedThreat,
                          subcounty.properties[selectedThreat]
                        ),
                        weight: 2,
                        color: "white",
                      })
                    },
                  }}
                >
                  <Tooltip>
                    {subcounty.properties.Population
                      ? `${capitalizeFirstLetter(
                          subcounty.properties.Subcounty
                        )} population: ${subcounty.properties.Population}`
                      : `${capitalizeFirstLetter(
                          subcounty.properties.Subcounty
                        )} no data`}
                    <br />
                    {`${capitalizeFirstLetter(selectedThreat)} threat : ${
                      subcounty.properties[selectedThreat]
                        ? capitalizeFirstLetter(
                            subcounty.properties[selectedThreat]
                          )
                        : "No data"
                    }`}
                  </Tooltip>
                </Circle>
              )}

              {/*populationToggle === "show" ? (
              <Circle
                weight={1}
                fillColor={"black"}
                fillOpacity={0}
                color={"black"}
                key={2000 + Math.ceil(Math.random() * 3000)}
                radius={
                  population[0] ? population[0].SUM_Population / 100 : 100
                }
                center={center.geometry.coordinates}
              >
                <Tooltip>
                  {population[0]
                    ? `${districtName} population: ${population[0].SUM_Population}`
                    : `${districtName} no data`}
                </Tooltip>
              </Circle>
            ) : null}

            {sector !== null ? (
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
            ) : null */}
            </>
          )
        }
      })}
    </>
  )
}

export default SubCounties
