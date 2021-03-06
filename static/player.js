
function Player(game) {
	this.game = game;
	this.player_velocity = 300;
}


Player.prototype = {
	constructor: Player,
	preload : function() {
	    game.load.script('weapon.js', 'weapon.js', null, this);

		this.game.load.spritesheet('dude', 'assets/player-red.png', 50, 50);
	},

 	create : function() {

	    // The player and its settings
	    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

	    //  We need to enable physics on the player
	    this.game.physics.arcade.enable(this.player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    this.player.body.bounce.y = 0;
	    this.player.body.gravity.y = 1600;
	    this.player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    this.player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
	    this.player.animations.add('right', [0, 1, 2, 3, 5, 6, 7], 10, true);

	    this.bullets = new Bullets(this.game);
	},

	update : function(cursors) {
	    //  Reset the players velocity (movement)
	    this.player.body.velocity.x = 0;

    	angle = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(this.player, 
    										this.game.input.activePointer.x, 
    										this.game.input.activePointer.y));
	    if ((angle < 90) && (angle > -90))
	    	pointingRight = true;
	    else
			pointingRight = false;


	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        this.player.body.velocity.x = -this.player_velocity;

        	if (pointingRight) this.player.animations.play('right'); else this.player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right 
	        this.player.body.velocity.x = this.player_velocity;

        	if (pointingRight) this.player.animations.play('right'); else this.player.animations.play('left');
	    }
	    else
	    {
	        //  Stand still
	        this.player.animations.stop();
		    if (pointingRight)
		        this.player.frame = 0;
		    else
		        this.player.frame = 15;

	    }   	
	    
	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.jump.isDown && this.player.body.touching.down)
	    {
	        this.player.body.velocity.y = -800;
	    }

	    if (cursors.shoot.isDown || game.input.activePointer.isDown)
	    {
	    	this.bullets.fire(this.player, angle);
	    }
	}
}

//# sourceURL=player.js