//Здесь добавляем игровые элементы
//Нужно создать отдельный файл где будем хранить готовые функции
//Подарки и остальные элементы должны появляться за экраном(справо)
 //На репозитории нужно создать две ветки master and developer(сокращенно dev)
var lives = 2;//кол-во жизней персонажа 
var score = 0;//счет игры
var gameSpeed = 250;//скорость приближения подарков, препятствий, бонусов, домиков, земли(ground)
var dudeSpeed = 215;//величина(скорость) подьема персонажа
var backgroundSpeed = 50;//скорость прокрутки фона

function Play() {
}
Play.prototype = {
  create: function() {	
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	
	//Задаем фон
	var cityField = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
	cityField.autoScroll(-backgroundSpeed, 0);
	this.game.physics.arcade.enableBody(cityField);
	cityField.body.allowGravity = false;
	cityField.body.immovable = true;
		
	//Земля (пол)
	this.ground = game.add.tileSprite(0, game.world.height-30, game.world.width, 50, 'ground');//добавляем пол(землю)
	this.ground.autoScroll(-gameSpeed, 0);
	this.game.physics.arcade.enableBody(this.ground);
	this.ground.body.immovable = true;
	
    //Создаем персонажа
	dude = this.game.add.sprite(game.world.centerX - 220, game.world.centerY, 'dude');
	game.physics.arcade.enable(dude, Phaser.Physics.ARCADE);
	//dude.body.gravity.y = 250;	//задаем величину гравитации
	dude.body.collideWorldBounds = true;
	this.game.add.existing(dude);
    dude.body.allowGravity = true;
	dude.scale.setTo(1.3, 1.3);
       
	//Создаем подарки
    presents = this.game.add.group();  
	presents.enableBody = true;     	
	timerForPresents = game.time.events.loop(5000, addNewPresents, this);
		
	//Создаем препятствия(летящие снежки)
    snowballs = game.add.group();
    snowballs.enableBody = true;
	timerForSnowballs = game.time.events.loop(4000, addNewSnowballs, this);
	
	//Создаем бонусы
    bonuses = game.add.group();
    bonuses.enableBody = true;
		
	// управление
 	cursors = game.input.keyboard.createCursorKeys();
	
	//поле состояния персонажа, счета игры
	scoreText = game.add.text(16, 16, 'Presents: ' + score, { fontSize: '26px', fill: '#000' });
	lifesText = game.add.text(200, 16, 'Lives: ' + lives, { fontSize: '26px', fill: '#000' });
	
	//кнопка паузы
	pauseButton = game.add.button(WINDOW_WIDTH - 200, 16, 'button-pause', managePause, this);
	
  },
  
  update: function() {
    this.game.physics.arcade.collide(dude, this.ground);
	this.game.physics.arcade.overlap(dude, presents, collectPresent, null, this);//проверка взял подарок
	this.game.physics.arcade.overlap(dude, snowballs, collideSnowball, null, this);//проверка взял подарок
	
	if (dude.angle < 3)//угловой наклон
        dude.angle += 0.6;
	//управление №1; на этом управлении нужно разблокировать гравитацию строка 33
	/*if (cursors.up.isDown)
    {
    	dude.body.velocity.y = -dudeSpeed;
            dude.body.velocity.x = 0;
		game.add.tween(dude).to({angle: -7}, 80).start();
    }         
	if (cursors.down.isDown)
    {
        dude.body.velocity.y = 55;
        dude.body.velocity.x = 0;
    } */ 
	
	//управление№2
	if (cursors.up.isDown)
    {
		dude.body.acceleration.y = -420;
		game.add.tween(dude).to({angle: -7}, 120).start();
    }	else { dude.body.acceleration.y = 380;}

  }
};

  function addNewPresents() {
		var presentHeight =  Math.random()-0.2;
		x = WINDOW_WIDTH - (WINDOW_WIDTH/20);
		y = (Math.random()-0.2) * WINDOW_HEIGHT*0.8;
		var r = Math.floor(Math.random() * (3 - 1)) + 1;//Math.floor(Math.random() * (max - min)) + min - неуч)					
		switch(r){
			case 1:	{ addFirstGroup();
					  game.time.events.add(2000, addSecondGroup, this);
					  game.time.events.add(4000, addFirstGroup, this);
					} break;
			case 2:	{ addFirstGroup();
					  game.time.events.add(2000, addSecondGroup, this);
					  game.time.events.add(4000, addFirstGroup, this);
					} break;
			case 3: { addFirstGroup();
					  game.time.events.add(2000, addSecondGroup, this);
					  game.time.events.add(4000, addFirstGroup, this);
					} break;

			default: { addFirstGroup();
					   game.time.events.add(2000, addSecondGroup, this);
					   game.time.events.add(4000, addFirstGroup, this);	
					 }
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
  }
	
  //встреча с подарком
  function collectPresent (dude, present) {
	present.kill();
    score += 1;
	if(dudeSpeed > 130)
		dudeSpeed = dudeSpeed - 3;
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
  
  function addNewSnowballs()
  {
	var snowballHeight =  Math.random() * ((game.world.height*0.7) - 50) + 50;
	var snowball = snowballs.create(game.world.width, snowballHeight, 'snowball');
	snowball.scale.setTo(0.4, 0.4);
    snowball.body.velocity.x = -700; //скорость приближения снежка 
    snowball.checkWorldBounds = true;
    snowball.outOfBoundsKill = true;
  }
  
  //встреча со снежком
  function collideSnowball(dude, snowball) {
	snowball.kill();
	if(lives > 1)
		lives -= 1;
	else 
		{
			dude.destroy();
			game.add.text(game.world.centerX - 100, game.world.centerY, "You killed Santa.", { fontSize: '32px', fill: '#b30030' });
			game.time.events.add(1000, iDied, this);
		}
	
    lifesText.text = 'Lives: ' + lives;
  }
  
  //события после смерти санты
  function iDied()
  {
	score = 0;
	lives = 2;
	this.game.state.start('play');
  }
  
  
  

  function managePause(){
		game.paused = true;
		var pausedText = game.add.text(100, 250, "Game paused.\nTap anywhere to continue.");
		game.input.onDown.add(function(){	pausedText.destroy();	game.paused = false;//снимаем с паузы
										    }, this);
  }
