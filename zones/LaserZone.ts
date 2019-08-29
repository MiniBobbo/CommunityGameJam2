import { C } from "../src/C";

export class LaserZone extends Phaser.GameObjects.Zone {
    laserOn:boolean = true;
    horizontal:boolean = false;
    laser:Phaser.GameObjects.Sprite;
    dot1:Phaser.GameObjects.Sprite;
    dot2:Phaser.GameObjects.Sprite;
    NextLevel:string;
    constructor(scene:Phaser.Scene, o:any) {
        super(scene, o.x, o.y, o.width, o.height);
        if(o.width > o.height)
            this.horizontal = true;

        if(o.properties != null)
            this.NextLevel = o.properties[0].value;
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

        if(!this.horizontal) {
            this.laser = scene.add.sprite(this.x + 8, this.y, 'mainatlas')
            .setOrigin(.5,0)
            .play('laser')
            .setScale(1,lasttile.y - firsttile.y + 1);
            this.dot1 = scene.add.sprite(this.x + 8, this.y, 'mainatlas')
            .play('laserdot')
            this.dot2 = scene.add.sprite(this.x + 8, this.y+this.height, 'mainatlas')
            .play('laserdot')
            
        } else {
            this.laser = scene.add.sprite(this.x, this.y + 8, 'mainatlas')
            .setOrigin(.5,0)
            .setAngle(270)
            .play('laser')
            .setScale(1, lasttile.x - firsttile.x + 1);
            this.dot1 = scene.add.sprite(this.x, this.y + 8, 'mainatlas')
            .play('laserdot')
            this.dot2 = scene.add.sprite(this.x + this.width, this.y + 8, 'mainatlas')
            .play('laserdot')

        }

        if(o.type != null && o.type != '') {
            scene.time.addEvent({
                loop: true,
                delay: o.type,
                callback:this.CycleLaser,
                callbackScope:this
            });
        }

        scene.physics.world.enableBody(this);
        this.name = 'Laser Zone';
        let b = this.body as Phaser.Physics.Arcade.Body;
        b.setAllowGravity(false);
        b.moves = false;
        scene.add.existing(this);
        this.setOrigin(0,0);
        this.on('overlap', (o:any)=> {
            if(this.laserOn) {
                if(this.NextLevel != null)
                    C.level = this.NextLevel;
                scene.events.emit('playerdie');

            }
        }, this);

    }

    CycleLaser() {
        this.laserOn = !this.laserOn;
        this.laser.setVisible(this.laserOn);
        this.dot1.setVisible(this.laserOn);
        this.dot2.setVisible(this.laserOn);
    }
}