console.log("Starting snake-noise")

import p5 from "p5"
// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

class Path {
  constructor() {
    this.x = 0
    this.y = 0
  }

  render(buffer) {
    var squares = []
    let range = 100

    for(let i = 0; i < 40; i++) {
      let x = this.x + buffer.random(range) - range / 2
      let y = this.y + buffer.random(range) - range / 2
      squares.push(new Square(x, y))
    }

    squares.forEach(square => square.render(buffer))
  }
}

class Square {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 10
  }

  render(buffer) {
    buffer.fill(0, 0, 255, 255)
    buffer.rect(this.x, this.y, this.size, this.size)
  }
}

let app = new p5(p => {
  var width = window.innerWidth
  var height = window.innerHeight
  var squares = []
  var path

  p.setup = () => {
    p.frameRate(5)
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()

    p.fill(0, 0, 255)
    p.ellipse(100, 100, 200, 200)

    path = new Path()
  }

  p.draw = () => {
    p.background(0)

    path.x = path.x + p.random(-10, 10)
    path.y = path.y + p.random(-10, 10)

    path.render(p)
  }
})