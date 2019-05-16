import { convertToTitleCase } from './utility';
import { setLocation, setInputValue, setTempVar, getValue } from '../store/actions';
import * as locales from '../constants';

export const makeInputEmpty = () => {
  setInputValue('');
};

export const makeTempVarTodayEmpty = () => {
  setTempVar([]);
};

export const detectEnterKeyPress = (setHitEnterKeyTrue) => {
  getValue(locales.INPUT).addEventListener('keyup', function (event) {
    event.preventDefault();
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      setHitEnterKeyTrue();
    }
  })
};

export const locationEntered = () => {
  const input = getValue(locales.INPUT).value;
  if ( input === '') {
    setLocation(locales.DEFAULT_LOCATION);
  } else {
    setLocation(convertToTitleCase(input.value));
  }
  makeInputEmpty();
  makeTempVarTodayEmpty();
};

