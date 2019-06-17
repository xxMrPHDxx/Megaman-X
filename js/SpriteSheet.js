export default class SpriteSheet {
	constructor(image){
		this.image = image;
		this.frames = new Map();
	}

	define(name,x,y,width,height){
		const buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		const ctx = buffer.getContext('2d');
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(this.image,x,y,width,height,0,0,width,height);
		this.frames.set(name,buffer);
	}

	get(name){
		return this.frames.get(name);
	}
}