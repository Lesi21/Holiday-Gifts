  function addNewSnowballs()
  {
	var snowballHeight =  Math.random() * ((game.world.height*0.7) - 50) + 50;
	var snowball = snowballs.create(game.world.width, snowballHeight, 'snowball');
	snowball.scale.setTo(0.35, 0.35);
    snowball.body.velocity.x = -gameSpeed * 3; //скорость приближения снежка 
    snowball.checkWorldBounds = true;
    snowball.outOfBoundsKill = true;
  }
  
  //встреча со снежком
  function collideSnowball(dude, snowball) {
	snowball.kill();
	sound_for_die.play();
	if(s_score>50) s_score-=50;
	else s_score=0;
	if(lives > 1)
		lives -= 1;
	else 
		{
			//dude.destroy();
			game.add.tween(dude).to( { alpha: 0 }, 1400, Phaser.Easing.Linear.None, true, 0, 1000, true);
			game.add.text(game.world.centerX, game.world.centerY-300, "You killed Santa(", { fontSize: '32px', fill: '#b30030' });
			game.time.events.add(1500, iDied, this);
		}
    lifesText.text = 'Lives: ' + lives;
  }