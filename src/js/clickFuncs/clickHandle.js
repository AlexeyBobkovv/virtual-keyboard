/* eslint-disable prefer-const */
import { keysArr } from '../pressFuncs/pressHandle';

import {
  capsLckSwitch,
  capsLckEvent,
  shiftSwitch,
  shiftEvent,
  tabEvent,
  enterEvent,
  deleteEvent,
  backspaceEvent,
} from './clickEvents';

const clickHandle = (event) => {
  const textArea = document.getElementById('textarea');
  const pos = textArea.selectionStart;
  textArea.focus();
  const arr = Array.from(event.currentTarget.children);
  const filteredArr = arr.filter(
    (elem) => !elem.classList.contains('hidden'),
  )[0].children;

  if (
    event.type === 'mousedown' &&
    !event.currentTarget.classList.contains('CapsLock')
  ) {
    event.currentTarget.classList.add('active');
  }
  if (
    event.type === 'mouseup' &&
    !event.currentTarget.classList.contains('CapsLock')
  ) {
    event.currentTarget.classList.remove('active');
  }

  capsLckSwitch(event);
  shiftSwitch(event);
  tabEvent(event);
  enterEvent(event);
  deleteEvent(event, pos);
  backspaceEvent(event);

  keysArr.forEach((el) => {
    const keyArr = Array.from(el.children);
    const filteredArrKeys = keyArr.filter(
      (elem) => !elem.classList.contains('hidden'),
    )[0].children;
    capsLckEvent(event, filteredArrKeys);
    shiftEvent(event, filteredArrKeys);
  });
  if (
    !event.currentTarget.classList.contains('Tab') &&
    !event.currentTarget.classList.contains('CapsLock') &&
    !event.currentTarget.classList.contains('ShiftLeft') &&
    !event.currentTarget.classList.contains('ControlLeft') &&
    !event.currentTarget.classList.contains('MetaLeft') &&
    !event.currentTarget.classList.contains('AltLeft') &&
    !event.currentTarget.classList.contains('AltRight') &&
    !event.currentTarget.classList.contains('ControlRight') &&
    !event.currentTarget.classList.contains('Backspace') &&
    !event.currentTarget.classList.contains('Enter') &&
    !event.currentTarget.classList.contains('ShiftRight') &&
    !event.currentTarget.classList.contains('Delete') &&
    event.type === 'mousedown'
  ) {
    const { textContent } = Array.from(filteredArr).filter(
      (elem) => !elem.classList.contains('hidden'),
    )[0];
    textArea.setRangeText(textContent, pos, pos, 'end');
  }
};

export default clickHandle;
