// THIS FILE IS TO TEST HOW PIXELATED MOVEMENT MIGHT WORK WITH A TIME VARIABLE
// UPDATE: IT WORKS, BETTER THAN MY LAST METHOD
// TO BE SEEN HOW ANNOYING IT IS WRITING if(time%10==0) ALL THE TIME

var time = 0;
var gameOver = false;
var score = 0;



function update(){
	if(time%10==0){
		return true;
	}
	else{
		return false;
	}
}

var pixel = {
	X : 470,
	Y : 470,
	Xmoving : 0,
	Ymoving : -1
}

var rects = [];


function SamePoint(x1,y1,x2,y2){
	if (x1 == x2 && y1 == y2){
		return true;
	}
	return false;
}

function rectProposer(X,Y,w,h){
		this.X = 10*floor(random(1,48));
		this.Y = 10*floor(random(1,48));
		this.w = 10*floor(random(2,4));
		this.h = 10*floor(random(1,5));
}

function rectgen(X,Y,w,h){
	
		proposedRect = new rectProposer();


		
		while(pixel.X >= proposedRect.X && pixel.X <= proposedRect.X + proposedRect.w && pixel.Y >= proposedRect.Y && pixel.Y <= proposedRect.Y + proposedRect.h){
			proposedRect = new rectProposer();
		}
	

		this.X = proposedRect.X;
		this.Y = proposedRect.Y;
		this.w = proposedRect.w;
		this.h = proposedRect.h;
	
}	



function collision(){
	for(var i = 0; i < rects.length; i++){
		if(pixel.X >= rects[i].X && pixel.X <= rects[i].X + rects[i].w - 10 && pixel.Y >= rects[i].Y && pixel.Y <= rects[i].Y + rects[i].h - 10){
			gameOver = true;
		}
	}


}








function wraparound(){

	if(pixel.X > 480){
		pixel.X = 0;
	}
	if(pixel.X < 0){
		pixel.X = 480;
	}
	if(pixel.Y > 480){
		pixel.Y = 0;
	}
	if(pixel.Y < 0){
		pixel.Y = 480;
	}
}

function setup(){
	createCanvas(480,480);
}



function draw(){
	background(0);
	time++;
	if(update()){
		pixel.X = pixel.X + 10*pixel.Xmoving;
		pixel.Y = pixel.Y + 10*pixel.Ymoving;
	}

	if(time%200 == 0){
		var n = rects.length;
		for(var i = rects.length; i < n+10; i++){
			rects[i] = new rectgen();
		}
	}



	wraparound();
	stroke(0);
	fill(255, 100, 0);
	rect(pixel.X,pixel.Y,10,10);

	for(var i = 0; i < rects.length; i++){
		noStroke();
		fill(255);
		rect(rects[i].X,rects[i].Y,rects[i].w,rects[i].h);
	}
	collision();
	if(gameOver){
		background(255,0,0);
		text("GAME OVER", 200, 230);
		text("Score: " + score, 200, 250);
	}
	else{
		score = time;
		fill(255,0,0);
		text("Score: " + score, 0, 470);
	}
}

function keyPressed(){

	if(keyCode == UP_ARROW){
		if(pixel.Ymoving == 0){
			pixel.Xmoving = 0;
			pixel.Ymoving = -1;
		}
	}
	if(keyCode == DOWN_ARROW){
		if(pixel.Ymoving == 0){
			pixel.Xmoving = 0;
			pixel.Ymoving = 1;
		}
	}
	if(keyCode == LEFT_ARROW){
		if(pixel.Xmoving == 0){
			pixel.Xmoving = -1;
			pixel.Ymoving = 0;
		}
	}
	if(keyCode == RIGHT_ARROW){
		if(pixel.Xmoving == 0){
			pixel.Xmoving = 1;
			pixel.Ymoving = 0;
		}
	}


}
