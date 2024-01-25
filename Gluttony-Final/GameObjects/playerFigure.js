import { canvasContext } from "../GameLayers/canvasLayer.js";
import { ImageObject } from "./imageObject.js";
import { changeSound } from "../script.js";
import { camera } from "../script.js";
import { gameOver } from "../script.js";
import { Obstacle } from "./obstacle.js";

class PlayerFigure extends ImageObject {
    //Declare variables and objects needed for movement and collisions of the playerfigure
    facingDirection = "right";
    wallCollisionState = false;
    jumping = false;
    velocityY = 0;
    lastCollisionObstacle = [];
    moveBy = {
        left: 0,
        top: 0,
    };

    //This is called in the update function and makes sure the horizontal movement cant be exceeded and go over 5 in eacch frame
    AdjustMoveBy = () => {
        if (this.moveBy.left > 5) {
            this.moveBy.left = 5;
        } else if (this.moveBy.left < -5) {
            this.moveBy.left = -5;
        }
    };



    update = () => {
        this.AdjustMoveBy();

        //always set to false first to ensure sliding animation changes to fall when not colliding with an Object anymore
        this.wallCollisionState = false;

        //Translate the camera with the camera Object vertically and horizontally
        // if the playerposition will be over a specific bound of the screen the camera will pan with him in the same velocity
        //the game background positions will be affected here too - move it 3 times slower - drawn in Corelayer

        if (
            this.position.x > camera.x + 450 &&
            this.moveBy.left > 0 &&
            camera.x <= 3150
        ) {
            canvasContext.translate(-this.moveBy.left, 0);
            camera.x += this.moveBy.left;
            camera.backgroundX += this.moveBy.left / 3;
        } else if (
            this.position.x < camera.x + 300 &&
            this.moveBy.left < 0 &&
            this.position.x > 300
        ) {
            canvasContext.translate(-this.moveBy.left, 0);
            camera.x += this.moveBy.left;
            camera.backgroundX += this.moveBy.left / 3;
        }

        if (this.position.y < camera.y + 100 && this.velocityY < 0) {
            canvasContext.translate(0, -this.velocityY);
            camera.y += this.velocityY;
            camera.backgroundY += this.velocityY / 1.5;
        } else if (
            this.position.y > camera.y + 300 &&
            this.velocityY > 0 &&
            camera.y < 0
        ) {
            canvasContext.translate(0, -this.velocityY);
            camera.y += this.velocityY;
            camera.backgroundY += this.velocityY / 1.5;

            if (camera.y > 0) {
                canvasContext.translate(0, camera.y);
                camera.y = 0;
            }
        }


        //actually move the player

        this.position.x += this.moveBy.left;

        this.position.y += this.velocityY;



        //checks if the player is jumping - if true add 0.5 everý frame start velocity when jumping is -12
        //this simple operation will mimic gravity by letting the player rise or fall with always changing velocity

        if (this.jumping) {
            this.velocityY += 0.5;
        }
        //check if player has collided with something and is therefore !jumping and if he is still colliding with the same obstacle as the previous frame
        // This ensures the player will only not fall as long as he is still colliding with the same floor as before
        else if (
            this.stillColliding(this.lastCollisionObstacle[0]) &&
            !this.jumping
        ) {
            this.velocityY = 0;
        }
        //if he has on the other hand not colliding with the previous object and jumping is false he will fall.
        else {
            this.velocityY += 0.5;
            this.lastCollisionObstacle = [];
        }



        //setting facingDirection - which is need for setting player animations
        if (this.moveBy.left > 0) this.facingDirection = "right";
        else if (this.moveBy.left < 0) this.facingDirection = "left";



        //Ends the game if player falls into a gap

        if (this.position.y > 500) {
            gameOver();
        }
    };





    //check first if the other Object is beneath him == floor - if yes set jumping false
    //and move it at the front of the lastCollision Array to later check for stillcolliding
    onCollision = (otherObject) => {
        if (otherObject instanceof Obstacle) {
            if (otherObject.position.y - 5 > this.position.y) {
                this.jumping = false;
                this.lastCollisionObstacle.unshift(otherObject);
            }

            this.velocityY = 0;

            //always check if we are collding with a vertical side of the wall id yes we have to enable sliding down
            this.wallCollisionCheck(otherObject);
        }
    };






    //check if we are still colliding with the same obstacle as last frame
    //if true velocity stays 0 and we wont fall
    stillColliding = (otherObject) => {
        if (otherObject === undefined) {
            return false;
        } else if (
            this.boundaries.getRightBoundary() >=
            otherObject.boundaries.getLeftBoundary() &&
            this.boundaries.getLeftBoundary() <=
            otherObject.boundaries.getRightBoundary()
        ) {
            return true;
        }
    };




    //triggered by keyevent- checks if we arent allready jumping , sets velocity, changes sound....
    jump = () => {
        if (!this.jumping) {
            changeSound("jumpSound");
            this.lastCollisionObstacle = [];
            this.jumping = true;
            this.velocityY = -12; // Adjust this value as needed
        }
    };





    // check if we are collding with a vertical side of the wall id yes increase yposition by 1 every frame
    //this mimics sliding down the wall slowly
    wallCollisionCheck = (otherObject) => {
        if (
            this.boundaries.getLeftBoundary() >=
            otherObject.boundaries.getRightBoundary() ||
            this.boundaries.getRightBoundary() <=
            otherObject.boundaries.getLeftBoundary()
        ) {
            this.position.y += 1;
            this.jumping = false;
            this.lastCollisionObstacle = [];
            this.wallCollisionState = true;
        } else {
            this.wallCollisionState = false;
        }
    };





    //set all the playerfigures animations by determining if were falling, jumping, sliding, walking and in which direction were facing
    setAnimation = () => {
        if (this.wallCollisionState) {
            if (this.facingDirection === "right") {
                this.startAnimation(4, 4);
            } else {
                this.startAnimation(22, 22);
            }
            console.log("wallcollision");
        } else if (this.velocityY === 0 && this.moveBy.left !== 0) {
            if (this.facingDirection === "right") {
                this.startAnimation(28, 35);
            } else {
                this.startAnimation(9, 17);
            }
        } else if (this.velocityY === 0 && this.moveBy.left === 0) {
            if (this.facingDirection === "right") {
                this.startAnimation(27, 27);
            } else {
                this.startAnimation(9, 9);
            }
        } else if (this.velocityY > 0) {
            if (this.facingDirection === "right") {
                this.startAnimation(3, 3);
            } else {
                this.startAnimation(21, 21);
            }
        } else if (this.velocityY < 0) {
            if (this.facingDirection === "right") {
                this.startAnimation(0, 0);
            } else {
                this.startAnimation(18, 18);
            }
        }
    };
}

export { PlayerFigure };
