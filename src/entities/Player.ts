import { IH } from "../IH/IH";

export class Player {
    sprite:Phaser.Physics.Arcade.Sprite;
    scene:Phaser.Scene;

    PLAYER_ACCEL:number = 3000;
    PLAYER_ACCEL_AIR:number = 1500;
    PLAYER_MAX_SPEED_X:number = 400;
    PLAYER_MAX_SPEED_Y:number = 400;
    PLAYER_JUMP_STR:number = 400;
    PLAYER_JUMP_TIME:number = 200;
    DeltaJump:number = 0;

    constructor(scene:Phaser.Scene) {
        this.sprite = scene.physics.add.sprite(300,100, 'mainatlas', 'player_stand_0');
        this.scene = scene;

        this.sprite.setMaxVelocity(this.PLAYER_MAX_SPEED_X, this.PLAYER_MAX_SPEED_Y);
        this.sprite.setDragX(3000).setSize(26, 30);


    }

    Update(time:number, dt:number) {
        
    }

    HandleInput(ih:IH) {
        let ax = 0;
        this.sprite.setAccelerationX(0);
        let accel = this.sprite.body.blocked.down ? this.PLAYER_ACCEL : this.PLAYER_ACCEL_AIR;
        if(ih.IsPressed('left'))    
            ax -=1;
        if(ih.IsPressed('right'))    
            ax +=1;

        this.sprite.setAccelerationX(ax * accel);

        if(ih.IsJustPressed('jump')) {
            if(this.sprite.body.blocked.down) {
                this.sprite.setVelocityY(-this.PLAYER_JUMP_STR);
                this.DeltaJump = 0;
            }
        }
    }
}