console.log("Starting bubble-stroke")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width = window.innerWidth
var height = window.innerHeight
var bubbles = {}
var bubbleSources = []

class BubbleSource {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(20)
  createCanvas(width, height, WEBGL)
}

function mouseMoved() {
  let source = new BubbleSource(mouseX - width / 2, mouseY - height / 2)
  bubbleSources.push(source)
}

function draw() {
  background(0)
    // .color(lerpColor(color(255, 255, 255, 1), color(255, 0, 0, 1), 0.5))

  fill(255, 255, 255)
  ellipse(1100, 200, 200, 200)
  // drawGradient(1100, 200, color(255, 255, 255, 4), color(255, 255, 255, 0), 600)
  Utils.radialGradient(1100, 200, 600, 600, color(255, 255, 255, 1), color(255, 255, 255, 0))

  fill(255, 255, 255)
  Object.entries(bubbles).forEach(([id, bubble]) => {
    ellipse(bubble.x, bubble.y, bubble.size)
    bubble.y -= bubble.speed
    bubble.x += random(4) - 2

    if (bubble.y >= height / 2) {
      delete bubbles[id]
    }
  })

  bubbleSources.forEach(source => {
    if (random(50) < 1) {
      let bubble = new Bubble()
      bubble.x = source.x
      bubble.y = source.y
      bubbles[bubble.id] = bubble
    }
  })
}

class Bubble {
  constructor() {
    this.id = uuidv4()
    this.x = random(width) -  width / 2
    this.y = random(height) - height / 2
    this.speed = random(10) + 1
    this.size = random(10) + 1
  }
}