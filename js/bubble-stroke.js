console.log("Starting bubble-stroke")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width = window.innerWidth
var height = window.innerHeight
var bubbles = []

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(10)
  createCanvas(width, height)

  for(let i = 0; i < 100; i++) {
    bubbles.push(new Bubble())
  }
}

function draw() {
  background(0)
    // .color(lerpColor(color(255, 255, 255, 1), color(255, 0, 0, 1), 0.5))

  fill(255, 255, 255)
  ellipse(1100, 200, 200, 200)
  // drawGradient(1100, 200, color(255, 255, 255, 4), color(255, 255, 255, 0), 600)
  Utils.radialGradient(1100, 200, 600, 600, color(255, 255, 255, 1), color(255, 255, 255, 0))

  fill(255, 255, 255)
  bubbles.forEach(bubble => {
    ellipse(bubble.x, bubble.y, 10)
    bubble.y -= 5

    if (bubble.y <= 0) {
      bubble.y = height
    }
  })
}

class Bubble {
  constructor() {
    this.x = random(width)
    this.y = random(height)
  }
}