console.log("winter")

import p5 from "p5"

var droplets = []
var width = window.innerWidth
var height = window.innerHeight
var buildings = []
var layerBuffer

let app = new p5(p => {
  p.setup = function() {
    p.frameRate(30)
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()

    layerBuffer = p.createGraphics(width, height, p.WEBGL)

    for (var i = 0; i < 2000; i++) {
      let droplet = new Droplet()
      droplet.y = p.random(- height / 2, height / 2)
      droplet.x = p.random( - width / 2, width / 2)
      droplets.push(droplet)
    }

    for(let i = 0; i < 100; i++) {
      let building = new Building()
      building.x = p.random(- width / 2, width / 2)
      building.height = p.random(50, 300)
      building.width = p.random(10, 100)
      building.y = - height / 2 // height / 2 - building.height
      buildings.push(building)
    }

    buildings.forEach(building => building.render(layerBuffer))
  }


  p.draw = function() {
    p.background(0)
    p.image(layerBuffer, -width / 2, - height / 2)

    p.fill(255, 255, 255)
    p.ellipse(1100, 200, 200, 200)

    droplets.forEach(droplet => {
      p.fill(droplet.color)
      p.ellipse(droplet.x, droplet.y, droplet.size, droplet.size)
      droplet.y += droplet.speed

      if (droplet.y > height / 2) {
        droplet.y = - height / 2
      }
    })
  }
})

class Building {
  constructor() {
    this.x = 0
    this.y = 0
    this.height = 100
    this.width = 100
  }

  render(buffer) {
    let { x, y, height, width } = this
    let borderWidth = 2

    // buffer.fill(55, 55, 55)
    // buffer.rect(x - borderWidth, y - borderWidth, width + 2*borderWidth, height + 2*borderWidth)
    buffer.fill(25, 25, 25)
    buffer.rect(x, y, width, height)

    let windowHeight = 3
    let windowWidth = 3
    let padding = 4
    let rows = Math.floor(height / (windowHeight + padding))
    let columns = Math.floor(width / (windowWidth + padding))

    buffer.fill(55, 55, 55)
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < columns; c++) {
        let wX = x + c * (windowWidth + padding) + padding / 2
        let wY = y + r * (windowHeight + padding) + padding / 2
        buffer.rect(wX, wY, windowWidth, windowHeight)
      }
    }
  }
}

class Droplet {
  constructor() {
    this.x = 0
    this.y = 0
    this.size = app.random(2)
    this.speed = this.size / 5 + app.random(2)
    this.color = app.color(255, 255, 255, app.random(1, 255))
  }

  move(x, y) {
    this.x = x
    this.y = y
  }
}