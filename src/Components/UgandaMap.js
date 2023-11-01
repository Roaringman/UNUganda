import { TileLayer } from "react-leaflet"
import { ugandaDistricts } from "../Data/UgDistDisSImp_DFHL_final.js"
import { ugandaSubcounties } from "../Data/subcounties_final.js"
import LayerHandling from "../Components/LayerHandling"
import { useMap, useMapEvent } from "react-leaflet/hooks"
import Legend from "./Legend.js"

function UgandaMap(props) {
  const hazardArray = props.hazardArray
  const populationDistrict = props.populationDistrict
  const population = props.population
  const sectorThreat = props.sectorThreat
  const sector = props.sector
  const time = props.time
  const selectedDistrict = props.selectedDistrict
  const setSelectedDistrict = props.setSelectedDistrict
  const selectedThreat = props.selectedThreat
  const filteredCounties = props.filteredCounties
  const setFilteredCounties = props.setFilteredCounties
  const startingBounds = props.startingBounds
  const zoomBounds = props.zoomBounds

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>
        &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a>
        &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a>
        &copy; <a href="https://www.openstreetmap.org/about/" target="_blank">OpenStreetMap contributors</a>'
        url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.jpg"
      />

      <LayerHandling
        selectedThreat={selectedThreat}
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
        key={selectedThreat}
        filteredCounties={filteredCounties}
        setFilteredCounties={setFilteredCounties}
        zoomBounds={zoomBounds}
      />
    </>
  )
}

export default UgandaMap
