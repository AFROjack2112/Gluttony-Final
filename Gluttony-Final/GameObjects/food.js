import { GameObject } from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";
import { hungerBar, changeSound } from "../script.js";
import { PlayerFigure } from "./playerFigure.js";
class Food extends GameObject {

    //create delicious creampuffs to avoid starvation and vegetables
    //oncollision increase hungerbar and hungertick to live longer

    constructor(x, y, width, height,) {
        super(x, y, width, height);
        this.imageObject = new Image();
        this.imageObject.src = './images/creampuff.png';
    }


    draw = () => {
        canvasContext.drawImage(this.imageObject, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    onCollision = (otherObject) => {
        if (otherObject instanceof PlayerFigure) {
            this.active = false
            hungerBar.getHungrier(15)
            changeSound('nom')
        }

    }

}

export { Food }