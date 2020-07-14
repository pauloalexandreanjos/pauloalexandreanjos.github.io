class Game {
	constructor(elementID, x, y, width, height) {
		
		let elm = document.getElementById(elementID);
		this.ctx = elm.getContext('2d');
		
		this.position = {};
		this.position.x = x;
		this.position.y = y;
		
		this.dimention = {}
		this.dimention.width = width;
		this.dimention.height = height;
		
		this.pieceSize = 10;
	}
	
	
	function drawRect(startX,startY,width,height,color) {
		
		this.ctx.beginPath();
		
		this.ctx.lineTo(startX,startY);
		this.ctx.lineTo(startX+width,startY);
		this.ctx.lineTo(startX+width,startY+height);
		this.ctx.lineTo(startX,startY+height);
		
		this.ctx.closePath();
		
		this.ctx.strokeStyle = color || "green";
		
		this.ctx.stroke();
	}
	
	function drawPiece(posX, posY, color) {
		//ctx.fillStyle = "rgb(0, 255, 0)";
		ctx.fillStyle = color || "gray";
		
		var espacoEntre = 2;
		
		var posXprint = (posX-1) * (pieceSize + espacoEntre) + this.position.x;
		var posYprint = (posY-1) * ((pieceSize/2) + espacoEntre/2) + this.position.y;
		
		ctx.fillRect(posXprint, posYprint, pieceSize, (pieceSize/2));
	}
	
} 