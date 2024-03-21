let SCREEN_WIDTH = 1063 / 2;
let SCREEN_HEIGHT = 1890 / 2;
let SCREEN_RATIO = 1;
let img;
let seq = 0;
let cam;
//let button;

let snap;

let userTextInput = "";


// TEXT OBJ
let userTextObj = "";
let textX, textY;

let words;

function preload() {
  img = loadImage('assets/start.png');
}

function setup() {
  let canvas = createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  canvas.parent("p5-canvas-container");

  SCREEN_RATIO = SCREEN_HEIGHT / 480;

  cam = createCapture(VIDEO);
  cam.hide();

  snap = createImage(640 * SCREEN_RATIO, 480 * SCREEN_RATIO);
  createTextInput();

  textX = width / 2;
  textY = height / 2;
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
    translate(-640 * SCREEN_RATIO / 2 + 1063 / 2, 0); // - camWidth/2 + canvasWidth/2

    // display the cam image and snapshot!
    image(cam, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);
    image(snap, 0, 0, 640 * SCREEN_RATIO, 480 * SCREEN_RATIO);

    pop();
  }
  else if (seq == 3) {
    background(255, 0, 255);
  }

  // input
  textAlign(CENTER);
  textSize(15);
  text(userTextInput, width / 2, 50);

  // submitted text
  textSize(30);
  text(userTextObj, textX, textY);

  if (mouseIsPressed) {
    textX = mouseX;
    textY = mouseY;
  }

}

function keyPressed() {
  if (key == " ") {
    //seq = seq + 1;
  }
  else if (key == "a") {
    // save('myCanvas.png');
    //snap = cam.get(0, 0);
  }
  else if (key == "p") {
    //
  }
  else if (key == "s") {
    //saveCanvas('myCanvas.png');
    //snap = cam.get(0, 0);
  }


}



function createTextInput() {
  words = createInput("");
  words.parent("text-input-container");
  //words.input(updateText); // not working as intended
  words.elt.addEventListener("keydown", updateText); // JS

  btn = createButton("Submit!");
  btn.parent("text-input-container");
  btn.mousePressed(submitText)
}



function submitText() {
  //userTextObj = userTextInput;
  userTextObj = userTextInput; //words.value();
}

function updateText(event) {
  if (event.key == "Enter") {
    userTextInput += words.value();
    userTextInput += "\n";
    words.elt.innerHTML = ""; // ***
  }
  userTextInput = words.value();
}

function updateText111(event) {
  //userTextInput = words.value();

  console.log(event);
  if (event.key == "Enter") {
    userTextInput += "\n";
  }
  else if (event.key == "Shift") {
    //
  }
  else if (event.key == "Control") {
    //
  }
  else if (event.key == "Alt") {
    //
  }
  else if (event.key == "Meta") {
    //
  }
  else if (event.key == "Backspace") {
    userTextInput = userTextInput.slice(0, -1);
    //https://byby.dev/js-remove-last-char
    //Here slice(0, -1) removes the last character because -1 means the last index of the string. You can also use str.length - 1 instead of -1 to get the same result.
  }
  else if (event.key == "Tab") {
    //
  }
  else {
    userTextInput += event.key;
  }
}