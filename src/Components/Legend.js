import { useEffect, useState } from "react"
import L from "leaflet"
import "./Legend.css"
import * as d3 from "d3"

function Legend({ map, categoryColor, selectedThreat }) {
  const [legendKey, setLegendKey] = useState(0)

  useEffect(() => {
    setLegendKey((prevKey) => prevKey + 1) // Update the key to force component remount
  }, [selectedThreat])

  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomleft" })

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend")

        var svg = d3
          .select(".legend")
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")

        // Handmade legend <rect style="fill: #69b3a2" stroke="black" x=10 y=100, width=300 height=40></rect>

        svg
          .append("rect")
          .attr("x", 0)
          .attr("y", 160)
          .attr("width", 40)
          .attr("height", 40)
          .style("fill", `${categoryColor(selectedThreat, "VL")}`)
        svg
          .append("rect")
          .attr("x", 60)
          .attr("y", 160)
          .attr("width", 40)
          .attr("height", 40)
          .style("fill", `${categoryColor(selectedThreat, "L")}`)
        svg
          .append("rect")
          .attr("x", 120)
          .attr("y", 160)
          .attr("width", 40)
          .attr("height", 40)
          .style("fill", `${categoryColor(selectedThreat, "M")}`)
        svg
          .append("rect")
          .attr("x", 180)
          .attr("y", 160)
          .attr("width", 40)
          .attr("height", 40)
          .style("fill", `${categoryColor(selectedThreat, "H")}`)
        svg
          .append("rect")
          .attr("x", 240)
          .attr("y", 160)
          .attr("width", 40)
          .attr("height", 40)
          .style("fill", `${categoryColor(selectedThreat, "VH")}`)
        svg
          .append("rect")
          .attr("x", 340)
          .attr("y", 160)
          .attr("width", 40)
          .attr("height", 40)
          .style("fill", `${categoryColor(selectedThreat, "N")}`)

        svg
          .append("text")
          .attr("x", 15)
          .attr("y", 40)
          .text(`Threat level related to ${selectedThreat.toUpperCase()}`)
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle")
        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("transform", "translate(15,150) rotate(-45)")
          .text("Very Low")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle")

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("transform", "translate(75,150) rotate(-45)")
          .text("Low")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle")

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("transform", "translate(130,150) rotate(-45)")
          .text("Medium")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle")

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("transform", "translate(190,150) rotate(-45)")
          .text("High")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle")

        svg
          .append("text")
          .attr("x", 0)
          .attr("y", 0)
          .attr("transform", "translate(245,150) rotate(-45)")
          .text("Very High")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle")

        return div
      }

      legend.addTo(map)
      return () => {
        legend.remove()
      }
    }
  }, [map, legendKey])
  return null
}

export default Legend
