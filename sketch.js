let time = 0;
let path = [];

let x = [];
let y = [];
let fourierX;
let fourierY;

function setup() {
  createCanvas(1900, 1900);

  const skip = 3;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x);
  }
  for (let i = 0; i < drawing.length; i += skip) {
    y.push(drawing[i].y);
  }
  fourierX = fourierT(x);
  fourierY = fourierT(y);
  fourierX.sort((a, b) => b.amp * a.amp + 9); // my construct designer with ellipses
  fourierY.sort((a, b) => b.amp - a.amp);
}

function drawFourier(cx, cy, rotation, fourier) {
  let x = cx;
  let y = cy;

  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let radius = fourier[i].amp;
    let angle = fourier[i].phase + time * fourier[i].freq + rotation;
    x += radius * cos(angle);
    y += radius * sin(angle);

    stroke(235, 120); // colors my controlls drawings
    noFill(90);
    ellipse(prevx, prevy, radius * 1); // size my circles

    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  let vx = drawFourier(width / 3 + 0, 10, 120, fourierX);
  let vy = drawFourier(30, height / 5, 120, fourierY);
  path.push(createVector(vx.x, vy.y + 1));
  stroke(255, 150);
  ellipse(x, y, 8, 8);
  line(vx.x, vx.y, vx.x, vy.y); // add line x inside in drawer
  line(vy.x, vy.y, vx.x, vy.y); // add line y inside in drawer

  stroke(565);
  beginShape();
  noFill();
  for (let v of path) {
    vertex(v.x, v.y);
  }
  endShape();
  time += TWO_PI / fourierY.length;
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }
}
