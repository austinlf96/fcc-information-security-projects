import Player from './Player.mjs';
import Collectible from './Collectible.mjs';
import Obstacle from './Obstacle.mjs';
import Projectile from './Projectile.mjs';
import * as boundaries from './boundaries.mjs';
//const socket = io();
//Start listener that runs spawnPlayer() when a user connects

//Basic game layout, the canvas will be filled with elements by the newGame() function
let canvas = document.getElementById('game-window');
let bounds = boundaries.boundaries;

newGame(canvas);
// obstacle boundaries - for viewing reference only context.fillRect(100, 100 , 1200, 650);

function newGame(canvas){
	let jugornah = new Player({x: 670, y:  395, id: 'Jugornah', color: 'black', size: 30, health: 500});
	let numObstacles = Math.floor(Math.random() * 25 + 10);
	let context = canvas.getContext('2d');
	bounds.players.jugornah = jugornah;

	context.clearRect(0, 0, 1400, 850);
	context.fillStyle = 'black';
	context.fillRect(50, 50, 1300, 750);
	context.clearRect(60, 60, 1280, 730);
	context.clearRect(50, 375, 10, 75);
	context.clearRect(1340, 375, 10, 75)
	context.clearRect(650, 50, 75, 10);
	context.clearRect(650, 790, 75, 10);
	context.fillStyle = 'black';
	context.fillRect(jugornah.x1, jugornah.y1, jugornah.width, jugornah.height);
	spawnObstacles(numObstacles, context);
	spawnPlayer(context);
	setTimeout(() => {
		let i = 0;
		setInterval(() => {
			if(i > 4) i = 0;
			spawnCollectible('collectible' + i, context);
			i++;
		}, 10000);
	}, 5000);
	
}

function spawnObstacles(numObstacles, context){ 
	for( let i=0; i <= numObstacles; i++){
		let x = Math.floor(Math.random() * 1100 + 100);
		let y = Math.floor(Math.random() * 550 + 100);
		let height = Math.floor(Math.random() * 75 + 25);
		let width = Math.floor(Math.random() * 150 + 40);
		let obstacleName = 'obstacle' + i;
		let obstacle = new Obstacle({x: x, y: y, width: width, height: height, type: 'obstacle', id: obstacleName});

		if(boundaries.checkBounds(obstacle)){
			context.strokeStyle = 'red';
			context.strokeRect(obstacle.x1, obstacle.y1, obstacle.width, obstacle.height);
			bounds.obstacles[obstacleName] = obstacle;
		} 
	}
}

function spawnCollectible(id, context){
		let x = Math.floor(Math.random() * 1100 + 100);
		let y = Math.floor(Math.random() * 550 + 100);
		let collectible = new Collectible({x: x, y: y, size: 12, value: 2, id: id, icon: 'nah'});
		if(boundaries.checkBounds(collectible)){
			if(bounds.collectibles[id]) context.clearRect(bounds.collectibles[id].x1-1, bounds.collectibles[id].y1-1, bounds.collectibles[id].size+2, bounds.collectibles[id].size+2);
			context.strokeStyle = 'blue';
			context.strokeRect(collectible.x1, collectible.y1, collectible.size, collectible.size);
			collectible.status = 'active';
			bounds.collectibles[id] = collectible;
		}
}
function startMoving(context, player){
	context.clearRect(me.x1, me.y1, me.size, me.size);
	me.movePlayer(e.key, me.speed);
	context.fillStyle = 'green';
	context.fillRect(me.x1, me.y1, me.size, me.size);
}
function spawnPlayer(context){
	let x = Math.floor(Math.random() * 1365) + 5;
	let y = Math.floor(Math.random() * 815) + 5;
	let safeSpawn = false;
	let keyHeld = false;
	let i = 0;
	let movement;
	//let id = player.id;
	//let color = player.color;
	//let avatar = player.avatar;
	let id = 'Me';
	let color = 'green';
	let me = new Player({x: x, y: y, id: id, color: color, size: 15});
	document.addEventListener('keydown', (e) => {
		console.log('direction: ' + e.key);
		//Figure out how to stop from infinite 'keydown' effect. removeEventListener() maybe??? 
		movement = setInterval(startMoving, 50, context, me);
	});
	document.addEventListener('keyup', (e1) => {
		clearInterval(movement);
		console.log('I should have stopped...');
	});

	while(safeSpawn == false){
		if(me.x1 >= 35 && me.x1 <= 1365){
			if(me.y1 <=35 || me.y1 >= 815) safeSpawn = true;
			else {
				me.setCoordinates(Math.floor(Math.random() * 1365) + 5, me.y1);
			}
		} else if(me.y1 >=35 && me.y1 <= 815){
			if(me.x1 <= 35 || me.x1 >= 1365) safeSpawn = true;
			else{
				me.setCoordinates(me.x1, Math.floor(Math.random() * 815) + 5)
			} 
		} else {
			console.log('We good!');
			safeSpawn = true;
		}
		if(safeSpawn){
			if(boundaries.checkBounds(me)) {
				context.fillStyle = me.color;
				context.fillRect(me.x1, me.y1, me.size, me.size);
			}else{
				console.log('(' + me.x1 + ',' + me.y1 + ') are good coordinates, but within a boundary');
				me.setCoordinates( Math.floor(Math.random() * 1365) + 5, Math.floor(Math.random() * 815) + 5);
				safeSpawn = false;
			}
		}	
		i++; 
		if(i == 1500) break;
	}
}