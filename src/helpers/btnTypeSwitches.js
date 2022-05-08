const disableBtnType = (filteredArr, typeToDisable) => {
  Array.from(filteredArr)
    .filter((elem) => elem.classList.contains(typeToDisable))[0]
    .classList.add('hidden');
};

const enableBtnType = (filteredArr, typeToEnable) => {
  Array.from(filteredArr)
    .filter((elem) => elem.classList.contains(typeToEnable))[0]
    .classList.remove('hidden');
};

export { disableBtnType, enableBtnType };
