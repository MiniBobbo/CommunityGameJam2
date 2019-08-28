import { Player } from "../entities/Player";
import { IH } from "../IH/IH";
import { GameObjects } from "phaser";
import { WinZone } from "../../zones/WinZone";
import { CompScreen } from "../entities/CompScreen";
import { LevelDef } from "../../def/LevelDef";
import { AudioZone } from "../../zones/AudioZone";

export class LevelState extends Phaser.Scene {
    player:Player;
    ih:IH;
    map:Phaser.Tilemaps.Tilemap;
    debugText:Phaser.GameObjects.Text;
    zones:Array<Phaser.GameObjects.Zone>;
    preload() {

    }

    create(level:LevelDef) {
        this.ih = new IH(this);
        this.map = this.make.tilemap({ key: level.name });
        let map = this.map;
        let tiles = map.addTilesetImage("tiles", "tiles");
        let basetiles = map.addTilesetImage("basetiles", "basetiles");
        this.zones = [];

        //@ts-ignore
        let l = map.createDynamicLayer("collision", tiles);
        l.setCollisionByProperty({collide:true}, true);
        let bg = map.createStaticLayer('bg', basetiles);
        let mg = map.createStaticLayer('mg', basetiles);

        this.CreateZones();
        this.CreatePlayer(l);
        let fg = map.createStaticLayer('fg', basetiles);

        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.fadeIn(300);
        this.debugText = this.add.text(10,10,'').setScrollFactor(0,0);
        this.events.on('debug', (message:string) => {this.debugText.text = message;}, this);
        this.events.on('playerwin', this.WinLevel, this);
        this.physics.add.overlap(this.player.sprite, this.zones, (p, z:Phaser.GameObjects.Zone) => {
            console.log(`Overlap zone ${z.name}`);    
            z.emit('overlap', p);
        });
        this.cameras.main.setBounds(0,0,l.width, l.height);
    }


    update(time:number, dt:number) {
        this.ih.update();
        this.player.HandleInput(this.ih);
    }

    CreatePlayer(l:Phaser.Tilemaps.DynamicTilemapLayer) {
        this.player = new Player(this);
        this.player.PlayAnimation('blank');
        this.physics.add.collider(this.player.sprite, l);
        const spawnPoint = this.map.findObject('triggers', obj => obj.name === "start");
        //@ts-ignore
        this.player.sprite.setPosition(spawnPoint.x, spawnPoint.y );
        this.player.sprite.disableBody();
        this.time.addEvent({
            delay:300,
            callbackScope: this,
            callback:() => {this.player.PlayAnimation('player_appear');}
        });
        this.time.addEvent({
            delay:1500,
            callbackScope: this,
            callback:() => {this.player.sprite.body.enable = true; this.player.sprite.emit('enableinput');}
        });
    }

    WinLevel() {
        this.player.sprite.disableBody();
        this.player.sprite.emit('disableinput');
        this.time.addEvent({
            delay:500,
            callbackScope:this,
            callback: () => {this.player.PlayAnimation('player_teleport');}
        });
        this.time.addEvent({
            delay:4000,
            callbackScope:this,
            callback: () => {this.cameras.main.fadeOut(1000, 0,0,0,() => {this.scene.start('level');});}
        });
    }

    PlayerDie() {
        this.player.sprite.disableBody();
        this.player.sprite.emit('disableinput');
        this.time.addEvent({
            delay:500,
            callbackScope:this,
            callback: () => {this.player.PlayAnimation('player_die');}
        });
        this.time.addEvent({
            delay:4000,
            callbackScope:this,
            callback: () => {this.cameras.main.fadeOut(1000, 0,0,0,() => {this.scene.start('level');});}
        });
    }

    CreateZones() {
        let objs = this.map.getObjectLayer('triggers');
        objs.objects.forEach( (o:any) => {
            console.log(`Zone ${o.name}`);
            switch (o.name) {
                case 'end':
                    let z = new WinZone(this, o.x,o.y, o.width,o.height);
                    this.zones.push(z);
                    break;
                case 'screen':
                    let s = new CompScreen(this, o.type);
                    s.setPosition(o.x,o.y);
                case 'audio':
                    let a = new AudioZone(this,  o.x,o.y, o.width,o.height, `a_${o.type}`);
                    this.zones.push(a);
                    default:
                    break;
            }
        });
    }
}