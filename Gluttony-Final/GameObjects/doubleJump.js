import { GameObject } from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";
import { PlayerFigure } from "./playerFigure.js";
import { changeSound } from "../script.js";
class doubleJumpPickUp extends GameObject {

    //On Collision sets the players jumping property to false, which alows a 2. jump regardless of collisions
    //Set active to false to remove it from the gameloop

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.imageObject = new Image();
        this.imageObject.src = "./images/doublejump.png";
    }



    draw = () => {
        canvasContext.drawImage(this.imageObject, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    onCollision = (otherObject) => {
        if (otherObject instanceof PlayerFigure) {
            changeSound('doubleJump')
            this.active = false
            otherObject.jumping = false
        }

    }

}

export { doubleJumpPickUp }