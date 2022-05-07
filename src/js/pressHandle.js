/* eslint-disable prefer-const */
import keyboardStore from '../store/store';
import { disableBtnType, enableBtnType } from '../helpers/btnTypeSwitches';

let { isCapsOn, isShiftOn } = keyboardStore;

const isEventCodeEqualsClass = (el, eventCode) =>
  el.classList.contains(eventCode);

const pressHandle = (event) => {
  event.preventDefault();
  const textArea = document.querySelector('#textarea');

  if (event.code === 'CapsLock' && event.type === 'keydown') {
    isCapsOn = !isCapsOn;
  }
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

  keyboardStore.keysArr.forEach((el) => {
    const arr = Array.from(el.children);
    const filteredArr = arr.filter(
      (elem) => !elem.classList.contains('hidden'),
    )[0].children;

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

    if (
      !el.classList.contains('Tab') &&
      !el.classList.contains('CapsLock') &&
      !el.classList.contains('ShiftLeft') &&
      !el.classList.contains('ControlLeft') &&
      !el.classList.contains('MetaLeft') &&
      !el.classList.contains('AltLeft') &&
      !el.classList.contains('AltRight') &&
      !el.classList.contains('ControlRight') &&
      !el.classList.contains('Backspace') &&
      !el.classList.contains('Enter') &&
      !el.classList.contains('ShiftRight') &&
      el.classList.contains(event.code) &&
      event.type !== 'keyup'
    ) {
      const { textContent } = Array.from(filteredArr).filter(
        (elem) => !elem.classList.contains('hidden'),
      )[0];
      textArea.value += textContent;
    }
  });
};

export default pressHandle;
