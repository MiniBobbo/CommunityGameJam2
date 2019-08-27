import { Player } from "../src/entities/Player";

export class WinZone extends Phaser.GameObjects.Zone {
    constructor(scene:Phaser.Scene, x, y, width, height) {
        super(scene, x, y, width, height);
        scene.physics.world.enableBody(this);
        this.name = 'Win Zone';
        let b = this.body as Phaser.Physics.Arcade.Body;
        b.setAllowGravity(false);
        b.moves = false;
        scene.add.existing(this);
        this.on('overlap', (o:any)=> {
            if(o.name == 'player') 
                this.scene.events.emit('playerwin');
        }, this);
    }

    // preUpdate(time, delta) {}
}