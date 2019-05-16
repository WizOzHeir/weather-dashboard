import axios from 'axios';

import { locationEntered } from './actions';
import * as locales from '../constants';
import * as actions from '../store/actions';

export const getCoordinates = () => {
  locationEntered();
  const loc = actions.getValue(locales.LOCATION);
  let coords = {};
  const geocoder = new google.maps.Geocoder();
  return new Promise(function(resolve, reject) {
    geocoder.geocode({ address: loc }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        actions.setFormattedLat(results[0].geometry.location.lat());
        actions.setFormattedLong(results[0].geometry.location.lng());
        actions.setFullLocation(results[0].formatted_address);
        coords = {
          lat: actions.getValue(locales.FORMATTEDLAT),
          long: actions.getValue(locales.FORMATTEDLONG),
          full_location: actions.getValue(locales.FULLLOCATION)
        };
        resolve(coords);
      } else {
        alert("Oops! Couldn't get data for the location");
      }
    });
  });
};

async function setFormatCoordinates() {
  const coordinates = await getCoordinates();
  actions.setFormattedLat(coordinates.lat);
  actions.setFormattedLong(coordinates.long);
  actions.setFullLocation(locales.FULLLOCATION, coordinates.full_location);

  if (coordinates.lat > 0) {
    actions.setFormattedLat(locales.FORMATTEDLAT,
      (Math.round(coordinates.lat * 10000) / 10000).toString() + '°N');
  } else if (coordinates.lat < 0) {
    actions.setFormattedLat(locales.FORMATTEDLAT,
      (-1 * (Math.round(coordinates.lat * 10000) / 10000)).toString() + '°S');
  } else {
    actions.setFormattedLat(locales.FORMATTEDLAT,
      (Math.round(coordinates.lat * 10000) / 10000).toString());
  }

  if (coordinates.long > 0) {
    actions.setFormattedLong(locales.FORMATTEDLONG,
      (Math.round(coordinates.long * 10000) / 10000).toString() + '°E');
  } else if (coordinates.long < 0) {
    actions.setFormattedLong(locales.FORMATTEDLONG,
      (-1 * (Math.round(coordinates.long * 10000) / 10000)).toString() + '°W');
  } else {
    actions.setFormattedLong(locales.FORMATTEDLONG,
      (Math.round(coordinates.long * 10000) / 10000).toString());
  }
}

async function fixWeatherApi() {
  await setFormatCoordinates();
  const weatherApi =
    'https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=darksky&lat=' +
    actions.getValue(locales.FORMATTEDLAT) +
    '&long=' +
    actions.getValue(locales.FORMATTEDLONG);
  actions.setCompleteWeatherApi(weatherApi);
}

async function fetchWeatherData() {
  await fixWeatherApi();
  const weatherApiResponse = await axios.get(actions.getValue(locales.COMPLETEDWEATHERAPI));
  if (weatherApiResponse.status === 200) {
    actions.setRawWeatherData(weatherApiResponse.data);
  } else {
    alert('Hmm... Seems like our weather experts are busy!');
  }
}
