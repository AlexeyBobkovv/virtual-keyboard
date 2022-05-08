import './styles/index.scss';
import init from './js/intitKeys';
import { pressHandle } from './js/pressFuncs/pressHandle';
// import keyboardStore from './store/store';

window.addEventListener('DOMContentLoaded', init);
// window.addEventListener('DOMContentLoaded', keyboardStore);
window.addEventListener('keydown', pressHandle);
window.addEventListener('keyup', pressHandle);
