export const SET_COUNTRY_DATA = "SET_COUNTRY_DATA";
export const UPDATE_COUNTRY_DATA = "UPDATE_COUNTRY_DATA";
export const UPDATE_SELECTED_COUNTRY = "UPDATE_SELECTED_COUNTRY";

export const setCountryData = data => ({
  type: SET_COUNTRY_DATA,
  payload: data
});

export const updateCountryData = data => ({
  type: UPDATE_COUNTRY_DATA,
  payload: data
});

//iso2
export const updateSelectedCountry = country => ({
  type: UPDATE_SELECTED_COUNTRY,
  payload: country
});
