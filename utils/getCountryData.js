import { setCountryData } from "../redux/actions";

export default function getCountryData(dispatch) {
  fetch(`https://covid19.mathdro.id/api/confirmed/`)
    .then(data => data.json())
    .then(res => {
      const countryData = reduceCountryData(res);
      dispatch(setCountryData(countryData));
    });
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
