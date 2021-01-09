console.log("Starting spark-brush")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

class Path {
  constructor() {
    this.x = random(width)
    this.y = random(height)
  }

  render() {
    var squares = []

    for(let i = 0; i < 10; i++) {
      let x = random(10) + this.x
      let y = random(10) + this.y
      squares.push(new Square(x, y))
    }

    squares.forEach(square => square.render())
  }
}

class Square {
  constructor(x, y) {
    this.x = random(width) - width / 2
    this.y = random(height)
  }

  render() {
    fill(0, 0, 255, 255)
    rect(this.x, this.y, 100, 100)
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

  path.x = path.x + random(1)
  path.y = path.y + random(1)

  path.render()
}

function mouseMoved() {
}