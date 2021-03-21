// configure the game (height, width, render-type, game loop)
let background, knight, crates, cursors, coinTimer, coins, scoreText, timeLeftText,
    timeLeftTimer;

let score = 0;
let secondsLeft = 60;
let gameOver = false;

let config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    scene: {
        preload: gamePreload,
        create: gameCreate,
        update: gameUpdate
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            },
            debug: false // shows collision boxes
        }
    }
};

function gamePreload(){
    // loading assets
    this.load.image('background','assets/background.png');
    this.load.image('knight','assets/knight.png');
    this.load.image('crate','assets/crate.png');
    this.load.image('energi','assets/NRG.png');

    // load run animation frames
    this.load.image('run_frame_1', 'assets/knight/run/Run (1).png');
    this.load.image('run_frame_2', 'assets/knight/run/Run (2).png');
    this.load.image('run_frame_3', 'assets/knight/run/Run (3).png');
    this.load.image('run_frame_4', 'assets/knight/run/Run (4).png');
    this.load.image('run_frame_5', 'assets/knight/run/Run (5).png');
    this.load.image('run_frame_6', 'assets/knight/run/Run (6).png');
    this.load.image('run_frame_7', 'assets/knight/run/Run (7).png');
    this.load.image('run_frame_8', 'assets/knight/run/Run (8).png');
    this.load.image('run_frame_9', 'assets/knight/run/Run (9).png');
    this.load.image('run_frame_10', 'assets/knight/run/Run (10).png');

    // load idle animation frames
    this.load.image('idle_frame_1', 'assets/knight/idle/Idle (1).png');
    this.load.image('idle_frame_2', 'assets/knight/idle/Idle (2).png');
    this.load.image('idle_frame_3', 'assets/knight/idle/Idle (3).png');
    this.load.image('idle_frame_4', 'assets/knight/idle/Idle (4).png');
    this.load.image('idle_frame_5', 'assets/knight/idle/Idle (5).png');
    this.load.image('idle_frame_6', 'assets/knight/idle/Idle (6).png');
    this.load.image('idle_frame_7', 'assets/knight/idle/Idle (7).png');
    this.load.image('idle_frame_8', 'assets/knight/idle/Idle (8).png');
    this.load.image('idle_frame_9', 'assets/knight/idle/Idle (9).png');
    this.load.image('idle_frame_10', 'assets/knight/idle/Idle (10).png');
};

function gameCreate(){
    // initial setup logic on the assets and other setup

    // set background
    this.add.image(300, 150, 'background');

    // create knight
    knight = this.physics.add.sprite(200,100,'knight');
    knight.body.setSize(200,600,10,0); // resizing the collision box
    knight.scaleX = 0.15;
    knight.scaleY = knight.scaleX;

    // create the crates
    crates = this.physics.add.staticGroup();
    
    // floor
    crates.create(40,460,'crate');
    crates.create(120,460,'crate');
    crates.create(200,460,'crate');
    crates.create(280,460,'crate');
    crates.create(360,460,'crate');
    crates.create(440,460,'crate');

    // crates in the air
    crates.create(440,360,'crate');
    crates.create(480,260,'crate');
    crates.create(280,260,'crate');
    crates.create(180,220,'crate');
    crates.create(760,460,'crate');
    crates.create(590,370,'crate');
    crates.create(670,370,'crate');
    crates.create(620,120,'crate');

    // create run animation
    this.anims.create({
        key: 'knight_run',
        frames: [
        {key: 'run_frame_1'},
        {key: 'run_frame_2'},
        {key: 'run_frame_3'},
        {key: 'run_frame_4'},
        {key: 'run_frame_5'},
        {key: 'run_frame_6'},
        {key: 'run_frame_7'},
        {key: 'run_frame_8'},
        {key: 'run_frame_9'},
        {key: 'run_frame_10'}
        ],
        frameRate: 10,
        repeat: 1
    });

    // create idle animation
    this.anims.create({
        key: 'knight_idle',
        frames: [
        {key: 'idle_frame_1'},
        {key: 'idle_frame_2'},
        {key: 'idle_frame_3'},
        {key: 'idle_frame_4'},
        {key: 'idle_frame_5'},
        {key: 'idle_frame_6'},
        {key: 'idle_frame_7'},
        {key: 'idle_frame_8'},
        {key: 'idle_frame_9'},
        {key: 'idle_frame_10'}
        ],
        frameRate: 10,
        repeat: 1
    });

    this.physics.add.collider(crates,knight);

    scoreText = this.add.text(16, 16, 'NRG Bag: ' + score,
        {fontSize: '32px', fill: '#000'});

    timeLeftText = this.add.text(16, 66, secondsLeft + ' seconds left',
        {fontSize: '32px', fill: '#f00'});

    cursors = this.input.keyboard.createCursorKeys();

    coinTimer = this.time.addEvent({             // defines how often money rains
        delay: Phaser.Math.Between(1000,3000),   // between 1-3 secs
        callback: generateCoins,
        callbackScope: this,                     // where is the function located
        repeat: -1                               // indefinitely
    });

    timeLeftTimer = this.time.addEvent({             // defines how often money rains
        delay: 1000,   
        callback: updateTimeLeft,
        callbackScope: this,                     // where is the function located
        repeat: -1                               
    });
};

function updateTimeLeft(){
    if(gameOver) return;
    secondsLeft--;
    timeLeftText.setText(secondsLeft + ' seconds left');
    if(secondsLeft <= 0){
        this.physics.pause();
        gameOver = true;
    };
}

function generateCoins(){
    
    coins = this.physics.add.group({
        key: 'energi',
        repeat: 1,
        setXY:{
            x: Phaser.Math.Between(0,800),
            y: -100,                            // above the visible screen
            stepX: Phaser.Math.Between(30,100)
        }
    });

    coins.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4,1.0));
        child.scaleX = 0.2;
        child.scaleY = child.scaleX;
    });

    this.physics.add.collider(coins,crates);
    this.physics.add.overlap(knight, coins, collectCoin, null, this);

};

function collectCoin(knight, coin){
    coin.disableBody(true,true);        //first prop stops, second erases
    score++;
    scoreText.setText('NRG Bag: ' + score);
}

function gameUpdate(){
    // monitoring inputs and telling game how to update - 60 x / sec

    if(cursors.left.isDown){
        knight.setVelocityX(-200);
        knight.play('knight_run', true);
        knight.flipX = true;
    } 
    else if(cursors.right.isDown){
        knight.setVelocityX(200);
        knight.play('knight_run', true);
        knight.flipX = false;
    }
    else {
        knight.setVelocityX(0);
        knight.play('knight_idle', true);
    };

    if(cursors.up.isDown && knight.body.touching.down){
        knight.setVelocityY(-500);
    };
};

let game = new Phaser.Game(config);
