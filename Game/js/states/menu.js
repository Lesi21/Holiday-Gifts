var musicmenu;
function Menu() {}

Menu.prototype = {
  create: function() {
  	musicmenu = game.add.audio('soundmenu');
	musicmenu.stop();
    musicmenu.play();
    var cityField = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backmenu');

	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.27, 'button-start', this.startGame, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.42, 'button-levelMap', this.startLevelMap, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.57, 'button-authors', this.startAuthors, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.72, 'button-exit', this.exitgame, this);
	
  },
  
  startGame: function() {
    this.game.state.start('play');
  },
  
  startAuthors: function() {
    this.game.state.start('authors');
  },
  
  startLevelMap: function() {
    this.game.state.start('levelMap');
  },

  
};
