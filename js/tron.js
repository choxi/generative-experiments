console.log("starting 2001-tunnel")

import p5 from "p5"
import Snake from "./renderables/snake"
import Vector from "./math/vector"
import Utils from "./utils"
import Color from "./renderables/color"
import { v4 as uuid } from "uuid"

class Pulse {
  constructor() {
    this.id = uuid()
    this.radius = 0
    this.speed = 5
    this.size = Utils.random(2, 2)
    this.color = Utils.randomColor()
  }

  render(p) {
    let { radius, size, color } = this

    p.push()
    // p.strokeWeight(size)
    // p.stroke(color.toP5(p))
    // p.noFill()
    p.fill(color.toP5(p))
    p.torus(radius, size, 60, 2)
    p.pop()
  }

  step() {
    this.radius += this.speed
  }
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let planeWidth = width * 2
  let planeHeight = height * 1.5
  let circleCenter = new Vector(0, 100)
  let offset = 170
  let length = 1200
  var planeBuffer

  let snakes = []
  let pulses = {}
  // Radial
  // let divisions = 50
  // for(let i = 0; i < divisions; i++) {
  //   let rotation = - i * Math.PI / divisions
  //   let bStagger = Utils.random(100, 400)
  //   let waypoints = []
  //   waypoints.push(Utils.fromCenter(circleCenter, offset, rotation))
  //   waypoints.push(Utils.fromCenter(circleCenter, offset + 1400, rotation))
  //   // waypoints.push(Utils.fromCenter(circleCenter, offset + bStagger, rotation))
  //   // waypoints.push(Utils.fromCenter(circleCenter, offset + bStagger, rotation - Math.PI/16))
  //   // waypoints.push(Utils.fromCenter(circleCenter, offset + 1200, rotation - Math.PI/16))
  //   snakes.push(new Snake(waypoints))
  // }

  // Rainfaill
  // let colSize = 50
  // let columns = planeWidth / colSize
  // for(let i = 0; i < columns; i++) {
  //   let x = -planeWidth/2 + i * colSize
  //   snakes.push(new Snake([new Vector(x, - planeHeight / 2 + i*10), new Vector(x, planeHeight / 2)]))
  // }

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
    planeBuffer = p.createGraphics(width, height, p.WEBGL)
    planeBuffer.scale(1, -1)
    renderPlane(planeBuffer, planeWidth, planeHeight)
  }

  p.draw = () => {
    p.background(0)
    p.noStroke()

    // Sunrise
    p.push()
    p.translate(0, 100, - planeHeight / 2)
    p.ellipse(0, 0, 300, 300, 40)
    p.pop()

    p.push()
    p.translate(0, 0, - planeHeight / 2)
    snakes.forEach(s => s.render(p))
    p.pop()

    p.push()
    p.translate(0, 100, - planeHeight / 2 - 10)
    Object.keys(pulses).forEach(id => {
      let pulse = pulses[id]
      pulse.render(p)
      pulse.step()

      if (pulse.radius > 2000) {
        delete pulses[id]
      }
    })
    p.pop()

    p.push()
    p.translate(0, 0, 10)
    p.image(planeBuffer, - width / 2, - height / 2)
    p.pop()

    p.push()
    let tilt = -Math.PI / 8 + 0.2
    p.rotateX(tilt)
    p.translate(10, 10, 200)
    p.stroke(0)
    p.fill(255, 0, 0)
    p.box(20, 100, 20)
    p.pop()


    // if (Utils.random(10) < 1) {
    //   let pulse = new Pulse()
    //   pulse.color = Utils.randomColor(Color.palettes.tron)
    //   pulses[pulse.id] = pulse
    // }
  }
})

function renderPlane(p, planeWidth, planeHeight) {
  let tilt = Math.PI / 2 - 0.1
  let blue = p.color(95, 212, 230)
  let white = p.color(239, 233, 234)
  let cellWidth = 20
  let cellHeight = 20
  let columns = planeWidth / cellWidth
  let rows = planeHeight / cellHeight

  p.noStroke()
  p.translate(0, 100, 0)

  p.push()
  p.fill(255, 0, 0)
  p.rotateX(tilt)
  p.plane(planeWidth, planeHeight)
  p.pop()

  for(let r=0; r < rows; r++) {
    for(let c=0; c < columns; c++) {
      let x = c*cellWidth
      let y = r*cellHeight
      p.push()
      p.fill(p.lerpColor(blue, white, p.random(1, 10) / 10))
      p.rotateX(tilt)
      p.translate(- planeWidth / 2 + x + cellWidth/ 2, - planeHeight / 2 + y + cellHeight / 2, 1)
      p.plane(cellWidth, cellHeight)
      p.pop()
    }
  }
}
