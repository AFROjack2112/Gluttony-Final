import { GameObject } from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";
import { PlayerFigure } from "./playerFigure.js";
import { gameOver, changeSound } from "../script.js";

class FinalCreamPuff extends GameObject {

    //create the final heavenly delight
    //On collision set the 2. gameover parameter to true to claim victory and be presented with the victory screen

    constructor(x, y, width, height,) {
        super(x, y, width, height);
        this.imageObject = new Image();
        this.imageObject.src = './images/finalcreampuff.png';
    }



    draw = () => {
        canvasContext.drawImage(this.imageObject, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }


    onCollision = (otherObject) => {
        if (otherObject instanceof PlayerFigure) {
            changeSound('victory')
            gameOver(false, true)
        }

    }

}

export { FinalCreamPuff }