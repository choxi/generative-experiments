console.log("starting 2001-tunnel")

import p5 from "p5"
import Utils from "./utils"
import Vector from "./math/vector"

class Beam {
  constructor() {
    this.size = 10
    this.offset = Utils.random(100)
    // this.velocity = new Vector(Utils.random(-10, 10), Utils.random(-10, 10), 10)
    let vY = Utils.random(-4, 4)
    var vX = Math.sqrt(10 - vY*vY)
    vX = Utils.random(2) < 1 ? -vX : vX

    this.velocity = new Vector(vX, vY, 20)
    this.r = Utils.random(255)
    this.g = Utils.random(255)
    this.b = Utils.random(255)
    this.t = 0
  }

  render(buffer) {
    let { r, g, b, t } = this
    let speed = this.velocity.magnitude()

    buffer.push()
    buffer.fill(buffer.color(r, g, b))
    buffer.rotateX(this.velocity.xAngle())
    buffer.rotateY(this.velocity.yAngle())
    buffer.translate(0, 0, 100 + t * speed)
    buffer.ellipsoid(10, 10, t * speed, 40, 40)
    buffer.pop()
  }

  step() {
    this.t++
  }
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight

  p.setup = () => {
    console.log("Setup")
    p.createCanvas(width, height, p.WEBGL)
    p.background(0)
    p.fill(p.color(255, 255, 0))
    p.noStroke()
  }

  var t = 0
  let beams = []

  for(let i = 0; i < 1; i++) {
    beams.push(new Beam())
  }

  p.draw = () => {
    beams.forEach(beam => {
      beam.render(p)
      beam.step()
    })

    if (Utils.random(10) < 1) {
      beams.push(new Beam())
    }

    // p.push()
    // p.fill(p.color(255, 255, 0))
    // p.translate(0, t / 10 * speed, -200 + t * speed)
    // p.sphere(10)
    // p.pop()

    // p.push()
    // p.fill(p.color(0, 255, 255))
    // p.translate(0, -t / 10 * speed, -500 + t * speed)
    // p.sphere(10)
    // p.pop()

    // p.push()
    // p.fill(p.color(255, 0, 255))
    // p.translate(-t / 10 * speed, -t / 10 * speed, -100 + t * speed)
    // p.sphere(10)
    // p.pop()

    // for(let i = 0; i < 10; i++) {
    //   p.push()
    //   p.fill(p.color(255, 0, Utils.random(200, 255)))
    //   p.translate(-t / Utils.random(10, 50) * speed, -t / Utils.random(10, 50) * speed, -100 + t * speed)
    //   p.sphere(10)
    //   p.pop()
    // }

    t++
  }
})
