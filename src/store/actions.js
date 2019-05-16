import store from './store';
import * as locales from "../constants";

export const getValue = key => store[key];

export const setLocation = value => {
  store[locales.LOCATION] = value;
};

export const setInputValue = value => {
  store[locales.INPUT].value = value;
};

export const setTempVar = value => {
  store[locales.TEMPVAR] = value;
};

export const setCurrentWeather = (key, value) => {
  store[locales.CURRENTWEATHER][key] = value;
};

export const setFullLocation = value => {
  store[locales.FULLLOCATION] = value;
};

export const setFormattedLat = value => {
  store[locales.FORMATTEDLAT] = value;
};

export const setFormattedLong = value => {
  store[locales.FORMATTEDLONG] = value;
};

export const setCompleteWeatherApi = value => {
  store[locales.COMPLETEDWEATHERAPI] = value;
};

export const setRawWeatherData = value => {
  store[locales.RAWWEATHERDATA] = value;
};
