export class Player {
    sprite:Phaser.Physics.Arcade.Sprite;
    scene:Phaser.Scene;
    constructor(scene:Phaser.Scene) {
        this.sprite = scene.physics.add.sprite(100,100, 'mainatlas', 'player_stand');
        this.scene = scene;
    }
}