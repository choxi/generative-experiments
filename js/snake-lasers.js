console.log("Starting snake-lasers")

import p5 from "p5"

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
      let x = this.x + app.random(range) - range / 2
      let y = this.y + app.random(range) - range / 2
      squares.push(new Square(x, y))
    }

    squares.forEach(square => square.render())
  }
}

class Laser {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.vectorX = app.random(0, 10)
    this.vectorY = app.random(0, 10)
  }

  render(context) {
    context.fill(0, 0, 255, 255)

    for(let i = 0; i < 20; i++) {
      let x = this.x + (i / 20) * 100
      let y = this.y + (i / 20) * 100
      context.fill(0, 0, 255, ((i / 20)) * 255)
      context.rect(x, y, 10, 10)
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

let app = new p5(p => {
  p.setup = function() {
    width = window.innerWidth
    height = window.innerHeight

    p.frameRate(5)
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()

    p.fill(0, 0, 255)
    p.ellipse(100, 100, 200, 200)

    for(let i = 0; i < 1; i++) {
      let laser = new Laser(0, 0)
      lasers.push(laser)
    }
  }

  p.draw = function() {
    p.fill(0, 0, 0, 255)
    p.rect(-(width/2), -(height/2), width, height)
    // fill(0, 0, 255, ((10 / 20)) * 255)
    // rect(0, 0, 100, 100)

    lasers.forEach(laser => {
      laser.step()
      laser.render(p)
    })
  }
})
