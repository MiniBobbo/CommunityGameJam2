import { IH } from "../IH/IH";

export class Player {
    sprite:Phaser.Physics.Arcade.Sprite;
    scene:Phaser.Scene;

    PLAYER_DRAG_X:number = 2000;
    PLAYER_ACCEL:number = 3000;
    PLAYER_ACCEL_AIR:number = 1500;
    PLAYER_MAX_SPEED_X:number = 200;
    PLAYER_MAX_SPEED_Y:number = 400;
    PLAYER_JUMP_STR:number = 400;
    PLAYER_JUMP_TIME:number = 12;
    DeltaJump:number = 0;
    ReleasedJump:boolean = false;


    constructor(scene:Phaser.Scene) {
        this.sprite = scene.physics.add.sprite(300,100, 'mainatlas', 'player_stand_0');
        this.scene = scene;

        this.sprite.anims.play('player_run');

        this.sprite.setMaxVelocity(this.PLAYER_MAX_SPEED_X, this.PLAYER_MAX_SPEED_Y);
        this.sprite.setDragX(this.PLAYER_DRAG_X).setSize(26, 30);


    }

    Update(time:number, dt:number) {
        
    }

    HandleInput(ih:IH) {
        let ax = 0;
        this.sprite.setAccelerationX(0);
        let accel = this.sprite.body.blocked.down ? this.PLAYER_ACCEL : this.PLAYER_ACCEL_AIR;
        if(ih.IsPressed('left'))    
            ax -= 2;
        if(ih.IsPressed('right'))    
            ax += 2;

        if(ax < 0)
            this.sprite.flipX = true;
        else if(ax > 0)
            this.sprite.flipX = false;
        

        this.sprite.setAccelerationX(ax * accel);
        // if(this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
        //     // console.log("VX: " + this.sprite.body.velocity.x + ", VY: " + this.sprite.body.velocity.y);
        // }

        if(ih.IsPressed('jump')) {
            if(this.sprite.body.blocked.down) {
                this.ReleasedJump = false;
                this.sprite.setVelocityY(-this.PLAYER_JUMP_STR);
                this.DeltaJump = 0;
            } else if(this.sprite.body.blocked.up) {
                this.ReleasedJump = true;
            } else if(!this.ReleasedJump && this.DeltaJump < this.PLAYER_JUMP_TIME) {
                this.sprite.setVelocityY(-this.PLAYER_JUMP_STR);
                this.DeltaJump++;
            }
        } else {
            this.ReleasedJump = true;
        }

        if(!this.sprite.body.blocked.down) {
            if(this.sprite.body.velocity.y < 0) {
                this.PlayAnimation('player_jumpup');
            } else if (this.sprite.body.velocity.y > 0) {
                this.PlayAnimation('player_jumpdown');
            }
        } else {
            if(this.sprite.body.velocity.x == 0)
            this.PlayAnimation('player_stand');
            else 
            this.PlayAnimation('player_run', true);
        }


    }

    PlayAnimation(anim:string, ignoreIfPlaying:boolean = true) {
        this.sprite.anims.play(anim, ignoreIfPlaying);
        this.sprite.setOffset(this.sprite.width/2 - this.sprite.body.width/2, this.sprite.height/2- this.sprite.body.height/2);
    }
}