
function Authors() {}

Authors.prototype = {
  create: function() {
var back = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'backAbout');

	game.add.button(WINDOW_WIDTH*0.65, WINDOW_HEIGHT*0.75, 'button-exit', this.startMenu, this);
  game.add.text(game.world.centerX*0.35, game.world.centerY*0.3, "Игра <<Holiday Gifts>> разработана студентами ФКНТ ДоННТУ", { fontSize: '32px', fill: '#b30030' });
	game.add.text(game.world.centerX*0.65, game.world.centerY*0.55, "Келембет Сергей ПОСс-14а", { fontSize: '32px', fill: '#b30030' });
  game.add.text(game.world.centerX*0.65, game.world.centerY*0.7, "Лукьяненко Евгений ПОСс-14б", { fontSize: '32px', fill: '#b30030' });
  game.add.text(game.world.centerX*0.65, game.world.centerY*0.85, "Лукьянченко Любовь ПОСс-14а", { fontSize: '32px', fill: '#b30030' });
  game.add.text(game.world.centerX*0.65, game.world.centerY*1.0, "Дрозд Юлия ПОСс-14б", { fontSize: '32px', fill: '#b30030' });
  game.add.text(game.world.centerX*0.65, game.world.centerY*1.15, "Ждан Олеся ПОСс-14а", { fontSize: '32px', fill: '#b30030' });
  game.add.text(game.world.centerX*0.2, game.world.centerY*1.5, "P.S. Институт Информатики и Искусственного Интеллекта, мы помним тебя xD", { fontSize: '32px', fill: '#b30030' });
  },
  
  startMenu: function() {
    musicmenu.stop();
    this.game.state.start('menu');
  },
  
  startGame: function() {
    this.game.state.start('play');
  },
  
  startLevelMap: function() {
    this.game.state.start('levelMap');
  }

  
};
