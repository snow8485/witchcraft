let img;
let seq = 0;
let cam;
//let button;

let snap;

let wordsss;
let words;

function preload() {
  img = loadImage('assets/start.png');
}

function setup() {
  let canvas = createCanvas(1063, 1890);
  canvas.parent("p5-canvas-container");

  cam = createCapture(VIDEO);
  cam.hide();

  snap = createImage(640 * 3.9375, 480 * 3.9375);
  createTextInput();
}

function draw() {
  background(0);

  if (seq == 0) {
    background(255, 0, 0);
  }
  else if (seq == 1) {
    image(img, 0, 0)
  }
  else if (seq == 2) {

    push();

    // to flip
    translate(width, 0);
    scale(-1, 1);

    // to place the camera image to the center
    translate(-640 * 3.9375 / 2 + 1063 / 2, 0); // - camWidth/2 + canvasWidth/2

    // display the cam image and snapshot!
    image(cam, 0, 0, 640 * 3.9375, 480 * 3.9375);
    image(snap, 0, 0, 640 * 3.9375, 480 * 3.9375);

    pop();
  }
  else if (seq == 3) {
    background(255, 0, 255);
  }
}

function updateText() {
  wordsss.html(words.value());
}

function keyPressed() {

  //function mousePressed() {

  if (key == " ") {
    seq = seq + 1;
  }

  if (key == "a") {

    // save('myCanvas.png');
    snap = cam.get(0, 0);

    return false;
  }

  if (key == "p") {

    //
  }

  if (key == "s") {

    saveCanvas('myCanvas.png');
    //snap = cam.get(0, 0);

    return false;
  }
}


function createTextInput() {
  words = createInput('say something');
  words.input(updateText);
  words.parent("text-input-container")
}

function createParagraph() {
  createP();
  wordsss = createP('?')
  wordsss.style('font-size', 16)
  wordsss.style('color', 'deeppink');
}






