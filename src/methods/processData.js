import { unixToHuman, convertToTitleCase, fahToCel } from './utility';
import * as actions from '../store/actions';
import * as locales from '../constants';

const getTimezone = () => actions.getValue(locales.RAWWEATHERDATA).timezone;

const getSetCurrentTime = () => {
  const currentTime = actions.getValue(locales.RAWWEATHERDATA).currently.time;
  const timezone = getTimezone();
  const time = unixToHuman(
    timezone,
    currentTime
  ).fullTime;
  actions.setCurrentWeather(locales.TIME, time);
};

const getSetSummary = () => {
  let currentSummary = convertToTitleCase(
    actions.getValue(locales.RAWWEATHERDATA).currently.summary
  );
  if (currentSummary.includes(' And')) {
    currentSummary = currentSummary.replace(' And', ',');
  }
  actions.setCurrentWeather(locales.SUMMARY, currentSummary);
};

const getSetPossibility = () => {
  let possible = this.formatPossibility(actions.getValue(locales.RAWWEATHERDATA).daily.icon);
  if (possible.includes(' And')) {
    possible = possible.replace(' And', ',');
  }
  actions.setCurrentWeather(locales.POSSIBILITY, possible);
};

const getSetCurrentTemp = () => {
  const currentTemp = actions.getValue(locales.RAWWEATHERDATA).currently.temperature;
  actions.setCurrentWeather(locales.TEMPERATURE, fahToCel(currentTemp));
};

function getTodayDetails() {

}

function getSetTodayTempHighLowWithTime() {

}

function getHourlyInfoToday() {

}

function getSetHourlyTempInfoToday() {

}

function getSetUVIndex() {

}

function getSetVisibility() {

}

function getSetWindStatus() {

}


