let canvasParams = {
  holder: document.getElementById('canvas'),
  state: false,
  mouseX: false,
  mouseY: false,
  mouseLock: false,
  background: 0,
  gui: true,
  mode: 'canvas', // canvas or svg … SVG mode is experimental 
};
getCanvasHolderSize();


let blocks = {
  eg: {
    h: 240,
    complete: [
      [0, 0],
      [1349, 0],
      [1349, 1024],
      [0, 1024],
    ],
    rooms: {
      kueche: [
        [205, 30],
        [205, 400],
        [525, 400],
        [525, 30],
      ],
      wohnzimmer: [
        [205, 411.5],
        [205, 994],
        [625, 994],
        [625,411.5],
      ],
      garderobe: [
        [536.5, 30],
        [536.5, 110],
        [625, 110],
        [625, 30],
      ],
      kammer: [
        [536.5, 200],
        [536.5, 400],
        [625, 400],
        [625, 200],
      ],
      bad: [
        [649, 711.5],
        [649, 994],
        [900, 994],
        [900,711.5],
      ],
      schlafzimmer: [
        [924, 649],
        [924, 994],
        [1319, 994],
        [1319, 649],
      ],
      ankleide: [
        [924, 436.5],
        [924, 637.5],
        [1319, 637.5],
        [1319, 436.5],
      ],
      gaeste: [
        [924, 30],
        [924, 425],
        [1319, 425],
        [1319, 30],
      ],
      gaestebad: [
        [924, 30],
        [924, 174],
        [1112.5, 174],
        [1112.5, 30],
      ]
    }
  }
};

let scale = 0.2;


/* ###########################################################################
Service Functions
############################################################################ */


function getCanvasHolderSize() {
  canvasParams.w = canvasParams.holder.clientWidth;
  canvasParams.h = canvasParams.holder.clientHeight;
}


function resizeMyCanvas() {
  getCanvasHolderSize();
  resizeCanvas(canvasParams.w, canvasParams.h);
}


function windowResized() {
  resizeMyCanvas();
}


/* ###########################################################################
Classes
############################################################################ */

class Block {

}


/* ###########################################################################
Functions
############################################################################ */


function drawPlanes(plane, height) {

  for (let i = 0; i < plane.length -1; i++) {
    beginShape();
    vertex(plane[i][0] * scale, plane[i][1] * scale, 0);
    vertex(plane[i + 1][0] * scale, plane[i + 1][1] * scale, 0);
    vertex(plane[i + 1][0] * scale, plane[i + 1][1] * scale, height * scale);
    vertex(plane[i][0] * scale, plane[i][1] * scale, height * scale);
    endShape(CLOSE);
  }

  const last = plane.length -1;
  
  beginShape();
  vertex(plane[0][0] * scale, plane[0][1] * scale, 0);
  vertex(plane[last][0] * scale, plane[last][1] * scale, 0);
  vertex(plane[last][0] * scale, plane[last][1] * scale, height * scale);
  vertex(plane[0][0] * scale, plane[0][1] * scale, height * scale);
  endShape(CLOSE);
}

function drawBlock(block) {
  
  const complete = block.complete;
  strokeWeight(0.8);
  drawPlanes(complete, block.h);
  
  let rooms = block.rooms;
  strokeWeight(1);
  for (let room in rooms) {
    let current = rooms[room];
    drawPlanes(current, block.h);
  }
}

function drawHouse() {
  for (let level in blocks) {
    let current = blocks[level];
    drawBlock(current);
  }
}

/* ###########################################################################
Main
############################################################################ */

function setup() {

  let canvas = createCanvas(canvasParams.w, canvasParams.h, WEBGL);
  canvas.parent("canvas");


  // Display & Render Options
  frameRate(25);
  angleMode(DEGREES);
  smooth();
  colorMode(RGB, 255, 255, 255, 100);
  ellipseMode(RADIUS);

  // Anything else
  fill(255, 255, 255, 0.2);
  // noFill();
  stroke(255, 255, 255, 10);
  console.log("asas");
}

function draw() {
  //rotateY(90);
  //
  rotateX(90);
  rotateZ(45);
  //ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 500);
  background(0, 0, 0, 0);
  drawHouse();
  orbitControl();
  
}