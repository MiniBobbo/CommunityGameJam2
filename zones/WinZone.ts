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
        this.setOrigin(0,0);
        this.on('overlap', (o:any)=> {
            if(o.name == 'player') 
                this.scene.events.emit('playerwin');
        }, this);

        let t = scene.add.sprite(this.x + 14, this.y-4, 'mainatlas').play('teleport');
        

    }

    // preUpdate(time, delta) {}
}