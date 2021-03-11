import * as boundaries from './boundaries.mjs';


class Player{
	constructor({x, y, size, id, color, health}){
		this.x1 = x;
		this.y1 = y;
		this.width = size;
		this.height = size;
		this.x2 = x + size;
		this.y2 = y + size;
		this.id = id;
		this.color = color;
		this.size = size;
		this.health = health || 1;
		this.type = 'player';
		//this.avatar = avatar;
		this.score = 0;
		this.kills = 0;
		this.wins = 0;
		this.deaths = 0;
		this.shots = 0;
		this.accuracy = 0;
		this.losses = 0;
		this.speed = 10;

  } 

	movePlayer(dir, speed) {
		let tempx1 = this.x1;
		let tempx2 = this.x2;
		let tempy1 = this.y1;
		let tempy2 = this.y2;
		console.log(dir);
		switch(dir){
			case 'w':
			case 'W':
			case 'ArrowUp':
				tempy1 -= speed;
				tempy2 -= speed;
				break;
			case 's':
			case 'S':
			case 'ArrowDown':
				tempy1 += speed;
				tempy2 += speed;
				break;
			case 'd':
			case 'D':
			case 'ArrowRight':
				tempx1 += speed;
				tempx2 += speed;
				break;
			case 'a':
			case 'A':
			case 'ArrowLeft':
				tempx1 -= speed;
				tempx2 -= speed;
				break;
			default:
				console.log('That is not a direction, silly goose.');
				break;
		}
		console.log('direction: ' + dir);
		this.setCoordinates(tempx1, tempy1);
	}

	collision(items, projectiles) {
		if( item.itemX == this.playerX && item.itemY == this.playerY){
			this.points += item.itemPoints;
			return true;
		} else {
			console.log('Player: (' + this.playerX + ',' + this.playerY + ') Item: (' + item.itemX + ',' + item.itemY + ')');
			return false;
		}
	}

 calculateRank(arr) {
		rank = 0;
		arr.sort((a,b) => a.points - b.points);
		console.log(arr);
		rank = arr.indexOf(this);
		return 'Rank: ' + rank + 1 + '/' + arr.length; 
	}

 respawn(){

	}

 shoot(direction){

	}

 setCoordinates(x1, y1){
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x1 + this.size;
		this.y2 = y1 + this.size;
	}

 getCoordinates(){
		return {x1: this.x1, x2: this.x2, y1: this.y1, y2: this.y2};
	}
}
export default Player;
