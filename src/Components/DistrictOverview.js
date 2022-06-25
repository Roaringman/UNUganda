
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polygon, Tooltip } from 'react-leaflet'
import React, { useState, useEffect, useMemo  } from 'react';
import { useMap, useMapEvent } from 'react-leaflet/hooks'

function DistrictOverview(props) {

    const districtData = props.population.filter(districtData => districtData.District.toUpperCase() === props.districtName )

    return (
        <>

    <section id="district-info-container">

    <article id="district-info">
    <div class="district-info-row">
        <h1 id="district-info-titel">
            {
                `${props.districtName} ${props.selectedThreat}`
            }
        </h1>
    </div>
    <div class="district-info-row">
        <div class="district-info-block">
            <h2>
            Risks at a glance
            </h2>

            {districtData[0] &&
            <p>
                Mean Permanent Floor: {districtData[0].MEAN_Permanent_floor} etc.
            </p>
            } 
           
        </div>
        <div class="district-info-block">
        <h2>
            Key Indicators
            </h2>
        </div>
    </div>

    <div class="district-info-row">
        <div class="district-info-block">
            <h3>
            Sectors at Risk
            </h3>
        </div>
        <div class="district-info-block">
            <h3>
            Monthly Rainfall
            </h3>
        </div>
     </div>

     <div class="district-info-row">

        <div class="district-info-block">
            
            <h3>Adaption Solutions</h3>

            <p>Spatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as populationserved (power plants and substations), passenger trips Spatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population

served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger trips</p>
        </div>
     </div>
    </article>


    {
   
    }
    </section>

  </>)
}




export default DistrictOverview;