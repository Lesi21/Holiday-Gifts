function Menu() {}

Menu.prototype = {
  create: function() {
	game.stage.backgroundColor = '#00CED1';
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.20, 'button-start', this.startGame, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.35, 'button-levelMap', this.levelMap, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.50, 'button-authors', this.showauthors, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.65, 'button-exit', this.exit, this);

  },
  
  startGame: function() {
    this.game.state.start('play');
  },
  
  startLevelMap: function() {
    this.game.state.start('levelMap');
  }
  showauthors: function() {
    
  }
	exit: function() {
    
  }
  
};
