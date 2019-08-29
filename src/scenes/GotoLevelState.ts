export class GoToLevelState extends Phaser.Scene {
    create() {
        this.scene.stop('level');
        // this.scene.get('level').events.removeAllListeners();
        this.scene.start('level');
    }
}