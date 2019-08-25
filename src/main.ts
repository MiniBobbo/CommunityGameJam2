import * as Phaser from "phaser";
import { Preload } from "./scenes/Preload";
// import { Preload } from "./scenes/preload";
// import { Boot } from "./scenes/boot";
// import { Game } from "./scenes/game";


class Main extends Phaser.Game {
  constructor() {
    const config: GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 800,
      zoom:1,
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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
    // this.scene.add("game", Game, false);
    this.scene.start("preload");
    }

}

window.onload = () => {
  const GameApp: Phaser.Game = new Main();
};