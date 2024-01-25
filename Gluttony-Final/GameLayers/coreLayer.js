import { canvas, canvasContext } from "./canvasLayer.js";
import { PlayerFigure } from "../GameObjects/playerFigure.js";
import { camera } from "../script.js";
import { myRequest } from "../script.js";
import { hungerBar } from "../script.js";


//create variables used for the framerateControll
let FPS = 60;
let timeStep = 1000 / FPS; // in milliseconds
let lastTimestamp = 0;
let accumulatedTime = 0;

//Array that contains every gameobjects in the game
let gameObjects = [];

//set backgroundimage that will be scrolled according to the players movement
let backgroundImage = new Image();
backgroundImage.src = './images/backgroundnewred.png';


//Here the Game gets updated on fixed intervals
//Using solely requestanimationframe will result in different gamespeeds on different monitors
//by using this we make sure that the game is only updated when the time between the last frame
// and the current frame is greater than the fixed interval - only then the game gets updated

function gameLoop(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    accumulatedTime += deltaTime;

    // Update the game at fixed intervals
    while (accumulatedTime >= timeStep) {
        updateGameLoop();
        accumulatedTime -= timeStep;
    }


    if (myRequest.stopRequest === false) {
       requestAnimationFrame(gameLoop);
    }
}


//Clears the canvas in the currently viewed area and draws the background according to background positions
//decrease Hungerbar every frame
//After that we iterate through every gameObject first storing positions and updating them
//then checking forcollisions and changing positions accordingly
//finally right before drawing we are determining the current animation for the playerfigure
function updateGameLoop() {

    canvasContext.clearRect(camera.x, camera.y, canvas.width, canvas.height);
    canvasContext.drawImage(backgroundImage, camera.backgroundX, camera.backgroundY - backgroundImage.height + canvas.height, backgroundImage.width, backgroundImage.height);
    hungerBar.getHungrier(0)
    for (let gameLoopState = 0; gameLoopState < 3; gameLoopState++) {
        for (let singleGameObject of gameObjects) {
            if (singleGameObject.active === true) {
                if (gameLoopState === 0) {
                    singleGameObject.storeCurrentPosition();
                    singleGameObject.update();
                } else if (gameLoopState === 1) {
                    singleGameObject.checkForCollision();
                } else if (gameLoopState === 2) {
                    if (singleGameObject instanceof PlayerFigure) {
                        singleGameObject.setAnimation();
                    }

                    singleGameObject.draw();
                }
            }
        }
    }
}



export { gameObjects, gameLoop };
