var draw = document.getElementById('draw');
	var ctx = draw.getContext('2d');
	
	var pieceSize = 10;
	
	var gameArr = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,1,1,1,1,1,1,1,1,1,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0]
	];
	
	var peca = [[6,5],[6,6],[6,7],[6,8]];
	
	const DIR = 'DIR';
	const ESQ = 'ESQ';
	const CIM = 'CIM';
	const BAI = 'BAI';
	
	const loopTick = 1000;
	
	var objKeys = {
		'ArrowRight' : DIR,
		'ArrowLeft' : ESQ,
		'ArrowUp' : CIM,
		'ArrowDown' : BAI
	}
	
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	function clear(ctx) {
		ctx.fillStyle = "black";
		ctx.fillRect (0, 0, 500, 200);
		console.log('Clear...');
		
		drawRect(ctx,75,7,152,131);
	}
	
	
	function printGame() {
		
		clear(ctx);
		
		for (var Yaxis = 0; Yaxis < gameArr.length; Yaxis++) {
			for (var Xaxis = 0; Xaxis < gameArr[Yaxis].length; Xaxis++) {
				if (gameArr[Yaxis][Xaxis]) {
					drawPiece(Xaxis+1, Yaxis+1);
				}
			}
		}
		
		for (var part = 0; part < 4; part++) {
			drawPiece(peca[part][0], peca[part][1], 'red');
		}
	}
	
	function checkLimin(pecaAux) {
		
		var limit = true;
		
		for (var part = 0; part < 4; part++) {
			if (pecaAux[part][0] < 1 || pecaAux[part][0] > 25) {
				limit = false; // Não está dentro do limite lateral
			}
			
			if (pecaAux[part][1] < 1 || pecaAux[part][1] > 20) {
				limit = false; // Não está dentro do limite vertical
			}
		}
		
		return limit;
	}
	
	function checkCollision(peca) {
		
		var collision = false;
		
		console.log('Comeou o for...');
		for (var part = 0; part < 4; part++) {
			console.log('for loop',part);
			
			if (gameArr[peca[part][1]][peca[part][0]] > 0) {
				collision = true;
				console.log('Colidiu!');
				break;
			}
		}
		console.log('Saiu do for...');
		
		return collision;
	}
	
	function fallPiece() {
		
		let pecaAux = [ ...peca ]
		
		for (var part = 0; part < 4; part++) {
			pecaAux[part][1]++;
		}
		
		pecaAux.filter((part) => {
			if (part[1] > 21) {
				pecaAux = [[6,5],[6,6],[6,7],[6,8]];
			}
		});
		
		if (!checkCollision(pecaAux)) {
			peca = pecaAux;
		}
	}
	
	function moveRight() {
		var pecaAux = [ ... peca ];
	
		for (var part = 0; part < 4; part++) {
			pecaAux[part][0] = pecaAux[part][0] +1;
		}
		if (checkLimin(pecaAux)) {
			peca = pecaAux;
		}
		printGame();
	}
	
	function moveLeft() {
		var pecaAux = [ ... peca ];
	
		for (var part = 0; part < 4; part++) {
			pecaAux[part][0] = pecaAux[part][0] -1;
		}
		if (checkLimin(pecaAux)) {
			peca = pecaAux;
		}
		printGame();
	}
	
	function turn() {
	}
	
	function gameLoop() {
		
		printGame();
		
		fallPiece();
		
		if (false) { // Checagem de fim de jogo
			
			ctx.fillStyle = "red";
			
			ctx.fillText('GAME OVER', 120, 70);
			
			return;
		}
		
		setTimeout(gameLoop, loopTick);
	}
	
	clear(ctx);
	
	setTimeout(gameLoop, loopTick);
	
	window.addEventListener('keydown', function(evt) {
		
		if (!(evt.key in objKeys)) return;
		
		if (evt.key == 'ArrowRight') {
			moveRight();
		}
			
		if (evt.key == 'ArrowLeft') {
			moveLeft();
		}
		
		if (evt.key == 'ArrowUp') {
			turn();
		}
		
		if (evt.key == 'ArrowDown'){
			turn();
		}
	});