(function($, tooltipster){

	const blockSize = 72;

	$('#viewGfx').tooltipster({
		theme: 'tooltipster-borderless',
		distance: blockSize,
		plugins: ['follower']
	});
	let tt = $('#viewGfx').tooltipster('instance');

	let gPosX = 0;
	let gPosY = 0;
	let addedTile = 0;
	let inMem = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
	let cleanItem = {
		'n': 0,
		'x': 0,
		'y': 0
	};

	let xGrid = $('#viewPort').width() / blockSize;
	let yGrid = $('#viewPort').height() / blockSize;

	for (let x = 0; x < Math.ceil(xGrid/2); x++) {
		$('body').append('<div class="gridDivs xGrids" />');
	}
	for (let y = 0; y < Math.ceil(yGrid); y++) {
		$('body').append('<div class="gridDivs yGrids" />');
	}
	$('.xGrids').each(function(i, elm){
		$(elm).css('left', i*2*blockSize+'px');
		$(elm).css('width', '72px');
		$(elm).css('heigth', '100%');
	});
	$('.yGrids').each(function(i, elm){
		$(elm).css('top', (i+1)*blockSize+'px');
		$(elm).css('width', '100%');
		$(elm).css('heigth', blockSize+'px');
	});

	$('body').on('mousemove', function(e) {
		let mX = Math.floor(event.pageX/blockSize)*blockSize;
		let mY = Math.floor(event.pageY/blockSize)*blockSize;
		$('#mDisplay').css('top', mY+'px');
		$('#mDisplay').css('left', mX+'px');
	});

	window.addEventListener('keydown', function(e) {
		if((e.keyCode == 32 || 
			e.keyCode == 37 ||
			e.keyCode == 38 ||
			e.keyCode == 39 ||
			e.keyCode == 40) && e.target == document.body) {
			e.preventDefault();
		}
	});

	$('body').on('keyup', function(e) {
		let ttb = $('.tooltipster-base').offset();
		switch(e.keyCode){
			case 32: 	//space
				// open popup & build json
				console.dir(JSON.stringify(inMem));
				break;
			case 37: 	//left
				gPosY--;
				if(gPosY<0)gPosY=0;
				break;
			case 39: 	//right
				gPosY++;
				if(gPosY>12)gPosY=12;
				break;
			case 38: 	//up
				gPosX--;
				if(gPosX<0)gPosX=0;
				break;
			case 40: 	//down
				gPosX++;
				if(gPosX>12)gPosX=12;
				break;
		}
		$('#viewGfx_mini').css('left', gPosY*18+12);
		$('#viewGfx_mini').css('top', gPosX*18+5);
		//top,left
		$('#viewGfx').css('background-position', (gPosY*-blockSize)+'px '+(gPosX*-blockSize)+'px');
		$('#viewGfx').attr('data-tooltip-content', "tooltip_content");
	});

	$('#viewGfx').on('click', function(e) {
		console.log('clicked.');

		let clickedPos = $('#viewGfx').offset();
		$('.tiles[data-x="'+Math.floor(clickedPos.left/blockSize)+'"][data-y="'+Math.floor(clickedPos.top/blockSize)+'"]').remove();
		$('body').append('<div id="tile_' + addedTile + '" />');
		$('#tile_' + addedTile).addClass('tiles').addClass('tile_y'+gPosX+'_x'+gPosY);
		$('#tile_' + addedTile).css('background-position', (gPosY*-blockSize)+'px '+(gPosX*-blockSize)+'px');
		$('#tile_' + addedTile).attr('data-x', Math.floor(clickedPos.left/blockSize));
		$('#tile_' + addedTile).attr('data-y', Math.floor(clickedPos.top/blockSize));
		$('#tile_' + addedTile).css('top', clickedPos.top);
		$('#tile_' + addedTile).css('left', clickedPos.left);
		inMem[Math.floor(clickedPos.top/blockSize)][Math.floor(clickedPos.left/blockSize)] = {
			'n': 'tile_y'+gPosX+'_x'+gPosY, 
			'x': Math.floor(clickedPos.left/blockSize),
			'y': Math.floor(clickedPos.top/blockSize)
		};
		// if there's previous added one on the same spot, delete it.
		addedTile++;
	});

})(jQuery, $.tooltipster);
