//Карта уровней

function LevelMap() {}

LevelMap.prototype = {

  create: function() {
  var backk = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backAbout1');

  game.add.button(WINDOW_WIDTH*0.65, WINDOW_HEIGHT*0.75, 'button-exit', this.startMenu, this);
	
	game.add.button(WINDOW_WIDTH*0.70, WINDOW_HEIGHT*0.07, 'level4', this.startLevel4, this);
	game.add.button(WINDOW_WIDTH*0.70, WINDOW_HEIGHT*0.26, 'level5', this.startLevel5, this);
	game.add.button(WINDOW_WIDTH*0.70, WINDOW_HEIGHT*0.49, 'level6', this.startLevel6, this);
	game.add.button(WINDOW_WIDTH*0.12, WINDOW_HEIGHT*0.05, 'level1', this.startLevel1, this);
	
	game.add.button(WINDOW_WIDTH*0.12, WINDOW_HEIGHT*0.25, 'level2', this.startLevel2, this);
	game.add.button(WINDOW_WIDTH*0.12, WINDOW_HEIGHT*0.48, 'level3', this.startLevel3, this);
	
	//кнопки выбора повозки
	dude1Button = game.add.button(WINDOW_WIDTH*0.40, WINDOW_HEIGHT*0.83, 'dude', this.firstCartCheck, this);
	dude1Button.scale.setTo(0.7, 0.7);
	dude2Button = game.add.button(WINDOW_WIDTH*0.27, WINDOW_HEIGHT*0.83, 'dude2', this.secondCartCheck, this);
	dude2Button.scale.setTo(1.7, 1.7);
	cartText = game.add.text(WINDOW_WIDTH*0.05, WINDOW_HEIGHT*0.85, 'Выберите повозку ', { fontSize: '32px', fill: '#000' });

  },
  
  firstCartCheck: function() {
	typeOfCart = 1;
  },
  
  secondCartCheck: function() {
	typeOfCart = 2;
  },  
  startMenu: function() {
    musicmenu.stop();
    this.game.state.start('menu');
  },
  
  startLevel1: function() {
    this.game.state.start('play');
  },
  
  startLevel2: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('level2');
  },
  /*startLevel3: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('level3');
  },   
  startLevel4: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('level4');
  }*/
};
