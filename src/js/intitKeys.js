import keyboardStore from '../store/store';

const init = () => {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container');

  const { keysArr } = keyboardStore;
  const row1 = document.createElement('div');
  const row2 = document.createElement('div');
  const row3 = document.createElement('div');
  const row4 = document.createElement('div');
  const row5 = document.createElement('div');
  const rowArr = [row1, row2, row3, row4, row5];
  rowArr.forEach((el) => el.classList.add('row'));

  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');

  for (let i = 0; i < keysArr.length; i += 1) {
    if (i < 14) row1.append(keysArr[i]);
    if (i >= 14 && i < 29) row2.append(keysArr[i]);
    if (i >= 29 && i < 42) row3.append(keysArr[i]);
    if (i >= 42 && i < 55) row4.append(keysArr[i]);
    if (i >= 55) row5.append(keysArr[i]);
  }

  const textArea = document.createElement('textarea');
  textArea.setAttribute('id', 'textarea');

  keyboardWrapper.append(...rowArr);
  contentContainer.append(textArea, keyboardWrapper);
  document.body.prepend(contentContainer);
};

export default init;
