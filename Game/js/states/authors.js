
function Authors() {}

Authors.prototype = {
  create: function() {
	game.stage.backgroundColor = '#00CED1';
	game.add.button(WINDOW_WIDTH*0.70, WINDOW_HEIGHT*0.80, 'button-exit', this.startMenu, this);
	game.add.text(game.world.centerX*0.7, game.world.centerY*0.5, "Серега! и т.д.", { fontSize: '32px', fill: '#b30030' });
  },
  
  startMenu: function() {
    this.game.state.start('menu');
  },
  
  startGame: function() {
    this.game.state.start('play');
  },
  
  startLevelMap: function() {
    this.game.state.start('levelMap');
  }

  
};
