import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
import { LevelState } from "./scenes/LevelState";
// import { Preload } from "./scenes/preload";
// import { Boot } from "./scenes/boot";
// import { Game } from "./scenes/game";


class Main extends Phaser.Game {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      width: 400,
      height: 400,
      zoom:2,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
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
    this.scene.start("preload");
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};