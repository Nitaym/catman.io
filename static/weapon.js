
var Bullet = function (game, key) {


};

function Bullets(game) {
	this.game = game;
	this.single_bullets = game.add.group();
	this.single_bullets.enableBody = true;

	this.bulletsLeft = 1000;

	// Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 120;

	for (var i = 0; i < this.bulletsLeft; i++)
	{
	    bullet = game.add.sprite(0,0, 'bullet');
	    bullet.anchor.set(0.5);

	    bullet.checkWorldBounds = true;
	    bullet.outOfBoundsKill = true;
	    bullet.exists = false;

	    bullet.tracking = false;
	    bullet.scaleSpeed = 0;

		//  We need to enable physics on the bullet
		this.game.physics.arcade.enable(bullet);
		bullet.body.bounce.y = 0;
		bullet.body.gravity.y = 0;


	    this.single_bullets.add(bullet, true);
	}
};

Bullets.prototype = {
	constructor : Bullets,
	preload : function() {},
	create : function() {},


	fire : function (source, angle) {
	    if (this.game.time.time < this.nextFire) { return; }
	    
	   	this.bulletsLeft--;

	   	bullet = this.single_bullets.getFirstExists(false);	   	
	    
	    bullet.reset(source.x + source._frame.centerX, source.y + source._frame.centerY);
	   	// bullet.exists = true;



	    // bullet.enableBody = true;
	    bullet.events.onOutOfBounds.add( this.kill_bullet, this );

        var rand = game.rnd.realInRange(0, 360);
        bullet.angle = rand;
	    bullet.body.angularVelocity = 250;
	    this.game.physics.arcade.velocityFromAngle(angle, 650, bullet.body.velocity);

		this.nextFire = this.game.time.time + this.fireRate;

	},

	kill_bullet : function (bullet) {
		bullet.kill()
		this.bulletsLeft++;
	},
	bullet_target_collision : function (target, bullet) {
		bullet.kill()
		target.kill();
		this.bulletsLeft++;
	},
	bullet_world_collision : function (target, bullet) {
		bullet.kill()
		this.bulletsLeft++;
	},

	is_hit : function(target, kill_target) {
		if (kill_target)
    		this.game.physics.arcade.overlap(target, this.single_bullets, this.bullet_target_collision, null, this);
    	else
    		this.game.physics.arcade.overlap(target, this.single_bullets, this.bullet_world_collision, null, this);
	},
}



// function Weapon(game) {
// 	this.game = game;
// }


// Weapon.prototype = {
// 	constructor: Weapon,
// 	preload : function() {
// 		this.game.load.image('bullet', 'assets/star.png');
// 	},

//  	create : function() {
// 	    this.arrow = this.game.add.sprite(player.x, player.y, 'arrow');
// 	    this.arrow.anchor.setTo(0.5, 0.5);    
// 	    // The player and its settings
// 	    this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

// 	    //  We need to enable physics on the player
// 	    this.game.physics.arcade.enable(this.player);

// 	    //  Player physics properties. Give the little guy a slight bounce.
// 	    this.player.body.bounce.y = 0;
// 	    this.player.body.gravity.y = 1600;
// 	    this.player.body.collideWorldBounds = true;

// 	    //  Our two animations, walking left and right.
// 	    this.player.animations.add('left', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
// 	    this.player.animations.add('right', [0, 1, 2, 3, 5, 6, 7], 10, true);
// 	},

// 	update : function(cursors) {
// 	    //  Reset the players velocity (movement)
// 	    this.player.body.velocity.x = 0;
// 	    this.arrow.x = this.player.x;
// 	    this.arrow.y = this.player.y;

// 		this.arrow.rotation = this.game.physics.arcade.angleToXY(this.arrow, this.game.input.activePointer.x, this.game.input.activePointer.y);

// 	    if (cursors.left.isDown)
// 	    {
// 	        //  Move to the left
// 	        this.player.body.velocity.x = -150;

// 	        this.player.animations.play('left');
// 	    }
// 	    else if (cursors.right.isDown)
// 	    {
// 	        //  Move to the right 
// 	        this.player.body.velocity.x = 150;

// 	        this.player.animations.play('right');
// 	    }
// 	    else
// 	    {
// 	        //  Stand still
// 	        this.player.animations.stop();

// 		    if ((this.arrow.angle < 90) && (this.arrow.angle > -90))
// 		        this.player.frame = 0;
// 		    else
// 		        this.player.frame = 15;
// 	    }   	
	    
// 	    //  Allow the player to jump if they are touching the ground.
// 	    if (cursors.jump.isDown && this.player.body.touching.down)
// 	    {
// 	        this.player.body.velocity.y = -800;
// 	    }

// 	    // if (cursors.shoot.isDown && !bulletsLeft)
// 	    // {
// 	    //     bulletsLeft = true;
// 	    //     bullet = game.add.sprite(player.x, player.y, 'bullet');
// 	    //     bullet.checkWorldBounds = true;
// 	    //     // bullet.enableBody = true;
// 	    //     bullet.events.onOutOfBounds.add( kill_bullet_outOfBounds, this );

// 	    //     //  We need to enable physics on the player
// 	    //     game.physics.arcade.enable(bullet);

// 	    //     //  Player physics properties. Give the little guy a slight bounce.
// 	    //     bullet.body.bounce.y = 0;
// 	    //     bullet.body.gravity.y = 0;
// 	    //     //bullet.body.collideWorldBounds = true;
// 	    //     game.physics.arcade.velocityFromAngle(arrow.angle, 500, bullet.body.velocity);

// 	    // }
// 	}
// }

//# sourceURL=weapon.js
