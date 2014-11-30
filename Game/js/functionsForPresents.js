    //встреча домика с подарком
  function collideFlyPresent(house, flyPresent) {
	flyPresent.kill();
    score += 10;
    scoreText.text = 'Presents: ' + score;
  }

  //встреча с подарком
  function collectPresent (dude, present) {
	present.kill();
    score += 1;
	//убрал уменьшение скорости, т.к. становится неинтересно играть
	/*if(dudeSpeed > 130)
		dudeSpeed = dudeSpeed - 3;*/
    scoreText.text = 'Presents: ' + score;
  }  
 
 function addOnePresent(x, y) {	

		var r = Math.floor(Math.random() * (5 - 1)) + 1;					
		switch(r){
			case 1:	var present = presents.create(x, y, 'present1');	break;
			case 2:	var present = presents.create(x, y, 'present2');	break;
			case 3: var present = presents.create(x, y, 'present3');	break;
			case 4:	var present = presents.create(x, y, 'present4');	break;
			case 5:	var present = presents.create(x, y, 'present5');	break;
			default: var present = presents.create(x, y, 'present1');
		}
        present.reset(x, y);
        present.body.velocity.x = -gameSpeed; //скорость приближения подарков 
        present.checkWorldBounds = true;
        present.outOfBoundsKill = true;
  }
  
  //первая группа подарков
  function addFirstGroup()
  {
		var presentHeight =  Math.random() * ((game.world.height*0.7) - 50) + 50;
			addOnePresent(game.world.width-120, presentHeight);
			addOnePresent(game.world.width-60, presentHeight);
			
			addOnePresent(game.world.width-120, (presentHeight)-40);
			
			addOnePresent(game.world.width-120, (presentHeight)-80);
  }
  
  //вторая группа подарков
  function addSecondGroup()
  {
		var presentHeight =  Math.random() * ((game.world.height*0.7) - 50) + 50;
			addOnePresent(game.world.width-120, presentHeight);
			addOnePresent(game.world.width-60, presentHeight);
            addOnePresent(game.world.width, presentHeight);
			
			addOnePresent(game.world.width-120, (presentHeight)-40);
            addOnePresent(game.world.width, (presentHeight)-40); 
				
			addOnePresent(game.world.width-120, (presentHeight)-80);
			addOnePresent(game.world.width-60, (presentHeight)-80);
            addOnePresent(game.world.width, (presentHeight)-80); 
  }
  
    function addOneFlyPresent() {	

		var r = Math.floor(Math.random() * (5 - 1)) + 1;	
		var x = dude.x;
		var y = dude.y;
		switch(r){
			case 1:	var flyPresent = flyPresents.create(x, y, 'present1');	break;
			case 2:	var flyPresent = flyPresents.create(x, y, 'present2');	break;
			case 3: var flyPresent = flyPresents.create(x, y, 'present3');	break;
			case 4:	var flyPresent = flyPresents.create(x, y, 'present4');	break;
			case 5:	var flyPresent = flyPresents.create(x, y, 'present5');	break;
			default: var flyPresent = flyPresents.create(x, y, 'present1');
		}
        flyPresent.reset(x, y);
	    flyPresent.body.gravity.y = 500;	//задаем величину гравитации
        flyPresent.body.velocity.x = gameSpeed * 0.8;
        flyPresent.checkWorldBounds = true;
        flyPresent.outOfBoundsKill = true;
  }
  
  
  
  			/* //Этот блок из функции НЕ удалять
			addOnePresent(game.world.width-120, presentHeight * game.world.height);
			addOnePresent(game.world.width-60, presentHeight * game.world.height);
            addOnePresent(game.world.width, presentHeight * game.world.height);
				
			addOnePresent(game.world.width-120, (presentHeight * game.world.height)-40);
			addOnePresent(game.world.width-60, (presentHeight * game.world.height)-40);
            addOnePresent(game.world.width, (presentHeight * game.world.height)-40); 
				
			addOnePresent(game.world.width-120, (presentHeight * game.world.height)-80);
			addOnePresent(game.world.width-60, (presentHeight * game.world.height)-80);
            addOnePresent(game.world.width, (presentHeight * game.world.height)-80); 
				*/