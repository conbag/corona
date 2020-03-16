import Moment from "moment";
import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";

const today = new Date();
const yesterday = Moment(today).subtract(1, "days");

export default function Stats() {
  const [stats, setStats] = useState();
  const [delta, setDelta] = useState();

  useEffect(() => {
    fetch(`https://covid19.mathdro.id/api/`)
      .then(data => data.json())
      .then(res => {
        //console.log(res);
        setStats(res);
      });

    fetch(`https://covid19.mathdro.id/api/daily`)
      .then(data => data.json())
      .then(res => {
        console.log(res);
        setDelta(res);
      });
  }, []);
  // empty array as second argument ensures useEffect function only runs once on initial render: https://css-tricks.com/run-useeffect-only-once/

  if (!delta || !stats) {
    return <p>loading ........</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "space-evenly",
        padding: "20px 0px"
      }}
    >
      <StatsCard
        title="Confirmed"
        amount={stats.confirmed.value.toLocaleString()}
        delta={calculateDeltaPercentage(delta, "Confirmed")}
      ></StatsCard>
      <StatsCard
        title="Recovered"
        amount={stats.recovered.value.toLocaleString()}
        delta={calculateDeltaPercentage(delta, "Recovered")}
      ></StatsCard>
      <StatsCard
        title="Deaths"
        amount={stats.deaths.value.toLocaleString()}
      ></StatsCard>
    </div>
  );
}

function convertDateToString(date) {
  return Moment(date).format("YYYY/MM/DD");
}

function calculateDeltaPercentage(data, category) {
  console.log(data);
  console.log(category);

  const todayObj = data.find(
    d => d.reportDateString === convertDateToString(today)
  );
  const yesterdayObj = data.find(
    d => d.reportDateString === convertDateToString(yesterday)
  );
  return (
    ((todayObj[`delta${category}`] - yesterdayObj[`delta${category}`]) /
      yesterdayObj[`delta${category}`]) *
    100
  );
}
