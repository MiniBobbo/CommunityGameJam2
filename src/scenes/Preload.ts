import { IH } from "../IH/IH";
import { LevelDef } from "../../def/LevelDef";

export class Preload extends Phaser.Scene {
    preload() {
        this.load.image('tiles', './assets/tiles.png');
        this.load.image('basetiles', './assets/basetiles.png');
        this.load.tilemapTiledJSON('testlevel', './assets/testlevel.json');
        this.load.tilemapTiledJSON('l1', './assets/l1.json');
        this.load.atlas('mainatlas', './assets/mainatlas.png', './assets/mainatlas.json');
        this.load.audio('a_test', './assets/audio/test.ogg');

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
        this.scene.start('level', new LevelDef('l1'));

        this.anims.create({ key: 'player_run', frameRate: 12, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_running_', end: 5}), repeat: -1 });
        this.anims.create({ key: 'player_stand', frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_stand_', end: 1}), repeat: 0 });
        this.anims.create({ key: 'player_die', frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_explode_', end: 58}), repeat: 0 });
        this.anims.create({ key: 'player_jumpup', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_jumpup_', start:1, end: 28}), repeat: 0 });
        this.anims.create({ key: 'player_jumpdown', frameRate: 16, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_jumpdown_', end: 3}), repeat: 0 });
        this.anims.create({ key: 'player_teleport', frameRate: 40, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_teleport_', end: 29}), repeat: 0 });
        this.anims.create({ key: 'player_appear', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'player_appear_', end: 28}), repeat: 0 });
        this.anims.create({ key: 'teleport', frameRate: 60, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'teleport_', end: 99}), repeat: -1 });
        this.anims.create({ key: 'blank', frameRate: 1, frames: this.anims.generateFrameNames('mainatlas', { prefix: 'blank_', end: 1}), repeat: 0 });
    }
}