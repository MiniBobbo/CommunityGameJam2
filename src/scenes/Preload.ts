export class Preload extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('http://labs.phaser.io');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');


    }
    create() {
        this.add.image(100,100, 'logo');
    }
}