import { getValue, setValue } from "../store/store";
import { convertToTitleCase } from './utility';

const makeInputEmpty = () => {
  setValue('input', '');
};

const makeTempVarTodayEmpty = () => {
  setValue('tempVar.tempToday', []);
};

const detectEnterKeyPress = () => {
  console.log('detect enter')
};

export const locationEntered = () => {
  //const input = this.$root.$refs.input;
  if (true || input.value === '') {
    setValue('location', 'London');
  } else {
    setValue('location', convertToTitleCase(input.value))
  }
  makeInputEmpty();
  makeTempVarTodayEmpty();
};
