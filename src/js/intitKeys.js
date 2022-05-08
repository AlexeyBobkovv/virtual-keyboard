import { keysArr } from './pressFuncs/pressHandle';
import clickHandle from './clickFuncs/clickHandle';
import { q, colorRandom } from './canvas/canvas';

const init = () => {
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('container');

  const headerTip = document.createElement('div');
  headerTip.classList.add('header');
  const pFirst = document.createElement('p');
  pFirst.textContent =
    'Добро пожаловать, подопытный - это RS School Virtual Keyboard';
  const pSecond = document.createElement('p');
  pSecond.textContent = 'Клавиатура сделана в системе Windows';
  const pThird = document.createElement('p');
  pThird.textContent =
    'Ваша задача - найти баги и сообщить руководству, приступайте';
  headerTip.append(pFirst, pSecond, pThird);

  const footerTip = document.createElement('div');
  footerTip.classList.add('footer');
  const pFooter = document.createElement('p');
  pFooter.textContent = 'Переключение языка - ctrl + alt';
  footerTip.append(pFooter);

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
    keysArr[i].addEventListener('mousedown', clickHandle);
    keysArr[i].addEventListener('mouseup', clickHandle);
    if (i < 14) row1.append(keysArr[i]);
    if (i >= 14 && i < 29) row2.append(keysArr[i]);
    if (i >= 29 && i < 42) row3.append(keysArr[i]);
    if (i >= 42 && i < 55) row4.append(keysArr[i]);
    if (i >= 55) row5.append(keysArr[i]);
  }

  const textArea = document.createElement('textarea');
  textArea.setAttribute('id', 'textarea');

  keyboardWrapper.append(...rowArr);
  contentContainer.append(headerTip, textArea, keyboardWrapper, footerTip, q);
  document.body.prepend(contentContainer);
  colorRandom();
};

export default init;
