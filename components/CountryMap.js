import { scaleLinear } from "d3-scale";
import React, { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// url to a valid topojson file
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CONFIRMED_POPULATION_HIGH_DOMAIN = 0.0003;
const colorScale = scaleLinear()
  .domain([0.0, CONFIRMED_POPULATION_HIGH_DOMAIN])
  .range(["#ffedea", "#ff5233"]);

export default function CountryMap({ setTooltipContent }) {
  const [countryStats, setCountryStats] = useState();

  useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/confirmed/`)
      .then(data => data.json())
      .then(res => {
        const countryData = reduceCountryData(res);
        console.log(countryData);
        setCountryStats(countryData);
      });
  }, []);
  // empty array as second argument ensures useEffect function only runs once on initial render: https://css-tricks.com/run-useeffect-only-once/

  return (
    <div data-tip="">
      {countryStats ? (
        <ComposableMap
          projectionConfig={{
            scale: 155,
            rotation: [-11, 0, 0]
          }}
          width={800}
          height={400}
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "#2D2D2D",
            borderRadius: "5px"
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                //console.log(geo)
                const { ISO_A2, POP_EST, NAME } = geo.properties;
                const { confirmed, recovered, deaths } =
                  countryStats[ISO_A2] || {};

                //console.log(confirmed / POP_EST)

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      countryStats[ISO_A2]
                        ? colorScale(confirmed / POP_EST)
                        : "#F5F4F6"
                    }
                    onMouseEnter={() => {
                      countryStats[ISO_A2]
                        ? setTooltipContent(
                            `${NAME}<br><br>Confirmed: ${confirmed.toLocaleString()}<br>Recovered: ${recovered.toLocaleString()}<br>Deaths: ${deaths.toLocaleString()}`
                          )
                        : setTooltipContent(`${NAME}<br><br>No data available`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent(``);
                    }}
                    style={{
                      default: {
                        outline: "none"
                      },
                      hover: {
                        fill: "#4caf50",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      ) : (
        <p></p>
      )}
    </div>
  );
}

function reduceCountryData(countryArray) {
  return countryArray.reduce((acc, curr) => {
    acc[curr.iso2] = {
      confirmed: acc[curr.iso2]
        ? acc[curr.iso2].confirmed + curr.confirmed
        : curr.confirmed,
      recovered: acc[curr.iso2]
        ? acc[curr.iso2].recovered + curr.recovered
        : curr.recovered,
      deaths: acc[curr.iso2] ? acc[curr.iso2].deaths + curr.deaths : curr.deaths
    };

    return acc;
  }, {});
}
