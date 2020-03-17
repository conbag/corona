import { SET_COUNTRY_DATA, UPDATE_COUNTRY_DATA, UPDATE_SELECTED_COUNTRY } from "./actions";

export const reducer = (state = { selectedCountry: "glob" }, action) => {
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
    default:
      return state;
  }
};
