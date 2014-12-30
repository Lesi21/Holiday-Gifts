//Карта уровней

function LevelMap() {}

LevelMap.prototype = {

  create: function() {
  var backk = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backAbout');

  game.add.button(WINDOW_WIDTH*0.65, WINDOW_HEIGHT*0.75, 'button-exit', this.startMenu, this);
	
	game.add.button(WINDOW_WIDTH*0.70, WINDOW_HEIGHT*0.20, 'level1', this.startLevel1, this);
	game.add.button(WINDOW_WIDTH*0.50, WINDOW_HEIGHT*0.20, 'level2', this.startLevel2, this);
	game.add.button(WINDOW_WIDTH*0.30, WINDOW_HEIGHT*0.20, 'level3', this.startLevel3, this);
	game.add.button(WINDOW_WIDTH*0.08, WINDOW_HEIGHT*0.20, 'level4', this.startLevel4, this);
	
	game.add.button(WINDOW_WIDTH*0.70, WINDOW_HEIGHT*0.40, 'level5', this.startLevel2, this);
	game.add.button(WINDOW_WIDTH*0.50, WINDOW_HEIGHT*0.40, 'level6', this.startLevel2, this);
	game.add.button(WINDOW_WIDTH*0.30, WINDOW_HEIGHT*0.40, 'level6', this.startLevel2, this);

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
