console.log("Starting bubble-stroke")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width = window.innerWidth
var height = window.innerHeight
var bubbles = []

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(30)
  createCanvas(width, height)
}

function mouseMoved() {
  let bubble = new Bubble()
  bubble.x = mouseX
  bubble.y = mouseY
  bubbles.push(bubble)
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
    ellipse(bubble.x, bubble.y, bubble.size)
    bubble.y -= bubble.speed
    bubble.x += random(4) - 2

    if (bubble.y <= 0) {
      let index = bubbles.findIndex(b => { return b.x == bubble.x && b.y == bubble.y })
      bubbles = [...bubbles.slice(0, index), ...bubbles.slice(index + 1)]
    }
  })
}

class Bubble {
  constructor() {
    this.x = random(width)
    this.y = random(height)
    this.speed = random(10) + 1
    this.size = random(10) + 1
  }
}