export class AudioZone extends Phaser.GameObjects.Zone {
    constructor(scene:Phaser.Scene, x, y, width, height, audio:string) {
        super(scene, x, y, width, height);
        scene.physics.world.enableBody(this);
        this.name = 'Audio Zone';
        let b = this.body as Phaser.Physics.Arcade.Body;
        
        b.setAllowGravity(false);
        b.moves = false;
        scene.add.existing(this);
        this.setOrigin(0,0);
        this.on('overlap', (o:any)=> {
            if(o.name == 'player') 
                this.scene.sound.play(audio);
                //@ts-ignore
                this.body.enable = false;
        }, this);
    }

    // preUpdate(time, delta) {}
}