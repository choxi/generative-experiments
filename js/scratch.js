function setup() {
  createCanvas(400, 400, WEBGL);
  background(255);
}

function draw() {
  fill(0, 0, 0, 255)
  rect(-(width/2), -(height/2), width, height)
  fill(0, 0, 255, 100)
  rect(0, 0, 200, 200)
}