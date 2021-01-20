console.log("winter")

import p5 from "p5"
import Building from "./renderables/building"

// TODO
//
// - [ ] More building types (sears tower, colored lights on top)
//   * [x] Add roofs
//   * [ ] Add staggers
// - [ ] Animate lights changing (need a way to update background layers)
// - [x] Add moon
// - [ ] Add moving clouds
// - [ ] Add background lighting, texture, gradient
// - [x] Horizontal scrolling?
// - [x] Space windows correctly

var droplets = []
var width = window.innerWidth
var height = window.innerHeight
var buildings = []
var bufferA
var bufferB
var bufferC

let app = new p5(p => {
  var t = 0
  var totalT = 0

  p.setup = function() {
    p.frameRate(30)
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()

    bufferA = p.createGraphics(width, height, p.WEBGL)
    bufferA.noStroke()
    bufferA.background(0, 0, 0, 0)

    bufferB = p.createGraphics(width, height, p.WEBGL)
    bufferB.noStroke()
    bufferB.background(0, 0, 0, 0)

    bufferC = p.createGraphics(width, height, p.WEBGL)
    bufferC.noStroke()
    bufferC.background(0, 0, 0, 0)

    for (var i = 0; i < 2000; i++) {
      let droplet = new Droplet()
      droplet.y = p.random(- height / 2, height / 2)
      droplet.x = p.random( - width / 2, width / 2)
      droplets.push(droplet)
    }

    buildings = generateBuildings()
    buildings.forEach(building => building.render(bufferA))
    buildings = nextBuildings(buildings)
    buildings.forEach(building => building.render(bufferB))
    buildings = nextBuildings(buildings)
    buildings.forEach(building => building.render(bufferC))
  }

  p.draw = function() {
    let speed = 2
    p.background(0)

    // Moon
    p.fill(255, 255, 255, 150)
    p.ellipse(width / 2 - 200 - totalT / 5, - height / 2 + 200 - totalT / 10, 200, 200, 40)

    p.image(bufferA, -width / 2 - t * speed, - height / 2)
    p.image(bufferB, -width / 2 - t * speed + width, - height / 2)

    droplets.forEach(droplet => {
      p.fill(droplet.color)
      p.ellipse(droplet.x, droplet.y, droplet.size, droplet.size)
      droplet.y += droplet.speed

      if (droplet.y > height / 2) {
        droplet.y = - height / 2
      }
    })

    if ((t+1)*speed > width) {
      console.log("switch")
      t = 1
      buildings = nextBuildings(buildings)
      bufferA = bufferB
      bufferB = bufferC
      bufferC = p.createGraphics(width, height, p.WEBGL)
      buildings.forEach(b => b.render(bufferC))
    } else {
      t++
    }

    totalT++
  }
})

function generateBuildings() {
  let all = []

  for(let i = 0; i < 100; i++) {
    let building = new Building()
    building.x = Utils.random(- width / 2, width / 2)
    building.height = Utils.random(40, 300)
    building.width = Utils.random(10, 100)
    building.y = - height / 2 // height / 2 - building.height
    all.push(building)
  }

  for(let i = 0; i < 5; i++) {
    let building = new Building()
    building.x = Utils.random(- width / 2, width / 2)
    building.height = Utils.random(300, 600)
    building.width = Utils.random(40, 100)
    building.y = - height / 2 // height / 2 - building.height
    all.push(building)
  }

  return all
}

function nextBuildings(buildings) {
  let overlap = 100
  let stitchBuildings = buildings.filter(b => { return b.x > (width / 2 - overlap) })
  stitchBuildings.forEach(b => { b.x -= width })
  let newBuildings = generateBuildings()
  debugger
  return [...stitchBuildings, ...newBuildings]
}

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