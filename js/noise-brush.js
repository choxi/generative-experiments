console.log("Starting spark-brush")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width = window.innerWidth
var height = window.innerHeight
var bubbles = {}
var bubbleSources = []
var noiseBoxes = []

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(20)
  createCanvas(width, height, WEBGL)
  // noiseBoxes.push(new NoiseBox(100, 100),
  //                 new NoiseBox(150, 150),
  //                 new NoiseBox(125, 125),
  //                 new NoiseBox(105, 105),
  //                 new NoiseBox(115, 115))
  noiseBoxes.push(new NoiseBox(100, 100))
}

function draw() {
  background(0)
  noStroke()

  fill(0, 0, 255)
  ellipse(100, 100, 200, 200)
    // .color(lerpColor(color(255, 255, 255, 1), color(255, 0, 0, 1), 0.5))
  noiseBoxes.forEach(box => box.render())
}

function mouseMoved() {
  let coord = Utils.toGPUCoordinate(mouseX, mouseY)
  noiseBoxes.push(new NoiseBox(coord.x, coord.y))
}

class NoiseBox {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  render() {
    let offsetX = this.x
    let offsetY = this.y
    let gridWidth = 100
    let gridHeight = 100
    let size = 25

    for(let i=0; i < (gridWidth / size); i++) {
      for(let j=0; j < (gridHeight / size); j++) {
        let vertFactor = j * size / gridHeight
        fill(255, 255, 255, random(25) * vertFactor)
        rect(i * size + offsetX, j * size + offsetY, size, size)
      }
    }
  }
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