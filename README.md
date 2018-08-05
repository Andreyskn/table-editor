<pre>
Инструкция по запуску:

Для yarn:
$ yarn
$ yarn start
  
Для npm:
$ npm i
$ npm start

Задача:
Ticker
Почему this._i не увеличивается. Как исправить?

function Ticker() {
  this._i = 0
};

Ticker.prototype = {
  tick: function () {
    console.log(this._i++);
  }
};

var ticker = new Ticker();
setInterval(ticker.tick, 1000);


Ответ:
this внутри setInterval ссылается на объект window и метод tick ищет переменную _i в window.
Исправить это можно обернув вызов метода в анонимную функцию:

setInterval(function () {
  return ticker.tick();
}, 1000);

или используя синтаксис ES6 привязать метод к контексту своего класса:

class Ticker {
  constructor() {
    this._i = 0;
    this.tick = this.tick.bind(this); 
  }

  tick() {
    console.log(this._i++);
  }
}

const ticker = new Ticker();
setInterval(ticker.tick, 1000);
</pre>
