import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedCountry, updateGeoData } from "../redux/actions";
import { COUNTRY_SELECTOR_FLEX_RATIO } from "../utils/constants";
import { MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2),
    flex: COUNTRY_SELECTOR_FLEX_RATIO,
    justifyContent: "center"
  }
}));

export default function CountrySelector() {
  const classes = useStyles();
  const countryStats = useSelector(state => state.countryData);
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        style={{ padding: "0px 5px" }}
        id="demo-simple-select-outlined"
        value={country ? country : "glob"}
        onChange={event => {
          const countryCode = event.target.value;

          // do we need local state here if dispatching to redux store?
          setCountry(countryCode);
          dispatch(updateSelectedCountry(countryCode));
          if (countryCode === "glob") {
            dispatch(updateGeoData({}));
          }
        }}
      >
        {countryStats ? (
          Object.values(countryStats)
            .filter(country => country.iso2)
            .sort(compareCountryNames)
            .map(country => {
              if (country.countryName === "Global") {
                return (
                  <MenuItem
                    style={{ fontWeight: "bold" }}
                    key={country.iso2}
                    value={country.iso2}
                  >
                    <em>{country.countryName}</em>
                  </MenuItem>
                );
              }
              return (
                <MenuItem key={country.iso2} value={country.iso2}>
                  {country.countryName}
                </MenuItem>
              );
            })
        ) : (
          <p></p>
        )}
      </Select>
    </FormControl>
  );
}

function compareCountryNames(country1, country2) {
  if (country1.countryName >= country2.countryName) {
    return 1;
  }

  return -1;
}
