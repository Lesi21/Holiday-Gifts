//Наше будущее меню

function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  
  create: function() {

	
	//this.game.state.start('play');
  },
  
  startClick: function() {

    this.game.state.start('play');
  }
  
};
