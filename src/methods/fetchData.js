import axios from 'axios';

import { getValue, setValue } from '../store/store';
import { locationEntered } from './actions';

const getCoordinates = () => {
  //locationEntered();
  const loc = getValue('location');
  let coords;
  const geocoder = new google.maps.Geocoder();
  return new Promise(function(resolve, reject) {
    geocoder.geocode({ address: loc }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        const lat = results[0].geometry.location.lat();
        const long = results[0].geometry.location.lng();
        const full_location = results[0].formatted_address;
        coords = {
          lat: lat,
          long: long,
          full_location: full_location
        };
        setValue('lat', lat);
        setValue('long', long);
        setValue('currentWeather.full_location', full_location);

        resolve(coords);
      } else {
        console.log("Oops! Couldn't get data for the location");
      }
    });
  });
};

const setFormatCoordinates = async () => {
  const coordinates = await getCoordinates();
  const lat = coordinates.lat;
  const long = coordinates.long;
  const full_location = coordinates.full_location;

  setValue('lat', lat);
  setValue('long', long);
  setValue('currentWeather.full_location', full_location);

  let formatted_lat = (Math.round(coordinates.lat * 10000) / 10000).toString();
  if (lat > 0) {
    formatted_lat = (Math.round(lat * 10000) / 10000).toString() + '°N';
  } else if (lat < 0) {
    formatted_lat = (-1 * (Math.round(coordinates.lat * 10000) / 10000)).toString() + '°S';

  }
  setValue('currentWeather.formatted_lat', formatted_lat);

  let formatted_long = (Math.round(coordinates.long * 10000) / 10000).toString();
  if (long > 0) {
    formatted_long = (Math.round(coordinates.long * 10000) / 10000).toString() + '°E';
  } else if (long < 0) {
    formatted_long = (-1 * (Math.round(coordinates.long * 10000) / 10000)).toString() + '°W';
  }
  setValue('currentWeather.formatted_long', formatted_long);
};

const fixWeatherApi = async () => {
  await setFormatCoordinates();
  const weatherApi =
    'https://csm.fusioncharts.com/files/assets/wb/wb-data.php?src=darksky&lat=' +
    getValue('lat') +
    '&long=' +
    getValue('long');
  setValue('completeWeatherApi', weatherApi);
};

export const fetchWeatherData = async () => {
  await fixWeatherApi();
  const completeWeatherApi = getValue('completeWeatherApi');
  const weatherApiResponse = await axios.get(completeWeatherApi);
  if (weatherApiResponse.status === 200) {
    setValue('rawWeatherData', weatherApiResponse.data);
  } else {
    console.log('Hmm... Seems like our weather experts are busy!');
  }
};
