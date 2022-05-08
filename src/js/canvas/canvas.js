/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const q = document.createElement('canvas');
q.id = 'q';

const width = (q.width = 1500);
const height = (q.height = 700);
const letters = Array(256).join(1).split('');

const draw = function () {
  q.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
  q.getContext('2d').fillRect(0, 0, width, height);
  q.getContext('2d').fillStyle = `rgba(0,327,217,${Math.random() * 5 + 0.8})`;
  letters.map(function (yPos, index) {
    const text = String.fromCharCode(65 + Math.random() * 33);
    const xPos = index * 10;
    q.getContext('2d').fillText(text, xPos, yPos);
    letters[index] = yPos > 758 + Math.random() * 1e4 ? 0 : yPos + 10;
  });
};
setInterval(draw, 50);
function colorRandom() {
  q.getContext('2d').fillStyl = 'red';
}

export { q, colorRandom };
