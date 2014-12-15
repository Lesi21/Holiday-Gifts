
function Menu() {}

Menu.prototype = {
  create: function() {
	game.stage.backgroundColor = '#00CED1';
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.20, 'button-start', this.startGame, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.35, 'button-levelMap', this.startLevelMap, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.50, 'button-authors', this.startAuthors, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.65, 'button-exit', this.startGame, this);

  },
  
  startGame: function() {
    this.game.state.start('play');
  },
  
  startAuthors: function() {
    this.game.state.start('authors');
  },
  
  startLevelMap: function() {
    this.game.state.start('levelMap');
  }

  
};
