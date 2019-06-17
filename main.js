import {loadSprite,loadAnimation} from './js/loaders.js';

const canvas = document.querySelector('canvas#Screen');
const ctx = canvas.getContext('2d');
let WIDTH, HEIGHT;

let sprite, anims;

async function setup(){
	// sprite = await loadSprite('sprites/x.json');
	anims = await loadAnimation('anim/x.json');
	console.log(anims);
}

function update(){
	anims.get('idle').update();
}

function draw(){
	// console.log('drawing...');
	// ctx.drawImage(sprite.get('idle4'),20,20);
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	// ctx.drawImage(anims.get('idle').images[2], 10, 10);
	anims.get('idle').draw(ctx, 10, 10);
}

let lastTime=performance.now(),now,unprocessedTime=0,FPS=30;
function animate(){
	now = performance.now();
	unprocessedTime += (now-lastTime) / 1000 * FPS;
	lastTime = now;
	while(unprocessedTime >= 1){
		update();
		unprocessedTime--;
	}
	draw();
	requestAnimationFrame(animate);
}

Promise.resolve(setup()).then(animate);

function resize(width,height){
	canvas.setAttribute('width',WIDTH=width);
	canvas.setAttribute('height',HEIGHT=height);
	ctx.imageSmoothingEnabled = false;
	ctx.scale(4,4);
}
window.onresize = ()=>resize(innerWidth,innerHeight)
onresize()

window.keys = Array(256).fill(false);
function onKeyDown(key,code){
	keys[code]=true;
}
function onKeyUp(key,code){
	keys[code]=false;
}
function onEvent(callback){
	return function(e){
		if(e.keyCode < 256) callback(e.code,e.keyCode);
	}
}
window.onkeydown = onEvent(onKeyDown)