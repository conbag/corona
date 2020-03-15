import React from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps"

// url to a valid topojson file
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export default function CountryMap({ setTooltipContent }) {
    return (
        <div>
            <ComposableMap 
                data-tip="" 
                projectionConfig={{
                    scale: 155,
                    rotation: [-11, 0, 0],
                }}
                width={800}
                height={400}
                style={{ width: "100%", height: "auto" }}
            >
                <Geographies geography={geoUrl}>
                {({ geographies }) => geographies.map(geo =>
                    <Geography 
                        key={geo.rsmKey} 
                        geography={geo} 
                        onMouseEnter={() => {
                            fetch(`https://covid19.mathdro.id/api/countries/${geo.properties.ISO_A2}`)
                            .then(data => data.json())
                            .then(result => {                                    
                                setTooltipContent(`${geo.properties.NAME}<br><br>Confirmed: ${result.confirmed.value.toLocaleString()}<br>Recovered: ${result.recovered.value.toLocaleString()}<br>Deaths: ${result.deaths.value.toLocaleString()}`);
                            })
                            .catch(err => setTooltipContent(`${geo.properties.NAME}<br><br>No data available`))                                                                                                                           
                        }}
                        onMouseLeave={() => {
                            setTooltipContent(``);
                        }}
                        style={{
                            default: {
                                fill: "#D6D6DA",
                                outline: "none"
                            },
                            hover: {
                                fill: "#F53",
                                outline: "none"
                            },
                            pressed: {
                                fill: "#E42",
                                outline: "none"
                            }
                        }} 
                    />
                )}
                </Geographies>
            </ComposableMap>      
        </div>
    )
}