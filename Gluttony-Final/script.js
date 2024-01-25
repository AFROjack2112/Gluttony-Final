import { canvas } from "./GameLayers/canvasLayer.js";
import { gameLoop } from "./GameLayers/coreLayer.js";
import { PlayerFigure } from "./GameObjects/playerFigure.js";
import { HungerBar } from "./GameObjects/hungerBar.js";
import { Food } from "./GameObjects/food.js";
import { doubleJumpPickUp } from "./GameObjects/doubleJump.js";
import { Tile } from "./GameObjects/tile.js";
import { FlyingObstacle } from "./GameObjects/flyingObstacle.js";
import { Spike } from "./GameObjects/spike.js";
import { FinalCreamPuff } from "./GameObjects/finalCreamPuff.js";

//Initiate Camera Object to allow scrolling on the canvas for the view, and the background
let camera = {
	x: 0,
	y: 0,
	backgroundX: 0,
	backgroundY: 0,
};

//Request object to stop the gameloop via requestanimationframe onec stopRequest turns true
let myRequest = {
	stopRequest: false,
};

//Mousehelper to determine the position on canvas onclick - tool for easier levelbuilding

function getMousePos(evt) {
	let rect = canvas.getBoundingClientRect();
	let coordinates = {
		x:
			((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width +
			camera.x,
		y:
			((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height +
			camera.y,
	};

	console.log("coordinates X =        " + coordinates.x);
	console.log("coordinates Y =        " + coordinates.y);
}

window.addEventListener("click", getMousePos);

///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///
//set Game Objects

////Level 1 - Stone +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///

// stone floor long
new Tile(0, 460, 50, 60, 36, 0, "stone");
new Tile(3020, 460, 50, 60, 40, 0, "stone");

//Level 1 - Left levelBoundary
new Tile(0, -1900, 25, 30, 0, 80, "stone");

//Level 1 - Right levelBoundary
new Tile(4025, -1900, 25, 30, 0, 80, "stone");

//Level 1 - Right Level - shaft boundary
new Tile(3825, -1560, 25, 30, 0, 75, "stone");

//Stone PLatforms
new Tile(370, 350, 25, 30, 5, 0, "stone");
new Tile(660, 300, 50, 60, 6, 0, "stone");
new Tile(1200, 280, 25, 30, 2, 0, "stone");
new Tile(1450, 300, 25, 30, 2, 0, "stone");
new Tile(1670, 360, 25, 30, 5, 0, "stone");
new Tile(1870, 215, 25, 30, 4, 0, "stone");
new Tile(2070, 95, 25, 30, 3, 0, "stone");
new Tile(2070, 95, 25, 30, 3, 0, "stone");
new Tile(2600, 130, 25, 30, 5, 0, "stone");
new Tile(3440, 110, 25, 30, 2, 0, "stone");
new Tile(3440, -70, 25, 30, 2, 0, "stone");
new Tile(3700, -500, 25, 30, 2, 0, "stone");
new Tile(3000, -750, 50, 60, 17, 0, "stone");

//vertical stone Platforms
new Tile(3680, 50, 25, 30, 0, 6, "stone");
new Tile(3480, -550, 25, 30, 0, 6, "stone", true);

//doublejumps

new doubleJumpPickUp(2340, -10, 20, 20);
new doubleJumpPickUp(2950, 50, 20, 20);
new doubleJumpPickUp(3480, 262, 20, 20);
new doubleJumpPickUp(3650, -230, 20, 20);
new doubleJumpPickUp(3650, -320, 20, 20);

//Spikes
new Spike(950, 432, 25, 30, 34, 0, "spike");
new Spike(3020, 432, 25, 30, 9, 0, "spike");

//super deadly Fruit
new FlyingObstacle(0, -200, 400, 160, 0, 4400, 10, "carrot", true);

//Cream Puffs
new Food(315, 290, 20, 20);
new Food(725, 260, 20, 20);
new Food(800, 260, 20, 20);
new Food(880, 260, 20, 20);
new Food(1085, 140, 20, 20);
new Food(1460, 275, 20, 20);
new Food(1920, 185, 20, 20);
new Food(2100, 70, 20, 20);
new Food(3050, 240, 20, 20);
new Food(3585, 195, 20, 20);
new Food(3680, 5, 20, 20);
new Food(3610, -565, 20, 20);
new Food(3150, -345, 20, 20);
new Food(3000, -345, 20, 20);
new Food(2850, -345, 20, 20);
new Food(2700, -345, 20, 20);

new Food(2550, -345, 20, 20);

new Food(2400, -345, 20, 20);

new Food(2380, -345, 20, 20);

//upper floor over first 3 fruits
new Food(2900, -680, 20, 20);
new Food(2818, -1120, 20, 20);
new Food(2615, -1030, 20, 20);
new Food(2510, -1170, 20, 20);
new Food(2290, -1170, 20, 20);

//2nd level above ground high
new Food(1915, -390, 20, 20);
new Food(1750, -530, 20, 20);
new Food(1200, -800, 20, 20);
new Food(1270, -460, 20, 20);
new Food(1270, -370, 20, 20);
new Food(1270, -280, 20, 20);
new Food(1855, -720, 20, 20);
new Food(1080, -1035, 20, 20);
new Food(1400, -900, 20, 20);

new Food(650, -770, 20, 20);
new Food(300, -430, 20, 20);

new Food(165, -325, 20, 20);
new Food(80, -325, 20, 20);

//food for all 3 levels +++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//after 10 doublejumps up to clouds

new Food(240, -1260, 20, 20);
new Food(395, -1385, 20, 20);

//hop over fruits
new Food(745, -1625, 20, 20);
new Food(985, -1625, 20, 20);

new Food(2120, -1740, 20, 20);
new Food(2325, -1740, 20, 20);

//further
new Food(3120, -1380, 20, 20);
new Food(3200, -1160, 20, 20);

//long fall down
new Food(3930, -1500, 20, 20);
new Food(3930, -1350, 20, 20);
new Food(3930, -1200, 20, 20);
new Food(3930, -1050, 20, 20);
new Food(3930, -900, 20, 20);
new Food(3930, -750, 20, 20);
new Food(3930, -600, 20, 20);
new Food(3930, -450, 20, 20);
new Food(3930, -300, 20, 20);
new Food(3930, -150, 20, 20);
new Food(3930, 0, 20, 20);
new Food(3930, 150, 20, 20);
// new Food(3930, 1500,20, 20, )
// new Food(3930, 1500,20, 20, )
// new Food(3930, -1500,20, 20, )

//Final
new FinalCreamPuff(3890, 350, 100, 100);

//Level 2 +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// Level 2 - Grass Floor
new Tile(0, -300, 50, 60, 4, 0, "grass");
new Tile(2080, -300, 50, 60, 24, 0, "grass");

//Grass PLatforms
new Tile(2880, -650, 25, 30, 2, 0, "grass");

new Tile(2300, -850, 50, 60, 6, 0, "grass");
new Tile(550, -1320, 50, 60, 49, 0, "grass");
new Tile(1860, -360, 25, 30, 5, 0, "grass");
new Tile(1390, -880, 25, 30, 2, 0, "grass");
new Tile(740, -830, 25, 30, 2, 0, "grass");
new Tile(560, -450, 25, 30, 5, 0, "grass");

//Stone Platforms
new Tile(2710, -430, 25, 30, 2, 0, "stone");
new Tile(2360, -990, 25, 30, 2, 0, "stone");
new Tile(2170, -990, 25, 30, 2, 0, "stone");
new Tile(1550, -420, 50, 60, 2, 0, "stone");
new Tile(252, -410, 25, 30, 4, 0, "stone");
new Tile(25, -1400, 25, 30, 5, 0, "stone");

//vertical stone
new Tile(2040, -1270, 25, 30, 0, 23, "stone", true);
new Tile(1886, -770, 25, 30, 0, 3, "stone", false);
new Tile(1150, -840, 25, 30, 0, 3, "stone", true);
new Tile(990, -950, 25, 30, 0, 2, "stone", true);
new Tile(530, -1060, 25, 30, 0, 12, "stone", true);

// Vertical Grass PLatforms
new Tile(2300, -800, 50, 60, 0, 9, "grass");

new Tile(3000, -1500, 50, 60, 0, 13, "grass");
new Tile(2600, -1000, 25, 30, 0, 5, "grass");
new Tile(2800, -1100, 25, 30, 0, 3, "grass");
new Tile(1380, -500, 25, 30, 0, 4, "grass", true);
new Tile(320, -1220, 25, 30, 0, 2, "grass");

//doublejumps

new doubleJumpPickUp(2720, -615, 20, 20);
new doubleJumpPickUp(2720, -730, 20, 20);
new doubleJumpPickUp(2922, -950, 20, 20);
new doubleJumpPickUp(2922, -1100, 20, 20);
new doubleJumpPickUp(2180, -840, 20, 20);
new doubleJumpPickUp(2180, -710, 20, 20);
new doubleJumpPickUp(2180, -580, 20, 20);
new doubleJumpPickUp(2180, -420, 20, 20);

//high doublejumps
new doubleJumpPickUp(1730, -825, 20, 20);
new doubleJumpPickUp(1580, -880, 20, 20);

new doubleJumpPickUp(1290, -680, 20, 20);
new doubleJumpPickUp(1750, -600, 20, 20);
new doubleJumpPickUp(650, -660, 20, 20);
new doubleJumpPickUp(650, -550, 20, 20);

//left doublejumps

new doubleJumpPickUp(110, -480, 20, 20);
new doubleJumpPickUp(110, -580, 20, 20);
new doubleJumpPickUp(110, -680, 20, 20);
new doubleJumpPickUp(110, -780, 20, 20);
new doubleJumpPickUp(110, -880, 20, 20);
new doubleJumpPickUp(110, -980, 20, 20);
new doubleJumpPickUp(110, -1080, 20, 20);
new doubleJumpPickUp(110, -1180, 20, 20);
new doubleJumpPickUp(110, -1280, 20, 20);

//spikes
new Spike(2080, -330, 25, 30, 9, 0, "spike");
new Spike(2300, -880, 25, 30, 12, 0, "spike");
new Spike(2015, -1270, 25, 30, 0, 22, "spike");
new Spike(1400, -470, 25, 30, 0, 3, "spike", true);
new Spike(1360, -470, 25, 30, 0, 3, "spike", false);
new Spike(550, -1260, 50, 60, 29, 0, "spike", true);
new Spike(550, -1060, 25, 30, 0, 12, "spike", true);
new Spike(510, -1060, 25, 30, 0, 12, "spike", false);
new Spike(25, -1390, 25, 30, 5, 0, "spike", true);

//Deadly Fruits 1
new FlyingObstacle(2340, -480, 50, 20, 2340, 3480, 5, "carrot", true);
new FlyingObstacle(2040, -480, 50, 20, 2340, 3480, 5, "banana", true);
new FlyingObstacle(1740, -480, 50, 20, 2340, 3480, 5, "salad", true);

//deadly greens 2
new FlyingObstacle(2065, -1090, 100, 40, 2065, 2805, 3, "watermelon", true);

//deadly greens 3
new FlyingObstacle(550, -960, 50, 20, 550, 2030, 5, "banana", true);
new FlyingObstacle(100, -960, 50, 20, 550, 2030, 5, "salad", true);
new FlyingObstacle(-350, -960, 50, 20, 550, 2030, 5, "watermelon", true);
new FlyingObstacle(1015, -760, 150, 60, -150, 2030, 7, "banana", true);
new FlyingObstacle(0, -760, 150, 60, -150, 2030, 7, "carrot", true);

//Level 3 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//top boundary
new Tile(0, -1900, 25, 30, 162, 0, "stone");

//clouds
new Tile(430, -1355, 25, 30, 3, 0, "cloud");
new Tile(600, -1460, 25, 30, 3, 0, "cloud");
new Tile(830, -1460, 25, 30, 3, 0, "cloud");
new Tile(1060, -1460, 25, 30, 3, 0, "cloud");
new Tile(1800, -1460, 25, 30, 2, 0, "cloud");
new Tile(2440, -1565, 50, 60, 13, 0, "cloud");
new Tile(3210, -1420, 25, 30, 4, 0, "cloud");
new Tile(3210, -1050, 25, 30, 4, 0, "cloud");
new Tile(3450, -960, 25, 30, 2, 0, "cloud");
new Tile(3650, -860, 25, 30, 2, 0, "cloud");

//clouds vertical
new Tile(1980, -1565, 25, 30, 0, 2, "cloud", true);
new Tile(2210, -1565, 25, 30, 0, 2, "cloud", true);

//doublejumps 1
new doubleJumpPickUp(1280, -1530, 20, 20);
new doubleJumpPickUp(1480, -1530, 20, 20);
new doubleJumpPickUp(1680, -1530, 20, 20);
new doubleJumpPickUp(3690, -1020, 20, 20);
new doubleJumpPickUp(3690, -1170, 20, 20);
new doubleJumpPickUp(3690, -1320, 20, 20);

new doubleJumpPickUp(3690, -1470, 20, 20);

new doubleJumpPickUp(3690, -1620, 20, 20);

new doubleJumpPickUp(3690, -1770, 20, 20);

//spikes
new Spike(550, -1340, 25, 30, 98, 0, "spike", false);
new Spike(3050, -780, 25, 30, 31, 0, "spike", false);

//deadly green 1
new FlyingObstacle(3000, -1500, 50, 20, 3000, -50, 7, "carrot", false);
new FlyingObstacle(3500, -1500, 50, 20, 3000, -50, 7, "watermelon", false);
new FlyingObstacle(4000, -1500, 50, 20, 3000, -50, 7, "salad", false);
new FlyingObstacle(4500, -1500, 50, 20, 3000, -50, 7, "banana", false);
new FlyingObstacle(5000, -1500, 50, 20, 3000, -50, 7, "carrot", false);
new FlyingObstacle(5500, -1500, 50, 20, 3000, -50, 7, "banana", false);

//Initiate the PLayerfigure and Hungerbar

let playerFigureObject = new PlayerFigure(
	50,
	350,
	64,
	64,
	"./images/BODY_Charlie_test2.png",
	4,
	1
);

playerFigureObject.setBoundaryOffsets(5, 20, 2, 20);

let hungerBar = new HungerBar(
	20,
	10,
	40,
	100,
	"./images/hungerbar.png",
	"./images/hungerbarframe.png"
);

//End of Object Creation
///++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++///

//Keyeventfuntions that control only the players horizontal movement
//on keyeventup moveby is rather added and substracted than set to 0 to prevent stopping mid air and more fluent controls

function keyEventDown(eventInformation) {
	switch (eventInformation.key) {
		case "a":
			playerFigureObject.moveBy.left = -5;
			break;
		case "d":
			playerFigureObject.moveBy.left = 5;
			break;
		case " ":
			playerFigureObject.jump();
			break;
	}
}

function keyEventUp(eventInformation) {
	switch (eventInformation.key) {
		case "a":
			playerFigureObject.moveBy.left += 5;
			break;
		case "d":
			playerFigureObject.moveBy.left += -5;
			break;
	}
}

//declare Interval variable which will handle the Interval of a the decreasing hungerbar
let hungryInterval;

//store all necessary html references
let startScreen = document.getElementById("startScreen");
let canvasScreen = document.querySelector("canvas");
let gameOverScreen = document.getElementById("gameOver");

let startButton = document.getElementById("startButton");
let aboutButton = document.getElementById("aboutButton");
let restartButton = document.getElementById("restartButton");
let returnButton = document.getElementById("returnButton");

//initiate hungryInterval, disable display of startScreen and enable the Canvas, start the Game Audio and initiate the gameloop
function startGame() {
	hungryInterval = setInterval(function () {
		hungerBar.getHungrier(0);
	}, 50);
	startScreen.style.display = "none";
	canvasScreen.style.display = "block";
	changeSound("gameMusic");
	window.requestAnimationFrame(gameLoop);
}

//takes 2 parameters, if the player starves the gameoverscreen will be different than dying to a collision
//if he reaches the final heavenly delight the victory screen is inserted instead
//otherwise let the screen come in with a short delay, clear the hungerbarinterval and stop the gameloop from running by setting stopRequest true

function gameOver(starve, victory) {
	if (victory) {
		gameMusic.pause()
		gameOverScreen.style.backgroundImage = "url('./images/victory.png')";
		restartButton.style.display = "none";
	} else if (starve) {
		gameOverScreen.style.backgroundImage =
			"url('./images/gameOverScreenStarve.png')";
	}
	setTimeout(function () {
		gameOverScreen.style.display = "flex";
	}, 500);
	clearInterval(hungryInterval);
	myRequest.stopRequest = true;
}

//Audio function+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Preload audio files

let jumpSound = new Audio();
jumpSound.src = './Audio/jump.mp3';

let gameMusic = new Audio()
gameMusic.src = './Audio/jazzmusic.mp3'

let starveSound = new Audio()
starveSound.src = './Audio/starve.mp3'

let obstacleHit = new Audio()
obstacleHit.src = './Audio/spike.mp3'

let victory = new Audio()
victory.src = './Audio/victory.mp3'




//change the sound and play it depending on input
//since for collecting food and doublejumppickups the sounds shoudl overlap
//a new audio has to be created for every instance
//other audios are preloaded and called via eval(soundSrc)

function changeSound(soundSrc) {
		
	if(soundSrc === 'nom'){
		let nomSound = new Audio()
		nomSound.src = './Audio/carrotnom.mp3'
		nomSound.volume = 0.5
		nomSound.play()
		
	}
	else if(soundSrc === 'doubleJump'){
		let doubleJump = new Audio()
		doubleJump.src = './Audio/doubleJump.mp3'
		doubleJump.volume = 0.5
		doubleJump.play()
	}
	else{
		eval(soundSrc).play();
		if(soundSrc === 'gameMusic') eval(soundSrc).loop = true	
	}
		
}

//Eventlistener for keyboardinputs and button presses in the menu
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", function (e) {
	location.reload();
});
aboutButton.addEventListener("click", function (e) {
	document.querySelector("#startScreen").style.backgroundImage =
		"url('./images/aboutScreen.png')";
	returnButton.style.display = "flex";
	startButton.style.display = "none";
	aboutButton.style.display = "none";
});
returnButton.addEventListener("click", function (e) {
	location.reload();
});
window.addEventListener("keypress", keyEventDown);
window.addEventListener("keyup", keyEventUp);

export { keyEventDown, hungerBar, camera, gameOver, myRequest, changeSound, };
