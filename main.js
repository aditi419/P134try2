sound = "";
status = "";
objects = [];

function preload(){
   sound = loadSound("alert.wav");
}

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting...";
}

function modelLoaded(){
   console.log("Model Loaded");
   status = true;
}

function gotResult(error,results){
   if(error){
      console.log(error);
   }
   console.log(results);
   objects = results;
}

function draw(){
   image(video,0,0,380,380);
   objectDetector.detect(video,gotResult);
   
   r = random(255);
   g = random(255);
   b = random(255);

   if(objects == "person"){
      for(i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "Status: Baby Detected";
         sound.stop();
         fill(r,g,b);
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y + 20);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
   }
   else{
      sound.play();
      document.getElementById("status").innerHTML = "Status: Baby Not Detected";
   }
}