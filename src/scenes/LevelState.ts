import { Player } from "../entities/Player";
import { IH } from "../IH/IH";
import { GameObjects } from "phaser";
import { WinZone } from "../../zones/WinZone";
import { CompScreen } from "../entities/CompScreen";
import { LevelDef } from "../../def/LevelDef";
import { AudioZone } from "../../zones/AudioZone";
import { C } from "../C";
import { DeathZone } from "../../zones/DeathZone";
import { LaserZone } from "../../zones/LaserZone";

export class LevelState extends Phaser.Scene {
    player:Player;
    ih:IH;
    map:Phaser.Tilemaps.Tilemap;
    debugText:Phaser.GameObjects.Text;
    zones:Array<Phaser.GameObjects.Zone>;
    preload() {

    }

    create() {
        this.time.removeAllEvents();
        this.ih = new IH(this);
        this.map = this.make.tilemap({ key: C.level });
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
        this.cameras.main.fadeIn(1000);
        this.debugText = this.add.text(10,10,'').setScrollFactor(0,0);
         this.physics.add.overlap(this.player.sprite, this.zones, (p, z:Phaser.GameObjects.Zone) => {
            console.log(`Overlap zone ${z.name}`);    
            z.emit('overlap', p);
        });
        this.cameras.main.setBounds(0,0,l.width, l.height);
        this.events.on('shutdown', this.ShutDown, this);
        this.events.on('debug', (message:string) => {this.debugText.text = message;}, this);
        this.events.on('playerwin', this.WinLevel, this);
        this.events.on('playerdie', this.PlayerDie, this);

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
            delay:1000,
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
            //@ts-ignore
            callback: () => {
                console.log(`Going to ${C.level}`);
                this.cameras.main.fadeOut(3000, 0,0,0,() => {this.scene.restart();});  }
        });
    }

    PlayerDie() {
        this.player.sprite.disableBody();
        this.player.sprite.emit('disableinput');
        this.player.PlayAnimation('player_die');
        this.time.addEvent({
            delay:4000,
            callbackScope:this,
            //@ts-ignore
            callback: () => {
                console.log(`Going to ${C.level}`);
                this.cameras.main.fadeOut(3000, 0,0,0,() => {this.scene.restart();});}
        });
    }



    CreateZones() {
        let objs = this.map.getObjectLayer('triggers');
        objs.objects.forEach( (o:any) => {
            switch (o.name) {
                case 'end':
                    let z = new WinZone(this, o);
                    this.zones.push(z);
                    break;
                case 'screen':
                    let s = new CompScreen(this, o.type);
                    s.setPosition(o.x,o.y);
                    break;
                case 'death':
                    let d = new DeathZone(this, o);
                    d.setPosition(o.x,o.y);
                    this.zones.push(d);
                    break;
                case 'laser':
                    let l = new LaserZone(this, o);
                    this.zones.push(l);
                break;
                case 'audio':
                    let a = new AudioZone(this,  o.x,o.y, o.width,o.height, `a_${o.type}`);
                    this.zones.push(a);
                    break;
                    default:
                    break;


            }
        });
    }

    ShutDown() {
        this.events.removeListener('shutdown');
        this.events.removeListener('debug');
        this.events.removeListener('playerwin');
        this.events.removeListener('playerdie');

    }
}