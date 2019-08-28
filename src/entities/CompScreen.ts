export class CompScreen extends Phaser.GameObjects.Container {
    t:Phaser.GameObjects.Text;
    constructor(scene:Phaser.Scene, text:string) {
        super(scene);
        scene.add.existing(this);
        let s = scene.add.image(0,0,'mainatlas', 'screen');
        this.add(s);
        this.t = scene.add.text(14 - s.width/2,12 - s.height/2 , text)
        .setFontSize(10)
        .setWordWrapWidth(84)
        .setAlign('center');
        this.add(this.t);
    }
}