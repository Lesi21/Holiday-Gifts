//Здесь добавляем игровые элементы

var score=0;//счет игры
var speed=215;

function Play() {
}
Play.prototype = {
  create: function() {	
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    	
	//Задаем фон
	var cityField = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
	cityField.autoScroll(-50,0);
	this.game.physics.arcade.enableBody(cityField);
	cityField.body.allowGravity = false;
	cityField.body.immovable = true;
		
	//Земля (пол)
	this.ground = game.add.tileSprite(0, game.world.height-30, game.world.width, 50, 'ground');//добавляем пол(землю)
	this.ground.autoScroll(-250,0);
	this.game.physics.arcade.enableBody(this.ground);
	this.ground.body.immovable = true;
	
    //Создаем персонажа
	dude = this.game.add.sprite(game.world.centerX-100, game.world.centerY, 'dude');
	game.physics.arcade.enable(dude, Phaser.Physics.ARCADE);
	dude.body.gravity.y = 250;	//задаем величину гравитации
	dude.body.collideWorldBounds = true;
	this.game.add.existing(dude);
    dude.body.allowGravity = true;
       
	//Создаем подарки
    presents = this.game.add.group();  
	presents.enableBody = true;     	
	timerforpresents = game.time.events.loop(2500, addNewPresents, this);
		
	//Создаем препятствия
    obstacles = game.add.group();
    obstacles.enableBody = true;
	
	//Создаем бонусы
    bonuses = game.add.group();
    bonuses.enableBody = true;
		
	// управление
 	cursors = game.input.keyboard.createCursorKeys();
	scoreText = game.add.text(16, 16, 'Presents', { fontSize: '32px', fill: '#000' });
  },
  
  update: function() {
    this.game.physics.arcade.collide(dude, this.ground);
	this.game.physics.arcade.overlap(dude, presents, collectPresent, null, this);//проверка взял подарок
	if (cursors.up.isDown)
    {
    	dude.body.velocity.y = -speed;
            dude.body.velocity.x = 0;
    }         
	if (cursors.down.isDown)
    {
        dude.body.velocity.y = 55;
        dude.body.velocity.x = 0;
    }  

  }
};

 function addNewPresents() {
              for (var i = 0; i < 2; i++)
        {
        			var r=Math.floor(Math.random()*6)+1;					
						switch(r){
					case 1:
							presents.createMultiple(1, 'present1');
							break;
					case 2:
							presents.createMultiple(1, 'present2');
							break;
					case 3: 
							presents.createMultiple(1, 'present3');
							break;
					case 4:
							presents.createMultiple(1, 'present4');
							break;
					case 5:
							presents.createMultiple(1, 'present5');
							break;
					default: break;
					}					
			x=Math.random() * (WINDOW_WIDTH - (WINDOW_WIDTH/2 +90)) + (WINDOW_WIDTH/2 +90);
			y=Math.random() * (300 - 80) + 80;
			addOnePresent(x, y);
        }
    }
	
function collectPresent (dude, present) {
	present.kill();
    score += 1;
	speed=speed-7;
    scoreText.text = 'Presents: ' + score;
}
function addOnePresent(x, y) {	
        var present = this.presents.getFirstDead();
        present.reset(x, y);
        present.body.velocity.x = -130; //скорость приближения подарков 
        present.checkWorldBounds = true;
        present.outOfBoundsKill = true;
  }
