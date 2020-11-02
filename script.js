var fgImage = null;
var bgImage = null;
var image1 = null;
var blurImg = null;
var copy1,copy2,copy3,copy4,copy5,copy6 = null;
var original = null;
var canvas1,canvas2,canvas3;
var greenThreshold = 240;

function loadImage(){
  var loadInput = document.getElementById("loadFile");
  image1 = new SimpleImage(loadInput);
  original = new SimpleImage(loadInput);
  //create copy of image to ensure other filters workfine
  copy1 = new SimpleImage(loadInput);
  copy2 = new SimpleImage(loadInput);
  copy3 = new SimpleImage(loadInput);
  copy4 = new SimpleImage(loadInput);
  copy5 = new SimpleImage(loadInput);
  copy6 = new SimpleImage(loadInput);
  //filter Canvas
  canvas3 = document.getElementById("Cvs1");
  image1.drawTo(canvas3);
  //alert("You've added a photo:)\nNext, try some filters!");
}

function doGray(){
  //resetCanvas();
  if(imageIsLoaded(copy1)){
    for (var pixel of copy1.values()){
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  copy1.drawTo(canvas3);
  }
  else{
    alert("Image not loaded!");
    return;
  }
}

function doRed(){
  if (imageIsLoaded(copy2)){
    for(var pixel of copy2.values()){
      pixel.setRed(255);
    }
    copy2.drawTo(canvas3);
  }
  else{
    alert("Image not loaded!");
    return;
  }
}

function doRainbow(){
  var height = copy3.getHeight();
  for(var pixel of copy3.values()){
    //avg and y coordinate
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
    var y = pixel.getY();
    
    if(y < height/7){
      if (avg<128){
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
    }
    if(y>=height/7 && y < 2*height/7){
      if(avg < 128){
        pixel.setRed(2*avg);
        pixel.setBlue(0);
        pixel.setGreen(0.8*avg);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
      }
    }
    if(y>=2*height/7 && y<3*height/7){
      if(avg<128){
        pixel.setRed(2*avg);
        pixel.setBlue(0);
        pixel.setGreen(2*avg);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }
    if(y>=3*height/7 && y<4*height/7){
      if(avg<128){
        pixel.setRed(0);
        pixel.setBlue(0);
        pixel.setGreen(2*avg);
      }
      else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }
    if(y>=4*height/7 && y<5*height/7){
      if(avg<128){
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }
      else{
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }
    if(y>=5*height/7 && y<6*height/7){
      if(avg<128){
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }
      else{
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }
    if(y>=6*height/7 && y<height){
      if(avg<128){
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      }
      else{
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
      }
    }
  }
  copy3.drawTo(canvas3);
}

function doFrame(){
  var h = copy4.getHeight();
  var w = copy4.getWidth();
  var thick = 40;
  for(var pixel of copy4.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if(y <= thick || x<= thick || x >= w-thick || y     >= h-thick){
      pixel.setRed(207);
      pixel.setGreen(137);
      pixel.setBlue(16);
    }
  }
  copy4.drawTo(canvas3);
}

function doSpecial(){
  for(var pixel of copy5.values()){
    var avg = (pixel.getRed()+ pixel.getGreen() + pixel.getBlue())/3;
    if(avg<128){
      pixel.setRed(149/17.5*avg);
      pixel.setGreen(185/17.5*avg);
      pixel.setBlue(18/17.5*avg);
    }
    else{
      pixel.setRed((2-149/127.5)*avg + 2*149 -255);
      pixel.setGreen((2-185/127.5)*avg + 2*185 -255);
      pixel.setBlue((2-18/127.5)*avg + 2*18 -255);
    }
  }
  copy5.drawTo(canvas3);
}

function doBlur(){
  blurImg = new SimpleImage(copy6.getWidth(),copy6.getHeight());
  for(var pixel of copy6.values()){
    var random = Math.random();
    if (random < 0.5){
      var x=pixel.getX();
      var y=pixel.getY();
      blurImg.setPixel(x,y,pixel);
    }
    if (random > 0.5){
      var x=pixel.getX();
      var y=pixel.getY();
      var add=Math.floor(Math.random()*10+1);
      var newX=x+add;
      var newY=y+add;
      //see if they are out of range
      if(x>=copy6.getWidth()-10){
           newX=x;
      }
      if(y>=copy6.getHeight()-10){
        newY=y;
      }
      var pt=copy6.getPixel(newX,newY);
      blurImg.setPixel(x,y,pt);
    }
  }
  blurImg.drawTo(canvas3);
}

function imageIsLoaded(img){
  if (copy1 == null || !copy1.complete()){
    return false;
  }
  else{
    return true;
  }
}

function resetCanvas(){
  if(imageIsLoaded(original)){
    //reset all of the global variables for filter images to the original image.
    loadImage();
  }
  else{
    alert("Image not loaded!");
    return;
  }
}

function loadForeground(){
  var fginput = document.getElementById("fgFile");
  fgImage = new SimpleImage(fginput);
  canvas1 = document.getElementById("fgCan");
  fgImage.drawTo(canvas1);
  alert("You Added Foreground!");
}

function loadBackground(){
  var bginput = document.getElementById("bgFile");
  bgImage = new SimpleImage(bginput);
  canvas2 = document.getElementById("bgCan");
  bgImage.drawTo(canvas2);
  alert("You Added Background!");
}

function GreenScreen(){
  if (fgImage == null || !fgImage.complete()){
    alert("Foreground not loaded!");
    return;
  }
  if (bgImage == null || !bgImage.complete()){
    alert("Background not loaded!");
    return;
  }
  
  //otherwize have the canvas cleared up and execute the Green Screen Algo
  clearCanvas();
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  for (var pixel of fgImage.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if (pixel.getGreen() > greenThreshold){
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x,y,bgPixel);
    }
    else{
      output.setPixel(x,y,pixel);
    }
  }
  output.drawTo(canvas1);
}

function clearCanvas(){
  var ctx1 = canvas1.getContext("2d");
  ctx1.clearRect(0,0,canvas1.width,canvas1.height);
  var ctx2 = canvas2.getContext("2d");
  ctx2.clearRect(0,0,canvas2.width,canvas2.height);
}