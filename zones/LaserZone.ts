export class LaserZone extends Phaser.GameObjects.Zone {
    laserOn:boolean = false;
    horizontal:boolean = false;
    laser:Phaser.GameObjects.Sprite;
    constructor(scene:Phaser.Scene, o:any) {
        super(scene, o.x, o.y, o.width, o.height);
        if(o.width > o.height)
            this.horizontal = true;
        //Normalize the zone to 32x32 tiles.
        let firsttile = {x:Math.floor(o.x/32), y:Math.floor(o.y/32)};
        let lasttile = {x:Math.floor((o.x + o.width)/32), y:Math.floor((o.y + o.height)/32)};

        this.x = firsttile.x * 32;
        this.y = firsttile.y * 32;

        this.width = (lasttile.x - firsttile.x) * 32 + 32;
        this.height = (lasttile.y - firsttile.y) * 32 + 32;

        if(this.horizontal) {
            this.height = 16;
            this.y += 8;
        } else {
            this.x += 8;
            this.width = 16;
        }

        this.laser = scene.add.sprite(this.x + 8, this.y, 'mainatlas')
        .setOrigin(.5,0)
        .play('laser')
        .setScale(1,lasttile.y - firsttile.y + 1);


        scene.physics.world.enableBody(this);
        this.name = 'Laser Zone';
        let b = this.body as Phaser.Physics.Arcade.Body;
        b.setAllowGravity(false);
        b.moves = false;
        scene.add.existing(this);
        this.setOrigin(0,0);
        this.on('overlap', (o:any)=> {
            scene.events.emit('playerdie');
        }, this);

    }
}