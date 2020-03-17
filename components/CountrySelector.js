import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedCountry } from "../redux/actions";
import { COUNTRY_SELECTOR_FLEX_RATIO } from "../utils/constants";

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
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="country-native-simple">Country</InputLabel>
      <Select
        native
        value={country}
        onChange={event => {
          const countryCode = event.target.value;

          setCountry(countryCode);
          dispatch(updateSelectedCountry(countryCode));
        }}
        inputProps={{
          name: "country",
          id: "country-native-simple"
        }}
      >
        {countryStats ? (
          Object.values(countryStats).map((country, i) => (
            <option key={country.iso2} value={country.iso2}>
              {country.countryName}
            </option>
          ))
        ) : (
          <p></p>
        )}
      </Select>
    </FormControl>
  );
}
