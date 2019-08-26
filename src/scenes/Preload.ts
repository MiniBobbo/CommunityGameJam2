import { IH } from "../IH/IH";

export class Preload extends Phaser.Scene {
    preload() {
        this.load.image('tiles', './assets/tiles.png');
        this.load.image('basetiles', './assets/basetiles.png');
        this.load.tilemapTiledJSON('testlevel', './assets/testlevel.json');
        this.load.atlas('mainatlas', './assets/mainatlas.png', './assets/mainatlas.json');

    }
    create() {
        IH.AddVirtualInput('up');
        IH.AddVirtualInput('down');
        IH.AddVirtualInput('left');
        IH.AddVirtualInput('right');
        IH.AddVirtualInput('jump');

        IH.AssignKeyToVirtualInput('UP', 'up');
        IH.AssignKeyToVirtualInput('DOWN', 'down');
        IH.AssignKeyToVirtualInput('LEFT', 'left');
        IH.AssignKeyToVirtualInput('RIGHT', 'right');
        IH.AssignKeyToVirtualInput('W', 'up');
        IH.AssignKeyToVirtualInput('S', 'down');
        IH.AssignKeyToVirtualInput('A', 'left');
        IH.AssignKeyToVirtualInput('D', 'right');
        IH.AssignKeyToVirtualInput('SPACE', 'jump');
        IH.AssignKeyToVirtualInput('L', 'jump');
        this.scene.start('level');

        this.anims.create({ key: 'player_run', frames: this.anims.generateFrameNames('mainatlas', { prefix: 'blueJellyfish', end: 32, zeroPad: 4 }), repeat: -1 });
    }
}