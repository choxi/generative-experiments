console.log("winter")

import p5 from "p5"
import Building from "./renderables/building"

// TODO
//
// - [ ] More building types (sears tower, colored lights on top)
//   * [x] Add roofs
//   * [ ] Add staggers
// - [ ] Animate lights changing (need a way to update background layers)
// - [ ] Add moon
// - [ ] Add moving clouds
// - [ ] Add background lighting, texture, gradient
// - [ ] Horizontal scrolling?
// - [ ] Utility for spacing correctly

var droplets = []
var width = window.innerWidth
var height = window.innerHeight
var buildings = []
var layerBuffer

let app = new p5(p => {
  var t = 0

  p.setup = function() {
    p.frameRate(30)
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()

    layerBuffer = p.createGraphics(width * 2, height, p.WEBGL)
    layerBuffer.noStroke()
    layerBuffer.background(0, 0, 0, 0)

    for (var i = 0; i < 4000; i++) {
      let droplet = new Droplet()
      droplet.y = p.random(- height / 2, height / 2)
      droplet.x = p.random( - width / 2, width / 2)
      droplets.push(droplet)
    }

    for(let i = 0; i < 100; i++) {
      let building = new Building()
      building.x = p.random(- width, width)
      building.height = p.random(40, 300)
      building.width = p.random(10, 100)
      building.y = - height / 2 // height / 2 - building.height
      buildings.push(building)
    }

    for(let i = 0; i < 5; i++) {
      let building = new Building()
      building.x = p.random(- width, width)
      building.height = p.random(300, 600)
      building.width = p.random(40, 100)
      building.y = - height / 2 // height / 2 - building.height
      buildings.push(building)
    }

    buildings.forEach(building => building.render(layerBuffer))
  }

  p.draw = function() {
    p.background(0)

    // Moon
    p.fill(255, 255, 255, 150)
    p.ellipse(width / 2 - 200 - t / 5, - height / 2 + 200 - t / 10, 200, 200, 40)

    p.image(layerBuffer, -width / 2 - t, - height / 2)

    droplets.forEach(droplet => {
      p.fill(droplet.color)
      p.ellipse(droplet.x, droplet.y, droplet.size, droplet.size)
      droplet.y += droplet.speed

      if (droplet.y > height / 2) {
        droplet.y = - height / 2
      }
    })

    t++
  }
})

class Droplet {
  constructor() {
    this.x = 0
    this.y = 0
    this.size = Utils.random(10) / 5
    this.speed = this.size / 5 + app.random(2)
    this.color = app.color(255, 255, 255, app.random(1, 255))
  }

  move(x, y) {
    this.x = x
    this.y = y
  }
}