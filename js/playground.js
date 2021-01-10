console.log("Starting playground")

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

class Orb {
  constructor() {
    this.id = uuidv4()
    this.x = random(width) - width / 2
    this.y = random(height) - height / 2
    this.color = color(random(255), random(255), random(255), random(255))
    // this.color = color(0, random(255), 0, random(255))
    this.squares = []

    for(let i = 0; i < 10; i++) {
      this.squares.push(new Square(this.x, this.y))
    }
  }

  step() {
    let offsetX = random(-1, 4)
    let offsetY = random(-1, 4)
    this.x += offsetX
    this.y += offsetY

    // this.x = constrain(this.x, - width / 2, width / 2)
    // this.y = constrain(this.y, - height / 2, height / 2)

    this.squares.forEach(square => {
      square.x += offsetX + random(-1, 1)
      square.y += offsetY + random(-1, 1)
    })
  }

  render() {
    // let square = new Square(0, 0)
    // square.x = this.x
    // square.y = this.y
    // square.render()
    fill(this.color)
    this.squares.forEach(square => square.render())
  }
}

class Square {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  render() {
    // fill(0, 0, 255, 255)
    rect(this.x, this.y, 1, 1)
  }
}

var width = window.innerWidth
var height = window.innerHeight
var squares = []
var path
var orbs = {}

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(30)
  createCanvas(width, height, WEBGL)
  noStroke()

  fill(0, 0, 255)
  ellipse(100, 100, 200, 200)

  for(let i = 0; i < 1000; i++) {
    let orb = new Orb()
    orbs[orb.id] = orb
  }
}

function draw() {
  background(0)
  Object.keys(orbs).forEach(id => {
    let orb = orbs[id]
    orb.step()
    orb.render()

    if(orb.x > (width / 2) || orb.y > (height / 2)) {
      delete orbs[id]
    }
  })
  console.log(`Orbs: ${Object.keys(orbs).length}`)
}