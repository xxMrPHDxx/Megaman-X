import SpriteSheet from './SpriteSheet.js';
import Animation from './Animation.js';

export function loadImage(imageUrl){
	return new Promise((resolve,reject)=>{
		const img = new Image();
		img.src = imageUrl;
		img.onload = e => resolve(img);
		img.onerror = e => reject(e);
	});
}

export function loadJSON(url){
	return fetch(url).then(res=>res.json());
}

export function loadSprite(path){
	return loadJSON(path)
	.then(config=>Promise.all([
		loadImage(config.image),
		config.frames,
	]))
	.then(([image,frames])=>{
		const sprite = new SpriteSheet(image);
		for(let {name,rect} of frames){
			sprite.define(name,...rect);
		}
		return sprite;
	});
}

export function loadAnimation(path){
	return loadJSON(path)
	.then(config=>Promise.all([
		loadSprite(config.spritesheet),
		config.animations,
	]))
	.then(([sheet,animations])=>{
		const anims = new Map();
		for(const {name,frameLen,frames} of animations){
			let images = [];
			for(const frame of frames){
				let image = sheet.get(frame);
				images.push(image);
			}
			anims.set(name,new Animation(images,frameLen));
		}
		return anims;
	})
}