import { scaleLinear } from "d3-scale";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import getCountryData from "../utils/getCountryData";
import { updateGeoData } from "../redux/actions";

// url to a valid topojson file
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CONFIRMED_POPULATION_HIGH_DOMAIN = 0.0005;
const colorScale = scaleLinear()
  .domain([0.0, CONFIRMED_POPULATION_HIGH_DOMAIN])
  .range(["#ffedea", "#ff5233"]);

export default function CountryMap({ setTooltipContent }) {
  const countryStats = useSelector(state => state.countryData);
  const selectedCountry = useSelector(state => state.selectedCountry);
  const { geog, projection, path, current, zoom } =
    useSelector(state => state.geoData) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    getCountryData(dispatch);
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
            backgroundColor: "#2D2D2D"
          }}
        >
          <ZoomableGroup
            center={geog ? projection.invert(path.centroid(geog)) : [0, 0]}
            zoom={geog ? 2 : 1}
          >
            <Geographies geography={geoUrl}>
              {({ geographies, projection, path }) => {
                return geographies.map(geo => {
                  const { ISO_A2, POP_EST, NAME } = geo.properties;
                  const { confirmed, recovered, deaths } =
                    countryStats[ISO_A2] || {};

                  if (ISO_A2 === selectedCountry && ISO_A2 !== current) {                    
                    dispatch(
                      updateGeoData({
                        geog: geo,
                        projection,
                        path,                        
                        current: selectedCountry
                      })
                    );
                  }

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
                          : setTooltipContent(
                              `${NAME}<br><br>No data available`
                            );
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(``);
                      }}
                      //onClick={handleGeographyUpdate(geo, projection, path)}
                      style={{
                        default: {
                          outline: "none",
                          fill: ISO_A2 === selectedCountry ? "green" : ""
                        },
                        hover: {
                          stroke: "#ababab",
                          outline: "none",
                          strokeWidth: "1px",
                          fill: ISO_A2 === selectedCountry ? "green" : ""
                        },
                        pressed: {
                          outline: "none"
                        }
                      }}
                    />
                  );
                });
              }}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      ) : (
        <p></p>
      )}
    </div>
  );
}
