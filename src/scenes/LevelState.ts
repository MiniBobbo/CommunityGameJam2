import { Player } from "../entities/Player";
import { IH } from "../IH/IH";
import { GameObjects } from "phaser";
import { WinZone } from "../../zones/WinZone";

export class LevelState extends Phaser.Scene {
    player:Player;
    ih:IH;
    map:Phaser.Tilemaps.Tilemap;
    debugText:Phaser.GameObjects.Text;
    zones:Array<Phaser.GameObjects.Zone>;
    preload() {

    }

    create() {
        this.ih = new IH(this);
        this.map = this.make.tilemap({ key: "testlevel" });
        let map = this.map;
        let tiles = map.addTilesetImage("tiles", "tiles");
        let basetiles = map.addTilesetImage("basetiles", "basetiles");
        this.zones = [];

        //@ts-ignore
        let l = map.createDynamicLayer("collision", tiles);
        l.setCollisionByProperty({collide:true}, true);
        let mg = map.createStaticLayer('mg', basetiles);

        this.CreatePlayer(l);
        this.CreateZones();
        let fg = map.createStaticLayer('fg', basetiles);

        this.cameras.main.startFollow(this.player.sprite);
        this.cameras.main.fadeIn(300);
        this.debugText = this.add.text(10,10,'').setScrollFactor(0,0);
        this.events.on('debug', (message:string) => {this.debugText.text = message;}, this);
        this.physics.add.overlap(this.player.sprite, this.zones, (p, z:Phaser.GameObjects.Zone) => {z.emit('overlap');});
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
            delay:800,
            callbackScope: this,
            callback:() => {this.player.sprite.body.enable = true;}
        });
    }

    WinLevel() {
        this.player.sprite.disableBody();
        this.time.addEvent({
            delay:300,
            callbackScope:this,
            callback: () => {this.player.PlayAnimation('player_teleport');}
        });
        this.time.addEvent({
            delay:800,
            callbackScope:this,
            callback: () => {this.cameras.main.fadeOut(700, 0,0,0,() => {this.scene.start('game');});}
        });
    }

    CreateZones() {
        let objs = this.map.getObjectLayer('triggers');
        objs.objects.forEach( (o:any) => {
            console.log(`Zone ${o.name}`);
            switch (o.name) {
                case 'end':
                    let z = new WinZone(this, o.x,o.y, 100,100);
                    this.zones.push(z);
                    break;
            
                default:
                    break;
            }
        });
    }
}