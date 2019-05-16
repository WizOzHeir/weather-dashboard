const formatString = (str, separator) => {
  str = str.toLowerCase().split(separator);
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toLowerCase() + str[i].slice(1);
  }
  return str.join(' ');
};

export const convertToTitleCase = str => formatString(str,  ' ');

export const formatPossibility = str => formatString(str,  '-');

export const unixToHuman = (timezone, timestamp) => {
  const moment = require('moment-timezone');
  const decipher = new Date(timestamp * 1000);
  const human = moment(decipher)
    .tz(timezone)
    .format('llll');
  const timeArray = human.split(' ');
  const timeNumeral = timeArray[4];
  const timeSuffix = timeArray[5];
  const justTime = timeNumeral + ' ' + timeSuffix;
  const monthDateArray = human.split(',');
  const monthDate = monthDateArray[1].trim();
  return {
    fullTime: human,
    onlyTime: justTime,
    onlyMonthDate: monthDate
  };
};

export const fahToCel = tempInFahrenheit => Math.round((5 / 9) * (tempInFahrenheit - 32));

export const milibarToKiloPascal = pressureInMilibar => Math.round(pressureInMilibar * 0.1);

export const mileToKilometer = miles => Math.round(miles * 1.60934);

export const deriveWindDir = windDir =>  {
  const windDirections = [
    { minVal: 0, maxVal: 30, direction: 'N' },
    { minVal: 31, maxVal: 45, direction: 'NNE' },
    { minVal: 46, maxVal: 75, direction: 'NE' },
    { minVal: 76, maxVal: 90, direction: 'ENE' },
    { minVal: 91, maxVal: 120, direction: 'E' },
    { minVal: 121, maxVal: 135, direction: 'ESE' },
    { minVal: 136, maxVal: 165, direction: 'SE' },
    { minVal: 166, maxVal: 180, direction: 'SSE' },
    { minVal: 181, maxVal: 210, direction: 'S' },
    { minVal: 211, maxVal: 225, direction: 'SSW' },
    { minVal: 226, maxVal: 255, direction: 'SW' },
    { minVal: 256, maxVal: 270, direction: 'WSW' },
    { minVal: 271, maxVal: 300, direction: 'W' },
    { minVal: 301, maxVal: 315, direction: 'WNW' },
    { minVal: 316, maxVal: 345, direction: 'NW' },
    { minVal: 346, maxVal: 360, direction: 'NNW' }
  ];
  let windDirection = '';
  for (let i = 0; i < windDirections.length; i++) {
    if (
      windDir >= windDirections[i].minVal &&
      windDir <= windDirections[i].maxVal
    ) {
      windDirection = windDirections[i].direction;
    }
  }
  return windDirection;
};

