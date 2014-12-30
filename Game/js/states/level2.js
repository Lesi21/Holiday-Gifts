//Здесь добавляем игровые элементы
//Нужно создать отдельный файл где будем хранить готовые функции
//Подарки и остальные элементы должны появляться за экраном(справо)

var flag=true;//музыка в игре включена
var length_of_level;//длительность уровня
var lives = 3;//кол-во жизней персонажа 
var score = 0;//счет игры
var s_score = 0;//общий счет игры
var gameSpeed = 250;//скорость приближения подарков, препятствий, бонусов, домиков, земли(ground)
var dudeSpeed = 215;//величина(скорость) подьема персонажа
var backgroundSpeed = 50;//скорость прокрутки фона
var k = 0;

//переменные для снежка
var max = 0;
var front_emitter;
var mid_emitter;
var back_emitter;
var update_interval = 4 * 60;
var i = 0;


var music;
var sound_for_present;
var sound_for_die;
var sound_for_hit;

var sound_game_over;


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
	game.time.events.add(10, addBeforeMainLoop, this);	
	timerForAllToTheLevel = game.time.events.loop(11000, addAllToTheLevel1, this);
	game.time.events.loop(6500, gameAcceleration, this);//увеличение скорости игры каждые 6,5 сек

	// управление
 	cursors = game.input.keyboard.createCursorKeys();
	
	//поле состояния персонажа, счета игры
	scoreText = game.add.text(16, 16, 'Presents: ' + score, { fontSize: '26px', fill: '#000' });
	lifesText = game.add.text(200, 16, 'Lives: ' + lives, { fontSize: '26px', fill: '#000' });
	S_score = game.add.text(350, 16, 'Score: ' + s_score, { fontSize: '26px', fill: '#000' });

	//кнопка паузы
	pauseButton = game.add.button(WINDOW_WIDTH - 200, 16, 'button-pause', managePause, this);
	sound = game.add.button(WINDOW_WIDTH - 280, 16, 'button-sound', SetSoundOff, this);

//код ответственный за снежок
    back_emitter = game.add.emitter(game.world.centerX, -32, 600);
    back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    back_emitter.maxParticleScale = 0.6;
    back_emitter.minParticleScale = 0.2;
    back_emitter.setYSpeed(20, 100);
    back_emitter.gravity = 0;
    back_emitter.width = game.world.width * 1.5;
    back_emitter.minRotation = 0;
    back_emitter.maxRotation = 40;

    mid_emitter = game.add.emitter(game.world.centerX, -32, 250);
    mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    mid_emitter.maxParticleScale = 1.2;
    mid_emitter.minParticleScale = 0.8;
    mid_emitter.setYSpeed(50, 150);
    mid_emitter.gravity = 0;
    mid_emitter.width = game.world.width * 1.5;
    mid_emitter.minRotation = 0;
    mid_emitter.maxRotation = 40;

    front_emitter = game.add.emitter(game.world.centerX, -32, 50);
    front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
    front_emitter.maxParticleScale = 1;
    front_emitter.minParticleScale = 0.5;
    front_emitter.setYSpeed(100, 200);
    front_emitter.gravity = 0;
    front_emitter.width = game.world.width * 1.5;
    front_emitter.minRotation = 0;
    front_emitter.maxRotation = 40;

    changeWindDirection();

    back_emitter.start(false, 14000, 20);
    mid_emitter.start(false, 12000, 40);
    front_emitter.start(false, 6000, 1000);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	sound_for_present=game.add.audio('soundpresent');
	sound_for_die=game.add.audio('sounddie');;
	sound_for_hit=game.add.audio('soundhit');;
	sound_for_present.volume+=0.5;
	sound_game_over=game.add.audio('gameover');

	musicmenu.stop();
	music = game.add.audio('boden');
	music.stop();
	music.volume-=0.5;
    music.play();
    
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

    i++;
	length_of_level++;
	if((length_of_level==15) ||(s_score==30))//условие окончания игры писать тут
	{

		game.paused = true;
	}
    if (i === update_interval)
    {
        changeWindDirection();
        update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
        i = 0;
    }
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
		//скидываем то что собрали 
		if(k == 0 && score > 0) {
			
			addOneFlyPresent();
			score -= 1;
			scoreText.text = 'Presents: ' + score;
			k = 1;
			sound_for_hit.play();
		}
    }

  }
};

