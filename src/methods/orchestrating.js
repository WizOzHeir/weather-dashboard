import * as processData from './processData';
import { fetchWeatherData } from './fetchData';

const organizeCurrentWeatherInfo = () => {
  processData.getSetCurrentTime();
  processData.getSetCurrentTemp();
  processData.getSetTodayTempHighLowWithTime();
  processData.getSetSummary();
  processData.getSetPossibility();
};

const organizeTodayHighlights = () => {
  processData.getSetUVIndex();
  processData.getSetVisibility();
  processData.getSetWindStatus();
};

export const organizeAllDetails = async () => {
  await fetchWeatherData();
  organizeCurrentWeatherInfo();
  organizeTodayHighlights();
  processData.getSetHourlyTempInfoToday();
};
