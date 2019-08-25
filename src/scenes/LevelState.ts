import { Player } from "../entities/Player";
import { IH } from "../IH/IH";

export class LevelState extends Phaser.Scene {
    player:Player;
    ih:IH;
    preload() {

    }

    create() {
        this.ih = new IH(this);
        let map = this.make.tilemap({ key: "testlevel" });
        let tiles = map.addTilesetImage("tiles", "tiles");

        //@ts-ignore
        let l = map.createDynamicLayer("collision", tiles);
        l.setCollisionByProperty({collide:true}, true);

        this.player = new Player(this);
        this.physics.add.collider(this.player.sprite, l);
    }

    update() {
        this.ih.update();
        this.player.HandleInput(this.ih);
    }
}