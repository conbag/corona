import {
  SET_COUNTRY_DATA,
  UPDATE_COUNTRY_DATA,
  UPDATE_SELECTED_COUNTRY,
  UPDATE_GEO_DATA,
  UPDATE_DAILY_DATA
} from "./actions";

export const reducer = (
  state = { selectedCountry: "glob", selectedTab: 0, dailyData: [] },
  action
) => {
  switch (action.type) {
    case SET_COUNTRY_DATA:
      return {
        ...state,
        countryData: { ...state.countryData, ...action.payload }
      };
    case UPDATE_COUNTRY_DATA:
      return {
        ...state,
        countryData: { ...state.countryData, ...action.payload }
      };
    case UPDATE_SELECTED_COUNTRY:
      return { ...state, selectedCountry: action.payload };
    case UPDATE_GEO_DATA:
      return { ...state, geoData: action.payload };
    case UPDATE_DAILY_DATA:
      return { ...state, dailyData: action.payload };
    default:
      return state;
  }
};
