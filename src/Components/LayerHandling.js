import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Polygon,
  Tooltip,
  Circle,
  LayersControl,
  LayerGroup,
} from "react-leaflet"
import React, { useState, useEffect, useMemo } from "react"
import { useMap, useMapEvent } from "react-leaflet/hooks"
import * as turf from "@turf/turf"

function LayerHandling(props) {
  const districts = props.districtGeom
  const startingBounds = props.startingBounds
  const subcounties = props.subcounties

  const timeScale = props.selectedTimeScale
  const selectedThreat = props.selectedThreat
  const populationToggle = props.populationToggle
  const sector = props.sectorSelector

  const [districtName, setDistrictName] = useState()
  const [filteredCounties, setFilteredCounties] = useState([])
  const [bounds, setBounds] = useState()

  function categoryColor(threat, level) {
    console.log(threat, level)
    const colors = {
      flood: { Low: "#4AA8E8", Medium: "#4E84F2", High: "#515ADB" },
      heatwave: { Low: "#DFA652", Medium: "#F59B4E", High: "#EB7D4B" },
      drought: {
        "Very Low": "Green",
        Low: "#DF7252",
        Medium: "#F55D4E",
        High: "#EB4B6B",
        "Very High": "Black",
        "No Threat": "pink",
      },
      landslide: { Low: "#E6D6BA", Medium: "#E0B973", High: "#615031" },
    }
    const categoryColor = colors[`${threat}`][`${level}`]
      ? colors[`${threat}`][`${level}`]
      : "transparent"
    return categoryColor
  }

  const sectorRiskColor = ["#7DE1AB", "#FDFF89", "#FA3A7F"]
  const map = useMap()
  return (
    <>
      <LayersControl.Overlay name="Layer 1">
        <LayerGroup>
          {districts.features.map((district) => {
            const coordinates = district.geometry.coordinates[0].map((item) => [
              item[1],
              item[0],
            ])

            if (coordinates.length >= 4) {
              const polygon = turf.polygon([coordinates])
              const center = turf.centerOfMass(polygon)

              const population = props.population.filter(
                (districtData) =>
                  districtData.District.toUpperCase() ===
                  district.properties.District
              )

              const sectorThreat = props.sectorThreat.filter(
                (sectorData) =>
                  sectorData.District.toUpperCase() ===
                  district.properties.District
              )

              //console.log("timeScale", timeScale)
              //console.log("population", population)
              //console.log("sectorThreat", sectorThreat)
              //console.log("props.selectedThreat", props.selectedThreat)
              //console.log("sectorThreat[0]", sectorThreat[0])
              //console.log("populationToggle", populationToggle)
              //console.log("sector", sector)

              console.log(district.properties[selectedThreat])

              return (
                <>
                  <Polygon
                    pathOptions={{
                      fillColor: categoryColor(
                        selectedThreat,
                        district.properties[selectedThreat]
                          ? district.properties[selectedThreat]
                          : "none"
                      ),
                      fillOpacity:
                        district.properties.District === props.selectedDistrict
                          ? 0
                          : 1,
                      weight: 2,
                      opacity: 1,
                      dashArray: 1,
                      color: "white",
                    }}
                    key={district.properties.OBJECTID_1}
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
                          fillOpacity: 1,
                          weight: 2,
                          dashArray: "3",
                          color: "white",
                        })
                      },
                      preclick: (e) => {
                        let filteredSubcounties = []

                        filteredSubcounties = subcounties.features.filter(
                          (county) =>
                            county.properties.District ===
                            district.properties.District
                        )

                        setFilteredCounties(filteredSubcounties)
                      },
                      click: (e) => {
                        if (
                          district.properties.District ===
                          props.selectedDistrict
                        ) {
                          props.setSelectedDistrict("")
                          setFilteredCounties([])
                          map.fitBounds(props.bounds)
                        } else {
                          props.setSelectedDistrict(
                            district.properties.District
                          )
                          map.fitBounds(e.target.getBounds())
                        }
                      },
                    }}
                  >
                    <Tooltip>
                      <p>
                        {district.properties.District.toLowerCase()}
                        <br></br>
                        {`${selectedThreat} threat : ${
                          district.properties[selectedThreat]
                            ? district.properties[selectedThreat]
                            : "No data"
                        }`}
                      </p>
                    </Tooltip>
                  </Polygon>

                  {populationToggle === "show" ? (
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
                        sectorRiskColor[
                          Math.floor(Math.random() * (2 - 0 + 1)) + 0
                        ]
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
                  ) : null}
                </>
              )
            }
          })}

          {filteredCounties.map((subcounty) => {
            if (subcounty.geometry.type === "MultiPolygon") {
              console.log(
                subcounty.geometry.coordinates,
                subcounty.properties.OBJECTID
              )
            }
            const coordinates = subcounty.geometry.coordinates[0].map(
              (item) => [item[1], item[0]]
            )
            return (
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
                }}
                positions={coordinates}
                key={subcounty.properties.OBJECTID}
                eventHandlers={{
                  contextmenu: (e) => {
                    props.setSelectedDistrict("")
                    setFilteredCounties([])
                    map.fitBounds(props.bounds)
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
                  <h1>{subcounty.properties.Subcounty}</h1>
                  <p>
                    {selectedThreat}: {subcounty.properties[selectedThreat]}
                  </p>
                </Tooltip>
              </Polygon>
            )
          })}
        </LayerGroup>
      </LayersControl.Overlay>
    </>
  )
}

export default LayerHandling
