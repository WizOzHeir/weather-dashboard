import { getValue, setValue } from "../store/store";
import { unixToHuman, convertToTitleCase, formatPossibility, fahToCel, mileToKilometer, deriveWindDir } from './utility';

const getTimezone = () => getValue('rawWeatherData.timezone');

export const getSetCurrentTime = () => {
  const currentTime = getValue('rawWeatherData.currently.time');
  const timezone = getTimezone();
  const time = unixToHuman(timezone, currentTime).fullTime;
  setValue('currentWeather.time', time);
};

export const getSetSummary = () => {
  const summary = getValue('rawWeatherData.currently.summary');
  let currentSummary = convertToTitleCase(summary);
  if (currentSummary.includes(' And')) {
    currentSummary = currentSummary.replace(' And', ',');
  }
  setValue('currentWeather.summary', currentSummary);
};

export const getSetPossibility = () => {
  const icon = getValue('rawWeatherData.daily.icon');
  let possible = formatPossibility(icon);
  if (possible.includes(' And')) {
    possible = possible.replace(' And', ',');
  }
  setValue('currentWeather.possibility', possible);
};

export const getSetCurrentTemp = () => {
  const currentTemp = getValue('rawWeatherData.currently.temperature');
  setValue('currentWeather.temp', fahToCel(currentTemp));
};

const getHourlyInfoToday = () => getValue('rawWeatherData.hourly.data');

const getTodayDetails = () => getValue('rawWeatherData.daily.data')[0];

export const getSetTodayTempHighLowWithTime = () => {
  const timezone = getTimezone();
  const todayDetails = getTodayDetails();
  setValue('currentWeather.todayHighLow.todayTempHigh', fahToCel(todayDetails.temperatureMax));
  setValue('currentWeather.todayHighLow.todayTempLow',
    unixToHuman(timezone, todayDetails.temperatureMaxTime).onlyTime);

  setValue('currentWeather.todayHighLow.todayTempLow', fahToCel(todayDetails.temperatureMin));
  setValue('currentWeather.todayHighLow.todayTempLowTime',
    unixToHuman(timezone, todayDetails.temperatureMinTime).onlyTime);
};

export const getSetHourlyTempInfoToday = () => {
  const unixTime = getValue('rawWeatherData.currently.time');
  const timezone = getTimezone();
  const todayMonthDate = unixToHuman(timezone, unixTime).onlyMonthDate;
  const hourlyData = getHourlyInfoToday();

  for (let i = 0; i < hourlyData.length; i++) {
    const hourlyTimeAllTypes = unixToHuman(timezone, hourlyData[i].time);
    const hourlyOnlyTime = hourlyTimeAllTypes.onlyTime;
    const hourlyMonthDate = hourlyTimeAllTypes.onlyMonthDate;
    if (todayMonthDate === hourlyMonthDate) {
      let hourlyObject = { hour: '', temp: '' };
      hourlyObject.hour = hourlyOnlyTime;
      hourlyObject.temp = fahToCel(hourlyData[i].temperature).toString();
      setValue('tempVar.tempToday', [...getValue('tempVar.tempToday'), hourlyObject]);
    }

    if (getValue('tempVar.tempToday').length <= 2) {
      const minTempObject = {
        hour: getValue('currentWeather.todayHighLow.todayTempHighTime'),
        temp: getValue('currentWeather.todayHighLow.todayTempHigh')
      };
      const maxTempObject = {
        hour: getValue('currentWeather.todayHighLow.todayTempLowTime'),
        temp: getValue('this.currentWeather.todayHighLow.todayTempLow')
      };
      const updatedTempToday = getValue('tempVar.tempToday').unshift(maxTempObject, minTempObject);
      setValue('tempVar.tempToday', updatedTempToday);
    }
  }
};

export const getSetUVIndex = () => {
  const uvIndex = getValue('rawWeatherData.currently.uvIndex');
  setValue('highlights.uvIndex', uvIndex);
};

export const getSetVisibility = () => {
  const visibilityInMiles = getValue('rawWeatherData.currently.visibility');
  setValue('highlights.visibility', mileToKilometer(visibilityInMiles));
};

export const getSetWindStatus = () => {
  const windSpeedInMiles = getValue('rawWeatherData.currently.windSpeed');
  const windSpeed = mileToKilometer(windSpeedInMiles);
  setValue('highlights.windStatus.windSpeed', windSpeed);

  const absoluteWindDir = getValue('rawWeatherData.currently.windBearing');
  setValue('highlights.windStatus.windDirection', absoluteWindDir);
  setValue('highlights.windStatus.derivedWindDirection', deriveWindDir(absoluteWindDir));
};
