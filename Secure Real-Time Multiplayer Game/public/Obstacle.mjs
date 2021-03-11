class Obstacle {
	constructor({x, y, width, height, type, id}){
		this.x1 = x;
		this.y1 = y;
		this.x2 = x + width;
		this.y2 = y + height;
		this.width = width;
		this.height= height;
		this.id = id;
		this.type = type;
	}
}

export default Obstacle;