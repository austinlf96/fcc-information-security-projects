class Collectible {
  constructor({x, y, size, value, id, icon}) {
		this.x = x;
		this.y = y;
		this.value = value;
		this.id = id;
		this.x1 = x;
		this.y1 = y;
		this.x2 = x + size;
		this.y2 = y + size; 
		this.size = size;
		this.icon = icon;
		this.status = 'inactive';
  }
}

/*
  Note: Attempt to export this for use
  in server.js
*/
//try {
//  module.exports = Collectible;
//} catch(e) {console.log(e);}

export default Collectible;
