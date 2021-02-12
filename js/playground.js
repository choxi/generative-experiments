console.log("starting playground")

import p5 from "p5"
import Vector from "./math/vector"
import Utils from "./utils"
import { v4 as uuid } from "uuid"
import Color from "./renderables/color"

class Beam {
  constructor(radius) {
    this.id = uuid()
    this.radius = radius
    this.theta = Utils.random(10) / 10
    this.velocity = 0.05
    this.color = Color.random()
  }

  step() {
    this.theta += this.velocity
    this.radius += 0.1
  }

  render(buffer, width, height) {
    let { theta, radius } = this
    let x = Math.sin(theta) * radius
    let y = Math.cos(theta) * radius

    buffer.fill(this.color.toP5(buffer))
    buffer.ellipse(x, y, 5)
  }
}

class Worm {
  constructor() {
    this.id = uuid()
    this.center = new Vector(0, 0)
    this.radius = Utils.random(10, 100)
    this.theta = 0
    this.speed = 0.01
    this.size = 10
    this.color = Color.random()
  }

  step() {
    this.theta += this.speed

    if (Utils.random(1000) < 1) {
      console.log("switch")
      // this.radius = Utils.random(10, 100)
      this.speed = - this.speed
    }
  }

  render(buffer) {
    let { theta, size, radius } = this
    let x = Math.sin(theta) * radius
    let y = Math.cos(theta) * radius
    let color = this.color.toP5(buffer)

    buffer.fill(color)
    buffer.ellipse(x, y, size)
  }
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let t = 0

  let worms = {}

  for(let r = 0; r < 2; r++) {
    let worm = new Worm()
    worms[worm.id] = worm
  }

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()
    p.background(255)
  }

  p.draw = () => {
    p.fill(p.color(255, 255, 255, 1))
    p.rect(- width / 2, - height / 2, width, height)

    Object.keys(worms).forEach(id => {
      let worm = worms[id]
      worm.render(p)
      worm.step()
    })

    // if (Utils.random(10) < 2) {
    //   let beam = new Beam(Utils.random(5, 10))
    //   beams[beam.id] = beam
    // }
  }
})