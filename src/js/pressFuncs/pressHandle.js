/* eslint-disable prefer-const */
import keyboardStore from '../../store/store';
import {
  capsLckSwitch,
  capsLckEvent,
  shiftSwitch,
  shiftEvent,
  tabEvent,
  enterEvent,
  deleteEvent,
  backspaceEvent,
} from './keyEvents';

let { isCapsOn, isShiftOn } = keyboardStore;

const pressHandle = (event) => {
  event.preventDefault();

  const textArea = document.querySelector('#textarea');
  let pos = textArea.selectionStart;

  capsLckSwitch(event);
  shiftSwitch(event);

  tabEvent(event, pos);
  enterEvent(event, pos);

  deleteEvent(event, pos);
  backspaceEvent(event, pos);

  keyboardStore.keysArr.forEach((el) => {
    const arr = Array.from(el.children);
    const filteredArr = arr.filter(
      (elem) => !elem.classList.contains('hidden'),
    )[0].children;

    capsLckEvent(event, el, filteredArr, isCapsOn, isShiftOn);
    shiftEvent(event, filteredArr, isCapsOn);

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
      !el.classList.contains('Delete') &&
      !el.classList.contains('Enter') &&
      !el.classList.contains('ShiftRight') &&
      el.classList.contains(event.code) &&
      event.type !== 'keyup'
    ) {
      const { textContent } = Array.from(filteredArr).filter(
        (elem) => !elem.classList.contains('hidden'),
      )[0];
      textArea.setRangeText(textContent, pos, pos, 'end');
    }
  });
};

export default pressHandle;
