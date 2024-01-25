import { GameObject } from "./gameObject.js";
import { canvasContext } from "../GameLayers/canvasLayer.js";
import { Obstacle } from "./obstacle.js";
import { changeSound, gameOver } from "../script.js";
import { PlayerFigure } from "./playerFigure.js";


class FlyingObstacle extends GameObject {



    fruitImage = new Image();
    ffruitImage = new Image();

    //Via the Constructor this function is called and depending on the given fruit as parameter different images are set
    //ffruit means simply accesing the flipped version of the sprite

    setTileImage = (fruit) => {
        if (fruit === 'carrot') {
            this.fruitImage.src = './images/flyingObstacles/carrot.png';
            this.ffruitImage.src = './images/flyingObstacles/fcarrot.png';
        }
        else if (fruit === 'banana') {
            this.fruitImage.src = './images/flyingObstacles/banana.png';
            this.ffruitImage.src = './images/flyingObstacles/fbanana.png';
        }
        else if (fruit === 'salad') {
            this.fruitImage.src = './images/flyingObstacles/salad.png';
            this.ffruitImage.src = './images/flyingObstacles/fsalad.png';
        }
        else if (fruit === 'watermelon') {
            this.fruitImage.src = './images/flyingObstacles/watermelon.png';
            this.ffruitImage.src = './images/flyingObstacles/fwatermelon.png';
        }
    }



    //Via creating an Object and setting correct parameters the kind of fruit, movement speed, respawn and despawnposition ... can be influenced
    constructor(x, y, width, height, restoreposition, endposition, movementspeed, fruit, flipped) {
        super(x, y, width, height);
        this.restoreposition = restoreposition
        this.endposition = endposition
        this.movementspeed = movementspeed
        this.flipped = flipped
        this.setTileImage(fruit)
        if (flipped) this.fruitImage = this.ffruitImage

    }

    //Note: here x restoreposition differs from x startposition, so we can controll the intervals between the objects
    // if we want to make a line of flying objects we simply have to spawn them in intervals of x position and set same startposition
    update = () => {
        if (!this.flipped) {
            this.position.x -= this.movementspeed;
            if (this.position.x + this.dimensions.width < this.endposition) {
                this.position.x = this.restoreposition
            }
        }

        else {
            this.position.x += this.movementspeed
            if (this.position.x + this.dimensions.width > this.endposition) {
                this.position.x = this.restoreposition
            }
        }


    }

    //Oncollision end the game and play audio bit

    onCollision = (otherObject) => {

        if (otherObject instanceof PlayerFigure) {
            changeSound('obstacleHit')
            gameOver()

        }


    }

    draw = () => {
        canvasContext.drawImage(this.fruitImage, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);

    }
}


export { FlyingObstacle }