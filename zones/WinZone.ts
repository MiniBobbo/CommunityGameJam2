import { Player } from "../src/entities/Player";
import { C } from "../src/C";

export class WinZone extends Phaser.GameObjects.Zone {
    NextLevel:string;
    constructor(scene:Phaser.Scene, o:any) {
        super(scene, o.x, o.y, o.width, o.height);
        this.NextLevel = o.type;
        scene.physics.world.enableBody(this);
        this.name = 'Win Zone';
        let b = this.body as Phaser.Physics.Arcade.Body;
        b.setAllowGravity(false);
        b.moves = false;
        scene.add.existing(this);
        this.setOrigin(0,0);
        this.on('overlap', (o:any)=> {
            if(o.name == 'player') {
                C.level = this.NextLevel;
                this.scene.events.emit('playerwin');
                
            }
        }, this);

        let t = scene.add.sprite(this.x + 14, this.y-4, 'mainatlas').play('teleport');
        

    }

    // preUpdate(time, delta) {}
}