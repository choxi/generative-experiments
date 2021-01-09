console.log("Starting snake-noise")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

class Path {
  constructor() {
    this.x = 0
    this.y = 0
  }

  render() {
    var squares = []
    let range = 100

    for(let i = 0; i < 40; i++) {
      let x = this.x + random(range) - range / 2
      let y = this.y + random(range) - range / 2
      squares.push(new Square(x, y))
    }

    squares.forEach(square => square.render())
  }
}

class Square {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 10
  }

  render() {
    fill(0, 0, 255, 255)
    rect(this.x, this.y, this.size, this.size)
  }
}

var width = window.innerWidth
var height = window.innerHeight
var squares = []
var path;

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(5)
  createCanvas(width, height, WEBGL)
  noStroke()

  fill(0, 0, 255)
  ellipse(100, 100, 200, 200)

  path = new Path()
}

function draw() {
  background(0)

  path.x = path.x + random(2) - 1
  path.y = path.y + random(2) - 1

  path.render()
}

function mouseMoved() {
}