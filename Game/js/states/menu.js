var musicmenu;
function Menu() {}

Menu.prototype = {
  create: function() {
    //var cityField = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backmenu');
  //cityField.autoScroll(-backgroundSpeed, 0);
  //this.game.physics.arcade.enableBody(cityField);
  //cityField.body.allowGravity = false;
  //cityField.body.immovable = true;
	game.stage.backgroundColor = '#00CED1';
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.20, 'button-start', this.startGame, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.35, 'button-levelMap', this.startLevelMap, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.50, 'button-authors', this.startAuthors, this);
	game.add.button(WINDOW_WIDTH*0.35, WINDOW_HEIGHT*0.65, 'button-exit', this.exitgame, this);
	musicmenu = game.add.audio('soundmenu');
	musicmenu.stop();
    musicmenu.play();
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
