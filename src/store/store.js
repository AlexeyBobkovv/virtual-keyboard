const keyboardStore = {
  isCapsOn: false,
  isShiftOn: false,

  switchCaps() {
    this.isCapsOn = !this.isCapsOn;
  },
  turnShiftOn() {
    this.isShiftOn = true;
  },
  turnShiftOff() {
    this.isShiftOn = false;
  },
};

export default keyboardStore;
