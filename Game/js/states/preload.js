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
	
	this.load.image('dude', 'images/santa.png');
    this.load.image('background', 'images/Sky2.png');
    this.load.image('ground', 'images/ground.png');
	
	this.load.image('present1', 'images/present1.png');
	this.load.image('present2', 'images/present2.png');
	this.load.image('present3', 'images/present3.png');
	this.load.image('present4', 'images/present4.png');
	this.load.image('present5', 'images/present5.png');
	
	this.load.image('snowball', 'images/snowball.png');
	this.load.image('cloud', 'images/cloud.png');
	this.load.image('house', 'images/house.png');
	
	this.load.image('button-pause', 'images/button-pause.png');
	this.load.image('button-start', 'images/button-start.png');
	this.load.image('button-levelMap', 'images/button-levelMap.png');
	this.load.image('button-authors', 'images/button-authors.png');
	this.load.image('button-exit', 'images/button-exit.png');

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
