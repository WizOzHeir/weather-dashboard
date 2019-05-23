import { getValue, setValue } from '../store/store';
import { convertToTitleCase } from './utility';

export const makeInputEmpty = () => {
  setValue('input', '');
};

const makeTempVarTodayEmpty = () => {
  setValue('tempVar.tempToday', []);
};

const detectEnterKeyPress = (event) => {};

export const locationEntered = (value) => {
  if (!value) {
    setValue('location', 'London');
  } else {
    setValue('location', convertToTitleCase(value))
  }
  //makeTempVarTodayEmpty();
};
