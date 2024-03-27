let SCREEN_WIDTH = 1063 / 2;
let SCREEN_HEIGHT = 1890 / 2;
let SCREEN_RATIO = 1;
let img;
let seq = 0;
let cam;

let button1, button_next, button_snap, button_save;
let button_proceed, button_retake, button_submit;

let emoji1;

let snap;


let userTextInput = "";



// TEXT OBJ
let userTextObj = "";
let textX, textY;

let words;

function preload() {
  img = loadImage('assets/start.png');

  //emoji1 = loadImage();

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


  button_next = createButton('next');

  button_next.mousePressed(NEXT);


  button_snap = createButton('Snap');

  button_snap.mousePressed(SNAP);
  text(userTextObj, textX, textY);
  button_snap.hide();

  button_save = createButton('Save');
  button_save.mousePressed(SAVE);
  button_save.hide();

  button_proceed = createButton('Proceed');
  button_proceed.mousePressed(PROCEED);
  button_proceed.hide();

  button_retake = createButton('Retake');
  button_retake.mousePressed(RETAKE);
  button_retake.hide();



  button_submit = createButton("Submit!");
  button_submit.parent("text-input-container");
  button_submit.mousePressed(submitText)
  button_submit.hide();

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

    button_next.hide();

    pop();






  }

  else if (seq == 3) {
    //background(255, 0, 255);
    //image(snap, 0, 0);

    words.show();


  }

  // input 显示测试输入
  //textAlign(CENTER);
  //textSize(15);
  //text(userTextInput, width / 2, 50);

  // submitted text
  textSize(30);
  text(userTextObj, textX, textY);

  if (mouseIsPressed) {
    textX = mouseX;
    textY = mouseY;
  }

}

function NEXT() {

  seq = seq + 1;

  if (seq = 2) {
    button_snap.show();
  }

}

function PROCEED() {

  words.show();

  button_retake.hide();

  button_proceed.hide();

  button_snap.hide();

  button_submit.show();

  return false;

}

function RETAKE() {

  tempCanvas.hide();

}

function SNAP() {

  //snap = cam.get(0, 0);

  let tempCanvas = createGraphics(width, height);
  tempCanvas.push();
  //tempCanvas.scale(-1, 1); // 反转图像，因为你在主画布上也反转了摄像头图像
  tempCanvas.image(cam, width, 0, -width, height);
  tempCanvas.pop();

  // 从临时画布获取图像
  snap = tempCanvas.get();

  button_snap.hide();
  button_proceed.show();
  button_retake.show();

  return false;


}

function SAVE() {

  saveCanvas('myCanvas.png');
  return false;

}


function createTextInput() {
  words = createInput("");
  words.parent("text-input-container");
  words.hide();
  //words.input(updateText); // not working as intended
  words.elt.addEventListener("keydown", updateText); // JS

  //  button_submit = createButton("Submit!");
  // button_submit.parent("text-input-container");
  // button_submit.mousePressed(submitText)
}



function submitText() {
  //userTextObj = userTextInput;
  userTextObj = userTextInput; //words.value();
  button_save.show();
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