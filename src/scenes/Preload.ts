export class Preload extends Phaser.Scene {
    preload() {
        this.load.image('tiles', './assets/tiles.png');
        this.load.tilemapTiledJSON('testlevel', './assets/testlevel.json');
        this.load.atlas('mainatlas', './assets/mainatlas.png', './assets/mainatlas.json');

    }
    create() {
        this.scene.start('level');
    }
}