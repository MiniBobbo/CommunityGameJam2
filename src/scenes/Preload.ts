export class Preload extends Phaser.Scene {
    preload() {
        this.load.image('tiles', './assets/tiles.png');
        this.load.tilemapTiledJSON('testlevel', './assets/testlevel.json');

    }
    create() {
        this.scene.start('level');
    }
}