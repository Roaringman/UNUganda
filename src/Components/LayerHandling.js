
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polygon, Tooltip, Circle } from 'react-leaflet'
import React, { useState, useEffect, useMemo  } from 'react';
import { useMap, useMapEvent } from 'react-leaflet/hooks';
import * as turf from '@turf/turf';

function LayerHandling(props) {

    
    const geodata = props.data
    const startingBounds = props.startingBounds

    const [districtName, setDistrictName] = useState();
    const [bounds, setBounds] = useState();

    function categoryColor(threat, level){
        const colors = {"flood": {"Low" : "#4AA8E8","Medium": "#4E84F2","High": "#515ADB"},
         "heatwave":{"Low": "#DFA652","Medium": "#F59B4E","High": "#EB7D4B"},
         "drought":{"Low": "#DF7252","Medium": "#F55D4E","High":"#EB4B6B"},
         "landslide":{"Low": "#E6D6BA","Medium": "#E0B973","High":"#615031" }}

         const categoryColor = colors[`${threat}`][`${level}`]

         return categoryColor

    }
   


    const map = useMap()

    return (
        <>

{
    geodata.features.map((district) => {
      const coordinates = district.geometry.coordinates[0].map((item) => [item[1], item[0]]);

    if(coordinates.length >= 4){

      const polygon = turf.polygon([coordinates]);
      const center = turf.centerOfMass(polygon);

      const population = props.population.filter(districtData => districtData.District.toUpperCase() === district.properties.District_2 )
      const sectorThreat = props.sectorThreat.filter(sectorData => sectorData.District.toUpperCase() === district.properties.District_2 )

      return (<><Polygon
        pathOptions={{
          fillColor: categoryColor(props.selectedThreat, sectorThreat[0] ? sectorThreat[0].flood2020threat : "none" ),
          fillOpacity: 0.7,
          weight: 2,
          opacity: 1,
          dashArray: 3,
          color: 'white'
        }}
        key ={district.properties.OBJECTID_1}
        positions={coordinates}
        eventHandlers={{

          mouseover: (e) => {
            const currentDistrictName = district.properties.District_2.toLowerCase()
            setDistrictName(currentDistrictName.charAt(0).toUpperCase() + currentDistrictName.slice(1))

            const layer = e.target;
            layer.setStyle({
              dashArray: "",
              fillColor: "#BD0026",
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              color: "white",
            })
          },
          mouseout: (e) => {
            if(district.properties.District_2 == props.selectedDistrict){

            const layer = e.target;
            layer.setStyle({
              fillOpacity: 0.7,
              weight: 2,
              dashArray: "3",
              color: 'white',
              fillColor: '#FD8D3C'
            });
        }
          },
          click: (e) => {
            const bounds = e.target._bounds
            if(district.properties.District_2 === props.selectedDistrict){
                props.setSelectedDistrict("")
                map.fitBounds(props.bounds)
            }else{
                props.setSelectedDistrict(district.properties.District_2)
                map.fitBounds([
                    [bounds._southWest.lat, bounds._southWest.lng],
                    [bounds._northEast.lat, bounds._northEast.lng],
                  ])

            }
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 1,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#000000'
                });
          }
        }}>

    
      <Tooltip>{districtName}</Tooltip>
      </Polygon>

      <Circle key={2000+Math.ceil(Math.random()*3000)} radius={population[0] ? (population[0].SUM_Population/100) : 100} center={center.geometry.coordinates}>

          <Tooltip>
            {population[0] ? `${districtName} population: ${population[0].SUM_Population}` : `${districtName} no data`}
          </Tooltip>
      </Circle>
        
        </>
        
        
        )
    }})
  } 
        

  </>)

}




export default LayerHandling;