import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCountryData, updateSelectedCountry } from "../redux/actions";
import { COUNTRY_SELECTOR_FLEX_RATIO } from "../utils/constants";
import CountrySelector from "./CountrySelector";
import StatsCard from "./StatsCard";

const today = new Date();
const yesterday = Moment(today).subtract(1, "days");

export default function Stats() {
  const dispatch = useDispatch();
  const [delta, setDelta] = useState();
  const countryStats = useSelector(state => state.countryData);
  const selectedCountry = useSelector(state => state.selectedCountry);

  useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/`)
      .then(data => data.json())
      .then(res => {
        dispatch(
          updateCountryData({
            glob: {
              countryName: "Global",
              iso2: "glob",
              confirmed: res.confirmed.value,
              recovered: res.recovered.value,
              deaths: res.deaths.value
            }
          })
        );

        dispatch(updateSelectedCountry("glob"));
      });

    fetch(`https://covid19.mathdro.id/api/daily`)
      .then(data => data.json())
      .then(res => {
        setDelta(res);
      });
  }, []);
  // empty array as second argument ensures useEffect function only runs once on initial render: https://css-tricks.com/run-useeffect-only-once/

  if (!delta || !countryStats || !selectedCountry) {
    return <p></p>;
  }

  return (
    <div style={{ display: "flex" }}>
      <CountrySelector></CountrySelector>
      <div
        style={{
          display: "flex",
          flex: 1 - COUNTRY_SELECTOR_FLEX_RATIO,
          justifyContent: "space-evenly",
          padding: "20px 0px"
        }}
      >
        <StatsCard
          title="Confirmed"
          color="rgba(0, 0, 255, 0.5)"
          amount={countryStats[selectedCountry].confirmed}
          delta={calculateDeltaPercentage(delta, "Confirmed")}
        ></StatsCard>
        <StatsCard
          title="Recovered"
          color="rgba(0, 255, 0, 0.5)"
          amount={countryStats[selectedCountry].recovered}
          delta={calculateDeltaPercentage(delta, "Recovered")}
        ></StatsCard>
        <StatsCard
          title="Deaths"
          color="rgba(255, 0, 0, 0.5)"
          amount={countryStats[selectedCountry].deaths}
        ></StatsCard>
      </div>
    </div>
  );
}

function convertDateToString(date) {
  return Moment(date).format("YYYY-MM-DD");
}

function calculateDeltaPercentage(data, category) {
  let backup = {};
  backup[`delta${category}`] = 0;

  const todayObj =
    data.find(d => d.reportDate === convertDateToString(today)) || backup;
  const yesterdayObj = data.find(
    d => d.reportDate === convertDateToString(yesterday) || backup
  );

  return (
    ((todayObj[`delta${category}`] - yesterdayObj[`delta${category}`]) /
      yesterdayObj[`delta${category}`]) *
    100
  );
}
