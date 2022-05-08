import { disableBtnType, enableBtnType } from './btnTypeSwitches';
import keyboardStore from '../../store/keyStore';

let { isCapsOn, isShiftOn } = keyboardStore;

const isEventCodeEqualsClass = (el, eventCode) =>
  el.classList.contains(eventCode);

const capsLckSwitch = (event) => {
  if (event.code === 'CapsLock' && event.type === 'keydown') {
    isCapsOn = !isCapsOn;
  }
};

const capsLckEvent = (event, el, filteredArr) => {
  if (event.type === 'keydown' && !el.classList.contains('CapsLock')) {
    if (isEventCodeEqualsClass(el, event.code)) el.classList.add('active');
  }
  if (event.type === 'keyup' && !el.classList.contains('CapsLock')) {
    if (isEventCodeEqualsClass(el, event.code)) el.classList.remove('active');
  }

  if (
    event.code === 'CapsLock' &&
    el.classList.contains('CapsLock') &&
    event.type !== 'keyup'
  ) {
    el.classList.toggle('active');
  }

  if (event.code === 'CapsLock' && event.type === 'keydown') {
    if (isCapsOn && !isShiftOn) {
      disableBtnType(filteredArr, 'caseDown');
      enableBtnType(filteredArr, 'caps');
    }
    if (!isCapsOn && isShiftOn) {
      disableBtnType(filteredArr, 'shiftCaps');
      enableBtnType(filteredArr, 'caseUp');
    }
    if (!isCapsOn && !isShiftOn) {
      disableBtnType(filteredArr, 'caps');
      enableBtnType(filteredArr, 'caseDown');
    }
    if (isCapsOn && isShiftOn) {
      disableBtnType(filteredArr, 'caseUp');
      disableBtnType(filteredArr, 'caps');
      enableBtnType(filteredArr, 'shiftCaps');
    }
  }
};

const shiftSwitch = (event) => {
  if (
    (event.code === 'ShiftLeft' || event.code === 'ShiftRight') &&
    event.type === 'keydown'
  ) {
    isShiftOn = true;
  }
  if (
    (event.code === 'ShiftLeft' || event.code === 'ShiftRight') &&
    event.type === 'keyup'
  ) {
    isShiftOn = false;
  }
};

const shiftEvent = (event, filteredArr) => {
  if (event.shiftKey && !isCapsOn) {
    disableBtnType(filteredArr, 'caseDown');
    disableBtnType(filteredArr, 'caps');
    disableBtnType(filteredArr, 'shiftCaps');
    enableBtnType(filteredArr, 'caseUp');
  }
  if (
    !event.shiftKey &&
    !isCapsOn &&
    (event.code === 'ShiftLeft' || event.code === 'ShiftRight')
  ) {
    disableBtnType(filteredArr, 'caseUp');
    enableBtnType(filteredArr, 'caseDown');
  }
  if (event.shiftKey && isCapsOn) {
    disableBtnType(filteredArr, 'caps');
    disableBtnType(filteredArr, 'caseDown');
    disableBtnType(filteredArr, 'caseUp');
    enableBtnType(filteredArr, 'shiftCaps');
  }
  if (
    !event.shiftKey &&
    isCapsOn &&
    (event.code === 'ShiftLeft' || event.code === 'ShiftRight')
  ) {
    disableBtnType(filteredArr, 'shiftCaps');
    enableBtnType(filteredArr, 'caps');
  }
};

const tabEvent = (event, pos) => {
  const textArea = document.querySelector('#textarea');

  if (event.code === 'Tab' && event.type === 'keydown') {
    textArea.setRangeText('\t', pos, pos, 'end');
  }
};

const enterEvent = (event, pos) => {
  const textArea = document.querySelector('#textarea');

  if (event.code === 'Enter' && event.type === 'keydown') {
    textArea.setRangeText('\n', pos, pos, 'end');
  }
};

const deleteEvent = (event, pos) => {
  const textArea = document.querySelector('#textarea');

  if (event.code === 'Delete' && event.type === 'keydown') {
    if (pos >= 0 && textArea.selectionStart === textArea.selectionEnd) {
      textArea.value =
        textArea.value.slice(0, pos) +
        textArea.value.slice(pos + 1, textArea.value.length);
    }
    if (textArea.selectionStart !== textArea.selectionEnd) {
      textArea.value =
        textArea.value.slice(0, textArea.selectionStart) +
        textArea.value.slice(textArea.selectionEnd, textArea.value.length);
    }
    textArea.selectionStart = pos;
    textArea.selectionEnd = pos;
  }
};

const backspaceEvent = (event, pos) => {
  const textArea = document.querySelector('#textarea');

  if (event.code === 'Backspace' && event.type === 'keydown') {
    if (pos > 0 && textArea.selectionStart === textArea.selectionEnd) {
      textArea.value =
        textArea.value.slice(0, pos - 1) +
        textArea.value.slice(pos, textArea.value.length);
      textArea.selectionStart = pos - 1;
      textArea.selectionEnd = pos - 1;
    }
    if (textArea.selectionStart !== textArea.selectionEnd) {
      textArea.value =
        textArea.value.slice(0, textArea.selectionStart) +
        textArea.value.slice(textArea.selectionEnd, textArea.value.length);
      textArea.selectionStart = pos;
      textArea.selectionEnd = pos;
    }
  }
};

export {
  capsLckSwitch,
  capsLckEvent,
  shiftSwitch,
  shiftEvent,
  tabEvent,
  enterEvent,
  deleteEvent,
  backspaceEvent,
};
