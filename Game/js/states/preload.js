//Сюда добавляем все ресурсы (картинки, спрайты, звуки и т.п.)

function Preload() {
  this.asset = null;
  this.ready = false; //флаг для проверки загрузки
}

Preload.prototype = {
  preload: function() {
    //this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');//картинка загрузки игры
    //this.asset.anchor.setTo(0.5, 0.5);
    //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    //this.load.setPreloadSprite(this.asset);

	game.load.audio('boden', ['audio/sound1.mp3', 'audio/sound1.ogg']);
	game.load.audio('soundmenu', ['audio/sound2.mp3', 'audio/sound2.ogg']);
	game.load.audio('soundpresent', ['audio/presents.ogg']);
	game.load.audio('sounddie', ['audio/die.ogg']);
	game.load.audio('soundhit', ['audio/hit.mp3']);

	game.load.audio('gameover', ['audio/gameover.mp3']);

	this.load.image('dude', 'images/santa.png');
    this.load.image('background', 'images/sky3.png');
    this.load.image('ground', 'images/ground.png');
	
	this.load.image('panel', 'images/panel.png');
    this.load.image('backAbout', 'images/backAbout.jpg');
	
	this.load.image('present1', 'images/present1.png');
	this.load.image('present2', 'images/present2.png');
	this.load.image('present3', 'images/present3.png');
	this.load.image('present4', 'images/present4.png');
	this.load.image('present5', 'images/present5.png');
	
	this.load.image('snowball', 'images/snowball.png');
	this.load.image('cloud', 'images/cloud.png');
	this.load.image('house', 'images/house.png');
	
	this.load.image('heart', 'images/heart.png');

    game.load.spritesheet('snowflakes', 'images/snowflakes.png', 17, 17);
    game.load.spritesheet('snowflakes_large', 'images/snowflakes_large.png', 64, 64);

	this.load.image('button-sound', 'images/sound.png');
    this.load.image('soundOFF', 'images/soundOff.png');

	this.load.image('backmenu', 'images/backmenu.jpg');
	
	//кнопки управления для меню
	this.load.image('button-pause', 'images/button-pause.png');
	this.load.image('button-play', 'images/button-play.png');
	this.load.image('button-start', 'images/button-start.png');
	this.load.image('button-levelMap', 'images/button-levelMap.png');
	this.load.image('button-authors', 'images/button-authors.png');
	this.load.image('button-exit', 'images/button-exit.png');

	//кнопки управления для карты уровней
	this.load.image('level1', 'images/levelMapButtons/level1.png');
	this.load.image('level2', 'images/levelMapButtons/level2.png');
	this.load.image('level3', 'images/levelMapButtons/level3.png');
	this.load.image('level4', 'images/levelMapButtons/level4.png');
	this.load.image('level5', 'images/levelMapButtons/level5.png');
	this.load.image('level6', 'images/levelMapButtons/level6.png');
  },
  
  create: function() {
    //this.asset.cropEnabled = false;
  },
  update: function() {
    //if(!!this.ready) {
      this.game.state.start('menu');
	  //this.game.state.start('play');
    //}
  },
  
  onLoadComplete: function() {    //проверка все ли загрузилось
    this.ready = true;
  }
};
