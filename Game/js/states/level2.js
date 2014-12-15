//Здесь добавляем игровые элементы
//Нужно создать отдельный файл где будем хранить готовые функции
//Подарки и остальные элементы должны появляться за экраном(справо)

var lives = 2;//кол-во жизней персонажа 
var score = 0;//счет игры
var s_score=0;//общий счет игры
var gameSpeed = 250;//скорость приближения подарков, препятствий, бонусов, домиков, земли(ground)
var dudeSpeed = 215;//величина(скорость) подьема персонажа
var backgroundSpeed = 50;//скорость прокрутки фона
var k = 0;

function Level2() {
}
Level2.prototype = {
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
	dude.anchor.set(1);//только для управления №3
    dude.body.allowGravity = true;
	dude.scale.setTo(1.25, 1.25);
	dude.alpha = 1;//прозрачность
       
	//Создаем подарки
    presents = this.game.add.group();  
	presents.enableBody = true;  

	//Создаем скидываемые подарки
    flyPresents = this.game.add.group();
	game.physics.arcade.enable(flyPresents, Phaser.Physics.ARCADE);
	flyPresents.enableBody = true;

	//Создаем летящие снежки
    snowballs = game.add.group();
    snowballs.enableBody = true;
	timerForSnowballs = game.time.events.loop(4500, addNewSnowballs, this);
	
	//Создаем тучи
    clouds = game.add.group();
    clouds.enableBody = true;
	
	//Создаем бонусы
    bonuses = game.add.group();
    bonuses.enableBody = true;
	
	//Создаем домики
    houses = game.add.group();
    houses.enableBody = true;
    
	timerForHouses = game.time.events.loop(5000, addNewHouse, this);
	
	//таймер для контроля сброса подарков
	game.time.events.loop(500, newK, this);
	
	//запускаем добавление подарков, препятствий на уровень
	game.time.events.add(10, addBeforeMainLoop2, this);	
	timerForAllToTheLevel = game.time.events.loop(11000, addAllToTheLevel2, this);
	game.time.events.loop(5000, gameAcceleration, this);//увеличение скорости игры каждые 5сек

	// управление
 	cursors = game.input.keyboard.createCursorKeys();
	
	//поле состояния персонажа, счета игры
	scoreText = game.add.text(16, 16, 'Presents: ' + score, { fontSize: '26px', fill: '#000' });
	lifesText = game.add.text(200, 16, 'Lives: ' + lives, { fontSize: '26px', fill: '#000' });
	S_score = game.add.text(350, 16, 'Score: ' + s_score, { fontSize: '26px', fill: '#000' });
	//кнопка паузы
	pauseButton = game.add.button(WINDOW_WIDTH - 200, 16, 'button-pause', managePause, this);

  },
  
  update: function() {
    this.game.physics.arcade.collide(dude, this.ground);
	this.game.physics.arcade.overlap(dude, presents, collectPresent, null, this);//проверка взял подарок
	this.game.physics.arcade.collide(houses, flyPresents, collideFlyPresent, null, this);//проверка встречи домика с подарком
	this.game.physics.arcade.overlap(dude, snowballs, collideSnowball, null, this);//проверка встречи со снежком
	this.game.physics.arcade.overlap(dude, clouds, collideCloud, null, this);//проверка встречи с облаком
	this.game.physics.arcade.collide(dude, houses, collideHouse, null, this);//проверка встречи с домиком
	
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
	
	/*//управление№2
	if (cursors.up.isDown)
    {

		dude.body.acceleration.y = -430;
		
		game.add.tween(dude).to({angle: -7}, 120).start();
    }	else { dude.body.acceleration.y = 420;	}	*/
		
	//управление№3
	if (cursors.up.isDown) {
		dude.body.gravity.y = 0;
		dude.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(-90, 250));
		game.add.tween(dude).to({angle: -6}, 70).start();
    }	else { dude.body.gravity.y = 800; }
	
	//сброс подарка, клавиша вниз
	if (cursors.down.isDown) {

		if(k == 0 && score > 0) {
			addOneFlyPresent();
			score -= 1;
			k = 1;
		}

    }

  }
};
	//флаг на сброс подарков
	function newK()
	{
		k = 0;
	}	
  //цикл с подарками и препят. запускается не сразу поэтому добавим эту функцию
  function addBeforeMainLoop2(){
	    game.time.events.add(1000, addNewClouds, this);
		game.time.events.add(2000, addNewClouds, this);
		game.time.events.add(3000, addNewClouds, this);
		game.time.events.add(6000, addFirstGroup, this);
		game.time.events.add(6800, addSecondGroup, this);
		game.time.events.add(8000, addFirstGroup, this);
		game.time.events.add(9000, addNewClouds, this);
		game.time.events.add(9500, addNewClouds, this);
  }
  
  function addAllToTheLevel2() {
		var presentHeight =  Math.random()-0.2;
		x = WINDOW_WIDTH - (WINDOW_WIDTH/20);
		y = (Math.random()-0.2) * WINDOW_HEIGHT*0.8;
		var r = Math.floor(Math.random() * (3 - 1)) + 1;//Math.floor(Math.random() * (max - min)) + min - неуч)					
		/*switch(r){
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
		}*/
		
		game.time.events.add(1000, addNewClouds, this);
		game.time.events.add(2000, addNewClouds, this);
		game.time.events.add(3000, addNewClouds, this);
		game.time.events.add(6000, addFirstGroup, this);
		game.time.events.add(6800, addSecondGroup, this);
		game.time.events.add(8000, addFirstGroup, this);
		game.time.events.add(9000, addNewClouds, this);
		game.time.events.add(9500, addNewClouds, this);

  }


