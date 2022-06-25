import './App.css';
import LayerHandling  from './Components/LayerHandling';
import DistrictOverview from './Components/DistrictOverview';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polygon, Tooltip } from 'react-leaflet'
import { ugandaDistricts } from './Data/uganda_districts.js';
import React, { useState } from 'react';
import { useMap, useMapEvent } from 'react-leaflet/hooks'
import { populationDistrict } from './Data/populationData_districts';
import { sectorThreat_agriculture_district } from './Data/sectorThreat_agriculture_district';


function App() {

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedThreat, setSelectedThreat] = useState("flood");


  const startingBounds =  [[4.226101095480792, 34.61213931437568],
  [-1.4465324972187859, 29.51102531366363]]


  return (
    <>

<button onClick={() => setSelectedThreat("flood")}>    Flood
  </button>
  <button onClick={() => setSelectedThreat("drought")}>    Drought
  </button>
  <button onClick={() => setSelectedThreat("heatwave")}>    Heatwave
  </button>
  <button onClick={() => setSelectedThreat("landslide")}>    Landslide
  </button>

<MapContainer bounds={startingBounds} scrollWheelZoom={false}  dragging={false} doubleClickZoom={false} zoomControl={false}>
  <TileLayer
    attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
  />


<LayerHandling selectedThreat = {selectedThreat} population = {populationDistrict} data = {ugandaDistricts} bounds = {startingBounds} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} sectorThreat={sectorThreat_agriculture_district}/>

</MapContainer>

{
 
 selectedDistrict.length > 0 &&
 <DistrictOverview selectedThreat = {selectedThreat} districtName={selectedDistrict} population={populationDistrict} sectorThreat={sectorThreat_agriculture_district}>

 </DistrictOverview>

}

    
    </>

    
  );
}

export default App;
