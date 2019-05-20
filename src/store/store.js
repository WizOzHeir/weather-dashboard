import objectPath from 'object-path';

const store =  {
  weatherDetails: false,
  location: '', // raw location from input
  lat: '', // raw latitude from google maps api response
  long: '', // raw longitude from google maps api response
  completeWeatherApi: '', // weather api string with lat and long
  rawWeatherData: '', // raw response from weather api
  currentWeather: {
    full_location: '', // for full address
    formatted_lat: '', // for N/S
    formatted_long: '', // for E/W
    time: '',
    temp: '',
    todayHighLow: {
      todayTempHigh: '',
      todayTempHighTime: '',
      todayTempLow: '',
      todayTempLowTime: ''
    },
    summary: '',
    possibility: ''
  },
  tempVar: {
    tempToday: [
      // gets added dynamically by this.getSetHourlyTempInfoToday()
    ],
  },
  highlights: {
    uvIndex: '',
    visibility: '',
    windStatus: {
      windSpeed: '',
      windDirection: '',
      derivedWindDirection: ''
    },
  }
};

export const getValue = (propertyPath) => objectPath.get(store, propertyPath, null)
export const setValue = (propertyPath, value) => objectPath.set(store, propertyPath, value);

