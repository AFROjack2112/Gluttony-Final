import { GameObject } from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";
import { PlayerFigure } from "./playerFigure.js";


//Add onCollision with PlayerFigure as extension to GameObject class

class Obstacle extends GameObject {

    draw = () => {

        canvasContext.fillStyle = "#660000";
        canvasContext.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    onCollision = (otherObject) => {

        if (otherObject instanceof PlayerFigure)
            otherObject.restorePreviousPosition(this);

    }

}

export { Obstacle }



