//Карта уровней

function LevelMap() {}

LevelMap.prototype = {
  
  preload: function() {

  },
  
  create: function() {

  },
  
  startClick: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  } 
};
