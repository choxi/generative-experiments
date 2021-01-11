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

class Laser {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vectorX = random(0, 10)
    this.vectorY = random(0, 10)
  }

  render() {
    fill(0, 0, 255, 255)

    for(let i = 0; i < 20; i++) {
      let x = this.x + (i / 20) * 100
      let y = this.y + (i / 20) * 100
      fill(0, 0, 255, ((i / 20)) * 255)
      rect(x, y, 10, 10)
    }
  }

  step() {
    this.x += this.vectorX
    this.y += this.vectorY
  }
}

var width = window.innerWidth
var height = window.innerHeight
var squares = []
var path;
var lasers = []

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(5)
  createCanvas(width, height, WEBGL)
  noStroke()

  fill(0, 0, 255)
  ellipse(100, 100, 200, 200)

  for(let i = 0; i < 1; i++) {
    let laser = new Laser(0, 0)
    lasers.push(laser)
  }
}

function draw() {
  fill(0, 0, 0, 255)
  rect(-(width/2), -(height/2), width, height)
  // fill(0, 0, 255, ((10 / 20)) * 255)
  // rect(0, 0, 100, 100)

  lasers.forEach(laser => {
    laser.step()
    laser.render()
  })
}