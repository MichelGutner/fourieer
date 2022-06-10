let time = 0;
let path = [];

let x = [];
let y = [];
let z = [];

let fourierX;
let fourierY;

function setup() {
  createCanvas(1900, 1900);

  const skip = 2;
  for (let i = 0; i < logoCefet.length; i += skip) {
    x.push(logoCefet[i].x);
  }
  for (let i = 0; i < logoCefet.length; i += skip) {
    y.push(logoCefet[i].y);
  }

  for (let i = 0; i < logoHeader.length; i += skip) {
    x.push(logoHeader[i].x);
  }
  for (let i = 0; i < logoHeader.length; i += skip) {
    y.push(logoHeader[i].y);
  }
  for (let i = 0; i < professor.length; i += skip) {
    x.push(professor[i].x);
  }
  for (let i = 0; i < professor.length; i += skip) {
    y.push(professor[i].y);
  }

  fourierX = fourierT(x);
  fourierY = fourierT(y);
}

function drawFourier(cx, cy, rotation, fourier) {
  let x = cx;
  let y = cy;

  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let radius = fourier[i].amp;
    let angle = fourier[i].phase + time * fourier[i].freq + rotation * 2;
    x += radius * cos(angle - 1 );
    y += radius * sin(angle);

    stroke(265, 120); // colors my controlls logoCefets
    noFill(0);
    ellipse(prevx, prevy, radius); // size my circles

    stroke(2555);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);
  let vx = drawFourier(600, 140, 120, fourierX);
  let vy = drawFourier(200, 200, 120, fourierY);

  path.push(createVector(vx.x, vy.y));
  stroke(255, 150);

  ellipse(x, y, z, 8, 8, 8);
  line(vx.x, vx.y, vx.x, vy.y); // add line x inside in drawer
  line(vy.x, vy.y, vx.x, vy.y); // add line y inside in drawer

  stroke(1555);
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
