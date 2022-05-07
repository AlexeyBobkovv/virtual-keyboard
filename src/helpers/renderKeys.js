/* eslint-disable prefer-destructuring */
import keys from '../store/keyStore';

const createKeys = (lang) => {
  const keyWrapperArr = [];

  Object.entries(keys).forEach((key) => {
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key', key[0]);

    const langWrapperRu = document.createElement('span');
    const langWrapperEn = document.createElement('span');

    if (lang === 'en') {
      langWrapperRu.classList.add('ru', 'hidden');
      langWrapperEn.classList.add('en');
    } else {
      langWrapperEn.classList.add('en', 'hidden');
      langWrapperEn.classList.add('ru');
    }

    Object.entries(key[1]).forEach((el) => {
      Object.entries(el[1]).forEach((prop) => {
        const span = document.createElement('span');
        span.textContent = prop[1];
        if (prop[0] === 'caseDown') {
          span.classList.add(prop[0]);
        } else {
          span.classList.add(prop[0], 'hidden');
        }
        if (el[0] === 'ru') {
          langWrapperRu.append(span);
        } else {
          langWrapperEn.append(span);
        }
      });
    });

    if (lang === 'en') {
      langWrapperRu.childNodes.forEach((el) => el.classList.add('hidden'));
    } else {
      langWrapperEn.childNodes.forEach((el) => el.classList.add('hidden'));
    }

    keyWrapper.append(langWrapperRu, langWrapperEn);
    keyWrapperArr.push(keyWrapper);
  });

  return keyWrapperArr;
};

export default createKeys;
