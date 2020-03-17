import { SET_COUNTRY_DATA } from "./actions";

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_COUNTRY_DATA:
      return { ...state, countryData: action.payload };
    default:
      return state;
  }
};
