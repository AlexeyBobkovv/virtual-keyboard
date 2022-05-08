import keyboardStore from '../../store/store';
import { disableBtnType, enableBtnType } from '../../helpers/btnTypeSwitches';

const textArea = document.getElementById('textarea');

const capsLckSwitch = (event) => {
  if (
    event.currentTarget.classList.contains('CapsLock') &&
    event.type !== 'mouseup'
  ) {
    keyboardStore.switchCaps();
    event.currentTarget.classList.toggle('active');
  }
};

const capsLckEvent = (event, filteredArr) => {
  const eventClass = event.currentTarget.classList;

  if (eventClass.contains('CapsLock') && event.type === 'mousedown') {
    const { isCapsOn, isShiftOn } = keyboardStore;

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
    (event.currentTarget.classList.contains('ShiftLeft') ||
      event.currentTarget.classList.contains('ShiftRight')) &&
    event.type === 'mousedown'
  ) {
    keyboardStore.turnShiftOn();
  }
  if (
    (event.currentTarget.classList.contains('ShiftLeft') ||
      event.currentTarget.classList.contains('ShiftRight')) &&
    event.type === 'mouseup'
  ) {
    keyboardStore.turnShiftOff();
  }
};

const shiftEvent = (event, filteredArr) => {
  const { isCapsOn } = keyboardStore;

  if (
    (event.currentTarget.classList.contains('ShiftLeft') ||
      event.currentTarget.classList.contains('ShiftRight')) &&
    event.type === 'mousedown' &&
    !isCapsOn
  ) {
    disableBtnType(filteredArr, 'caseDown');
    enableBtnType(filteredArr, 'caseUp');
  }
  if (
    (event.currentTarget.classList.contains('ShiftLeft') ||
      event.currentTarget.classList.contains('ShiftRight')) &&
    event.type === 'mouseup' &&
    !isCapsOn
  ) {
    disableBtnType(filteredArr, 'caseUp');
    enableBtnType(filteredArr, 'caseDown');
  }
  if (
    (event.currentTarget.classList.contains('ShiftLeft') ||
      event.currentTarget.classList.contains('ShiftRight')) &&
    event.type === 'mousedown' &&
    isCapsOn
  ) {
    disableBtnType(filteredArr, 'caps');
    enableBtnType(filteredArr, 'shiftCaps');
  }
  if (
    (event.currentTarget.classList.contains('ShiftLeft') ||
      event.currentTarget.classList.contains('ShiftRight')) &&
    event.type === 'mouseup' &&
    isCapsOn
  ) {
    disableBtnType(filteredArr, 'shiftCaps');
    enableBtnType(filteredArr, 'caps');
  }
};

const tabEvent = (event) => {
  if (
    event.currentTarget.classList.contains('Tab') &&
    event.type === 'mousedown'
  )
    textArea.value += '\t';
};

const enterEvent = (event) => {
  if (
    event.currentTarget.classList.contains('Enter') &&
    event.type === 'mousedown'
  )
    textArea.value += '\n';
};

const deleteEvent = (event, pos) => {
  if (
    event.currentTarget.classList.contains('Delete') &&
    event.type === 'mousedown'
  ) {
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
  if (
    event.currentTarget.classList.contains('Backspace') &&
    event.type === 'mousedown'
  ) {
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
