console.log("Starting spark-brush")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width = window.innerWidth
var height = window.innerHeight
var bubbles = {}
var bubbleSources = []

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(30)
  createCanvas(width, height, WEBGL)
}

function mouseMoved() {
  let source = new BubbleSource(mouseX - width / 2, mouseY - height / 2)
  bubbleSources.push(source)
}

function draw() {
  background(0)
  noStroke()
    // .color(lerpColor(color(255, 255, 255, 1), color(255, 0, 0, 1), 0.5))

  Object.entries(bubbles).forEach(([id, bubble]) => {
    fill(bubble.color)
    ellipse(bubble.x, bubble.y, bubble.size)
    bubble.y += random(50) - 25
    bubble.x += random(50) - 25
    bubble.size *= 0.5

    // if (bubble.y <= (-height / 2)) {
    //   delete bubbles[id]
    // }

    if (bubble.size <= 0.1) {
      delete bubbles[id]
    }
  })

  bubbleSources.forEach(source => {
    if (random(2) < 50) {
      let bubble = new Bubble()
      bubble.x = source.x
      bubble.y = source.y
      bubble.originX = source.x
      bubble.originY = source.y
      bubbles[bubble.id] = bubble
    }
  })
}

class Bubble {
  constructor() {
    this.id = uuidv4()
    this.x = random(width) -  width / 2
    this.y = random(height) - height / 2
    this.originX = this.x
    this.originY = this.y
    this.speed = random(10) + 1
    this.size = random(10) + 50
    this.color = color(random(255), random(255), random(255), 100)
  }
}

class BubbleSource {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}