import {GameObject} from "./gameObject.js";
import {canvasContext} from "../GameLayers/canvasLayer.js";

//This code is almost entirely kept from the 2D Browser Game Coding Class 
//the only exception is line 68 where we just determine if the currentsprite lies between the range of start and endsprite
//nothing has to be done. 
//this fixed a bug which would repeat the same start frame when holding down a key - 
//which leads to the keyinput being fired at a rapid rate- faster than the animationframes
class ImageObject extends GameObject {
    spriteWidth = 1;
    spriteHeight = 1;
    currentSourceXPosition = 192;
    currentSourceYPosition = 0;
    imageScaleFactor = 1;
    animDurationPerSprite = 1;
    currentDurationOfSprite = 0;
    spritesPerRow = 1;
    canvasTranslateBoundary = 0;
    currentAnimation = {
        "startSprite": 3,
        "endSprite": 3,
        "currentSprite": 3
    }
    imageReady = false;

    constructor(x, y, width, height, imagePath, animDurationPerSprite, imageScaleFactor) {
        super(x, y, width, height);
        this.imageObject = new Image();
        this.imageObject.addEventListener("load", this.onImageLoaded)
        this.imageObject.src = imagePath;
        this.spriteWidth = width;
        this.spriteHeight = height;
        this.animDurationPerSprite = animDurationPerSprite;
        this.imageScaleFactor = imageScaleFactor;
        this.calculateSpriteRowCount();
    }

    onImageLoaded = () => {
        this.imageReady = true;
        this.calculateSpriteRowCount();

    }
    calculateSpriteRowCount = () => {
        this.spritesPerRow = this.imageObject.naturalWidth / this.spriteWidth;

    }

    draw = () => {
        canvasContext.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        this.flipAnimSprite();
        
    }

    flipAnimSprite = () => {
        this.currentDurationOfSprite++;
        if (this.currentDurationOfSprite <= this.animDurationPerSprite) {
            return;
        }

        this.currentAnimation.currentSprite++;
        if (this.currentAnimation.currentSprite > this.currentAnimation.endSprite) {
            this.currentAnimation.currentSprite = this.currentAnimation.startSprite;
        }
        this.calculatePositionOfSprite(this.currentAnimation.currentSprite);
        this.currentDurationOfSprite = 0;
    }


    startAnimation = (startSprite, endSprite) => {
        if(this.currentAnimation.currentSprite > startSprite & this.currentAnimation.currentSprite < endSprite + 1) return        
        this.currentAnimation.startSprite = startSprite;
        this.currentAnimation.endSprite = endSprite;
        this.currentAnimation.currentSprite = startSprite;
        
    }

    calculatePositionOfSprite = (spriteIndex) => {
        let rowOfSprite = Math.floor(spriteIndex / this.spritesPerRow);
        this.currentSourceYPosition = rowOfSprite * this.spriteHeight;
        let columnSprite = spriteIndex % this.spritesPerRow;
        this.currentSourceXPosition = columnSprite * this.spriteWidth;
    }

}

export {ImageObject}