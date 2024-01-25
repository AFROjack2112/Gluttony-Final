import { Tile } from "./tile.js";
import { PlayerFigure } from "./playerFigure.js";
import { gameOver, changeSound } from "../script.js";

//Extend Tile Class - just overwrite the onCollision to end the game and play an audio clip

class Spike extends Tile {
  onCollision = (otherObject) => {
    if (otherObject instanceof PlayerFigure) {
      changeSound("obstacleHit");

      gameOver();
    }
  };
}

export { Spike };
