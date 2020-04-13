import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Moment from "moment";

export default function GlobalChart() {
  const dailyData = useSelector(state => state.dailyData);  

  return dailyData ? (
    <div>
      <Line
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: (label, index, labels) => (label / 1000).toLocaleString()
                }
              }
            ]
          }
        }}
        data={{
          labels: dailyData.map(({ reportDate }) =>
            Moment(reportDate).format("Do MMM")
          ),
          datasets: [
            {
              data: dailyData.map(({ totalConfirmed }) => totalConfirmed),
              label: "Infected",
              borderColor: "#3333ff",
              fill: true
            },
            {
              data: dailyData.map(data => data.deaths.total),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true
            }
          ]
        }}
      />
    </div>
  ) : (
    <p></p>
  );
}
