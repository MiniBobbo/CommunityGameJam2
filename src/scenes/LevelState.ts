export class LevelState extends Phaser.Scene {
    preload() {

    }

    create() {
        let map = this.make.tilemap({ key: "testlevel" });
        let tiles = map.addTilesetImage("tiles", "tiles");

        //@ts-ignore
        map.createDynamicLayer("collision", tiles);

    }
}