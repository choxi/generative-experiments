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
    this.radius = 100
    this.theta = 0
    this.speed = 0.01

    if (Utils.random(2) < 1) {
      this.speed = - 0.01
    }

    this.size = 10
    this.color = Color.random()
    this.time = 0

    // this.centerRadius = 200
    // this.centerTheta = 0
  }

  step() {
    this.time +=1

      let { center, theta, radius } = this

      let x = Math.cos(theta) * radius + center.x
      let y = Math.sin(theta) * radius + center.y
      let newCenter = this.center.add(new Vector(Utils.random(-10, 10), Utils.random(-10, 10)))
      let clampedCenterX = Utils.clamp(newCenter.x, -200, 200)
      let clampedCenterY = Utils.clamp(newCenter.y, -200, 200)
      newCenter = new Vector(clampedCenterX, clampedCenterY)

      this.theta = Math.atan2(y - newCenter.y, x - newCenter.x)
      this.radius = Math.sqrt(Math.pow(y - newCenter.y, 2) + Math.pow(x - newCenter.x, 2))
      this.center = newCenter

      let newX = Math.cos(this.theta) * this.radius - this.center.x
      let newY = Math.sin(this.theta) * this.radius - this.center.y
      this.theta += this.speed

    // this.centerTheta += 0.005

    // if (Utils.random(100) < 1) {
      // console.log("switch")
      // this.speed = - this.speed
      // this.radius += Utils.random(-1, 1)
    //   let deltaX = Utils.random(-1, 1)
    //   let deltaY = Utils.random(-1, 1)
    //   this.center = this.center.add(new Vector(deltaX, deltaY))
    // }
  }

  render(buffer) {
    let { centerTheta, centerRadius, theta, size, radius, center } = this
    // let centerX = Math.sin(centerTheta) * centerRadius
    // let centerY = Math.cos(centerTheta) * centerRadius
    let x = Math.cos(theta) * radius + center.x
    let y = Math.sin(theta) * radius + center.y
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

  for(let r = 0; r < 100; r++) {
    let worm = new Worm()
    worms[worm.id] = worm
  }

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()
    p.background(255)
    p.frameRate(60)
  }

  p.draw = () => {
    p.fill(p.color(255, 255, 255, 1))
    p.rect(- width / 2, - height / 2, width, height)

    Object.keys(worms).forEach(id => {
      let worm = worms[id]
      worm.render(p)
      worm.step()

      // p.ellipse(worm.center.x, worm.center.y, 10)
    })

    // if (Utils.random(10) < 2) {
    //   let beam = new Beam(Utils.random(5, 10))
    //   beams[beam.id] = beam
    // }
  }
})