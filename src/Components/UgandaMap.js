import { MapContainer, TileLayer, LayersControl } from "react-leaflet"
import { ugandaDistricts } from "../Data/uganda_districts_cl.js"
import { ugandaSubcounties } from "../Data/subcounties.js"
import LayerHandling from "../Components/LayerHandling"
import { useMap, useMapEvent } from "react-leaflet/hooks"

function UgandaMap(props) {
  const hazardArray = props.hazardArray
  const populationDistrict = props.populationDistrict
  const population = props.population
  const sectorThreat = props.sectorThreat
  const sector = props.sector
  const time = props.time
  const selectedDistrict = props.selectedDistrict
  const setSelectedDistrict = props.setSelectedDistrict

  const startingBounds = [
    [4.226101095480792, 34.61213931437568],
    [-1.4465324972187859, 29.51102531366363],
  ]

  return (
    <MapContainer
      bounds={startingBounds}
      scrollWheelZoom={false}
      dragging={true}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
        url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg"
      />
      <LayersControl position="topright">
        {hazardArray.map((hazard) => {
          return (
            <LayerHandling
              selectedThreat={hazard.name}
              populationDistrict={populationDistrict}
              districtGeom={ugandaDistricts}
              subcounties={ugandaSubcounties}
              startingBounds={startingBounds}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              sectorThreat={sectorThreat}
              selectedTimeScale={time}
              population={population}
              sectorSelector={sector}
              key={hazard.name}
            />
          )
        })}
      </LayersControl>
    </MapContainer>
  )
}

export default UgandaMap
