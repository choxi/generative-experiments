var buffer

function setup() {
  createCanvas(400, 400, WEBGL);
  buffer = createGraphics(400, 400, WEBGL)
  buffer.fill(0, 255, 255)
  buffer.rect(-200, -200, 400, 400)
  image(buffer, -200, -200)
}

function draw() {
}