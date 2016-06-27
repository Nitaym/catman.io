
function RemotePlayer(game, id, startX, startY) {
	this.game = game;
	this.player_velocity = 300;
	this.id = id;

	this.startX = startX;
	this.startY = startY;
}


RemotePlayer.prototype = {
	constructor: RemotePlayer,

 	create : function() {

	    // The player and its settings
	    this.player = this.game.add.sprite(this.startX, this.startY, 'remote_dude');

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

	destroy : function() {
		this.player.kill();
	},

	remote_update : function(cursors) {
	    //  Reset the players velocity (movement)
	    this.player.body.velocity.x = 0;

    	angle = this.game.math.radToDeg(this.game.physics.arcade.angleToXY(this.player, this.game.input.activePointer.x, this.game.input.activePointer.y));
	    if ((angle < 90) && (angle > -90))
	    	pointingRight = true;
	    else
			pointingRight = false;


	    if (cursors.left)
	    {
	        //  Move to the left
	        this.player.body.velocity.x = -this.player_velocity;

        	if (pointingRight) this.player.animations.play('right'); else this.player.animations.play('left');
	    }
	    else if (cursors.right)
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
	    if (cursors.jump && this.player.body.touching.down)
	    {
	        this.player.body.velocity.y = -800;
	    }

	    if (cursors.shoot)
	    {
	    	this.bullets.fire(this.player, angle);
	    }
	}
}

//# sourceURL=remote_player.js