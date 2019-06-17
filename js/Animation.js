export default class Animation {
	constructor(images,frameLen){
		this.images=images;
		this.frameLen=frameLen;
		this.index=0;
		this.lastTimer=performance.now();
	}
	update(){
		const now=performance.now();
		if((now - this.lastTimer)/1000 >= this.frameLen){
			this.lastTimer=now;
			this.index++;
			if(this.index >= this.length) this.index = 0;
		}
	}
	draw(ctx,x,y){
		ctx.drawImage(this.image,x,y);
	}
	get length(){ return this.images.length; }
	get image(){ return this.images[this.index]; }
}