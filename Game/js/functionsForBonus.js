 function addBonus() {	
	var r = Math.floor(Math.random() * (3 - 1)) + 1;//Math.floor(Math.random() * (max - min)) + min - неуч)					
		switch(r){
			case 1:	{ addBonusSpeed();
			
					} break;
			case 2:	{ addBonusLive();

					} break;

			default: { addBonusLive();
			
					 } 
			    }
	}
 function addBonusLive() {	

		var bonusLiveHeight =  Math.random() * ((game.world.height*0.7) - 50) + 50;	
		var bonusLive = bonusLives.create(game.world.width, bonusLiveHeight, 'heart');

		bonusLive.scale.setTo(0.17, 0.17);
		bonusLive.body.velocity.x = -gameSpeed * 1.2; //скорость приближения бонуса
		bonusLive.checkWorldBounds = true;
		bonusLive.outOfBoundsKill = true;
	} 
	
	  //встреча с бонусом
	function collectBonusLive (dude, bonusLive) {
		sound_for_present.play();
		bonusLive.kill();
		s_score += 10;
		lives++;
		S_score.text = 'Score: ' + s_score;
		lifesText.text = 'Lives: ' + lives;
	} 
	
	
  function addBonusSpeed() {	

		var bonusSpeedHeight =  Math.random() * ((game.world.height*0.7) - 50) + 50;	
		var bonusSpeed = bonusSpeeds.create(game.world.width, bonusSpeedHeight, 'bonus2');

		bonusSpeed.scale.setTo(0.17, 0.17);
		bonusSpeed.body.velocity.x = -gameSpeed * 1.2; //скорость приближения бонуса
		bonusSpeed.checkWorldBounds = true;
		bonusSpeed.outOfBoundsKill = true;
	} 
	
	function collectBonusSpeed (dude, bonusSpeed) {
		sound_for_present.play();
		bonusSpeed.kill();
		s_score += 20;
		gameSpeed += gameSpeed * 0.05;
		backgroundSpeed += backgroundSpeed * 0.02;
		S_score.text = 'Score: ' + s_score;
		lifesText.text = 'Lives: ' + lives;
	} 
	