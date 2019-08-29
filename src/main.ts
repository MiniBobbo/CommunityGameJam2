import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { LevelState } from "./scenes/LevelState";
import { GoToLevelState } from "./scenes/GotoLevelState";
// import { Preload } from "./scenes/preload";
// import { Boot } from "./scenes/boot";
// import { Game } from "./scenes/game";


class Main extends Phaser.Game {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      width: 480,
      height: 270,
      zoom:2,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: true
        }
      },
      scene:{
        // preload:preload,
        // game:Game
      },
      render: {
        pixelArt:true,
      }
    };
    super(config);

    // this.scene.add("boot", Boot, false);
    this.scene.add("preload", Preload, false);
    this.scene.add("level", LevelState, false);
    this.scene.add("gotolevel", GoToLevelState, false);
    this.scene.start("preload");
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};