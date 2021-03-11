class Projectile {
	constructor({x, y, slope, size, damage, alliance, color}){
		this.x1 = x;
		this.y1 = y;
		this.x2 = x + size;
		this.y2 = y + size;
		this.slope = slope;
		this.size = size;
		this.damage = damage;
		this.alliance = alliance;
		this.color = color;
	}
//Don't forget to account for clearing/destorying projectiles when creating the checkBounds() function
	collide(players, obstacles){
		if (alliance == 'enemy'){

		} else {
			players.forEach((player) => {
				
			});
			obstacles.forEach((obstacles) => {

			})
		}
	}
}

export default Projectile;