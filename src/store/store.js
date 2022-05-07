import createKeys from '../helpers/renderKeys';

const arr = createKeys();

const keyboardStore = {
  language: 'ru',
  keysArr: arr,
  isCapsOn: false,
  isShiftOn: false,
};

export default keyboardStore;
