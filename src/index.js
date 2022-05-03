import "./styles/index.scss";

class Game {
  name = "Violin Charades";
}
const myGame = new Game();

// создаем параграф
const p = document.createElement("p");
p.textContent = `I like ${myGame.game}.`;

// создаем элемент заголовка
const heading = document.createElement("h1");
heading.textContent = "Как интересно!";

// добавляем параграф и заголовок в DOM
const root = document.querySelector("#root");
root.append(heading, p);
