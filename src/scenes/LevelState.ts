import { Player } from "../entities/Player";
import { IH } from "../IH/IH";

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

        let fg = map.createStaticLayer('fg', basetiles);

        this.cameras.main.startFollow(this.player.sprite);
        this.debugText = this.add.text(10,10,'').setScrollFactor(0,0);
        this.events.on('debug', (message:string) => {this.debugText.text = message;}, this);
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
}