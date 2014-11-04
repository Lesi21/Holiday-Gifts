//загрузка игры
function Boot(game) {
}

Boot.prototype = {
  preload: function() {
    //this.load.image('preloader', 'assets/preloader.gif');//картинка загрузки игры

  },
  
  create: function() {

	this.game.input.maxPointers = 1;//количество одновременных нажатий (наверное будет 2)
  
	this.game.state.start('preload');//запуск BootState (смотри js/states/preload.js)
  } 
};
