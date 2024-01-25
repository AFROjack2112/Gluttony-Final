import { canvasContext } from "../GameLayers/canvasLayer.js";
import { gameObjects } from "../GameLayers/coreLayer.js";
import { PlayerFigure } from "./playerFigure.js";

class GameObject {

    //define basic properties of every gameobject
    active = true;

    position = {
        x: 0,
        y: 0,
    }

    previousPosition = {
        x: 0,
        y: 0
    }


    dimensions = {
        width: 0,
        height: 0
    }

    boundaries = {
        getTopBoundary: () => {
            return this.position.y + this.boundaryOffsets.top;
        },
        getLeftBoundary: () => {
            return this.position.x + this.boundaryOffsets.left;
        },
        getBottomBoundary: () => {
            return this.position.y + this.dimensions.height - this.boundaryOffsets.bottom;
        },
        getRightBoundary: () => {
            return this.position.x + this.dimensions.width - this.boundaryOffsets.right;
        }
    }

    boundaryOffsets = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }


    //set basic properties via parameters and push every object into the gameObjectsarray used for the gameloop
    constructor(x, y, width, height) {
        this.position.x = x;
        this.position.y = y;
        this.previousPosition.x = x;
        this.previousPosition.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.gameObjectIndex = gameObjects.length;
        gameObjects.push(this);

    }

    //backup most recent position
    storeCurrentPosition = () => {
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;

    }

    //Restore previous position of playerfiugre when colliding with an obstacle
    restorePreviousPosition = (otherObject) => {

        //this just checks if player is colliding with a floor under him - a problem was determening if he is colliding with a side or with the floor
        //also due to different velocitys the standard restoreprevious position fails a lot
        //so here it puts the player directly on top of the collision object
        if (this.boundaries.getBottomBoundary() >= otherObject.boundaries.getTopBoundary() && this.boundaries.getTopBoundary() < otherObject.boundaries.getTopBoundary() && (otherObject.boundaries.getTopBoundary() - this.boundaries.getTopBoundary()) > 40) {
            this.position.y = otherObject.position.y - this.dimensions.height + 1.9;
            this.velocityY = 0
        }

        else {
            this.position.y = this.previousPosition.y;
        }

        this.position.x = this.previousPosition.x;

    }


    update = () => {


    }

    draw = () => {
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    //only used to better controll the boundaries of the playerfigure
    setBoundaryOffsets(top, left, bottom, right) {
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.bottom = bottom;
        this.boundaryOffsets.right = right;
    }

    onCollision = () => {

    }


    //Collisiondetection which is checked every frame for every gameobject
    checkForCollision = () => {
        for (let i = this.gameObjectIndex + 1; i < gameObjects.length; i++) {
            let checkObject = gameObjects[i];
            if (checkObject.active === false)
                continue;
            if (this.boundaries.getLeftBoundary() <= checkObject.boundaries.getRightBoundary() &&
                this.boundaries.getRightBoundary() >= checkObject.boundaries.getLeftBoundary()) {
                if (this.boundaries.getTopBoundary() <= checkObject.boundaries.getBottomBoundary() &&
                    this.boundaries.getBottomBoundary() >= checkObject.boundaries.getTopBoundary()) {
                    this.onCollision(checkObject);
                    checkObject.onCollision(this);
                }
            }
        }
    }
}

export { GameObject }