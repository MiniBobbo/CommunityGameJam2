import { C } from "../src/C";

export class DeathZone extends Phaser.GameObjects.Zone {
    NextLevel:string;
    constructor(scene:Phaser.Scene, o:any) {
        super(scene, o.x, o.y, o.width, o.height);
        scene.physics.world.enableBody(this);
        this.NextLevel = o.type;
        this.name = 'Death Zone';
        let b = this.body as Phaser.Physics.Arcade.Body;
        
        b.setAllowGravity(false);
        b.moves = false;
        scene.add.existing(this);
        this.setOrigin(0,0);
        this.on('overlap', (o:any)=> {
            if(o.name == 'player') {
                if(this.NextLevel != null && this.NextLevel != '')
                    C.level = this.NextLevel;
                scene.events.emit('playerdie');
                //@ts-ignore
                this.body.enable = false;
            }

        }, this);
    }

    // preUpdate(time, delta) {}
}