let boundaries = {
			walls: {
				leftTop: {
					x1: 50,
					x2: 60,
					y1: 50, 
					y2: 375,
					id: 'leftTop',
					type: 'wall'
				}, 
				leftBottom: {
					x1: 50,
					x2: 60,
					y1: 450, 
					y2: 800,
					id: 'leftBottom',
					type: 'wall'
				}, 
				topLeft: {
					x1: 50,
					x2: 650,
					y1: 50, 
					y2: 60,
					id: 'topLeft',
					type: 'wall'
				},
				topRight: {
					x1: 725,
					x2: 1350,
					y1: 50, 
					y2: 375,
					id: 'topRight',
					type: 'wall'
				},
				rightTop: {
					x1: 1340,
					x2: 1350,
					y1: 50, 
					y2: 375,
					id: 'rightTop',
					type: 'wall'			
				}, 
				rightBottom: {
					x1: 1340,
					x2: 1350,
					y1: 450, 
					y2: 800,
					id: 'rightBottom',
					type: 'wall'
				}, 
				bottomLeft: {
					x1: 50,
					x2: 650,
					y1: 790, 
					y2: 800,
					id: 'bottomLeft',
					type: 'wall'			
				},
				bottomRight: {
					x1: 725,
					x2: 1350,
					y1: 790, 
					y2: 800,
					id: 'bottomRight'	,
					type: 'wall'
				}
			},
			players: {},
			obstacles: {},
			collectibles: {},
			projectiles: {}
	}

	function checkBounds(obj){
		let keys = Object.keys(boundaries);
		let available = true;
		keys.forEach(key => {
			let boundary = boundaries[key];
			Object.keys(boundary).forEach(bound => {
				let safeX = true;
				let safeY = true;
				let obstacle = boundary[bound];
				let testBound = obstacle.id + ': (' + obstacle.x1 + ', ' + obstacle.y1 + ', ' + obstacle.x2 + ', ' + obstacle.y2 + ')';
				let objBound = obj.id + ': (' + obj.x1 + ', ' + obj.y1 + ', ' + obj.x2 + ', ' + obj.y2 + ')';
				if(obj.type == 'player' || obj.type == 'projectile'){
					if(obj.x1 <= obstacle.x1){
						if(obj.x2 >= obstacle.x1) safeX = false;
					} else if (obj.x1 >= obstacle.x1 && obj.x1 <= obstacle.x2) safeX = false;
					if(obj.y1 <= obstacle.y1){
						if(obj.y1 + obj.height >= obstacle.y1) safeY = false;
					} else if (obj.y1 >= obstacle.y1 && obj.y1 <= obstacle.y2) safeY = false;
					if(safeX == false && safeY == false) {
						//console.log(testBound + '\n' + objBound);
						available = false;
					}
				} else {
					if(obj.x1 <= obstacle.x1-15){
						if(obj.x2 >= obstacle.x1-15) safeX = false;
					} else if (obj.x1 >= obstacle.x1-15 && obj.x1 <= obstacle.x2+15) safeX = false;
					if(obj.y1 <= obstacle.y1-15){
						if(obj.y1 + obj.height >= obstacle.y1-15) safeY = false;
					} else if (obj.y1 >= obstacle.y1-15 && obj.y1 <= obstacle.y2+15) safeY = false;
					if(safeX == false && safeY == false) {
						available = false;
					}
				}
			});
		});
		return available;
	}

export {boundaries, checkBounds};