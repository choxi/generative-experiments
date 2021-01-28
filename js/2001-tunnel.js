console.log("starting 2001-tunnel")

import p5 from "p5"
import Utils from "./utils"
import Vector from "./math/vector"
import { v4 as uuid } from "uuid"
import Color from "./renderables/color"


class Beam {
  constructor() {
    this.id = uuid()
    this.size = 1
    this.length = 2000
    let granularity = 10
    let radius = 4
    let vY = Utils.random(-radius * granularity , radius * granularity) / granularity
    var vX = Math.sqrt(radius*radius - vY*vY)
    vX = Utils.random(2) < 1 ? -vX : vX

    // let vY = -4
    // let vX = Math.sqrt(16 - vY * vY)

    let { blue, white } = Color.palettes.tron
    this.velocity = new Vector(vX, vY, 20)
    this.color = Color.lerp(blue.alpha(0.5), Color.palettes.tron.white, Utils.random(10) / 10)
    this.t = 0
  }

  render(buffer) {
    let { color, t, size, length } = this
    let off = this.offset()

    buffer.push()
    buffer.fill(color.toP5(buffer))
    buffer.rotateX(this.velocity.xAngle())
    buffer.rotateY(this.velocity.yAngle())
    buffer.translate(0, 0, off)
    if (off < length ) {
      buffer.ellipsoid(size, size, off, 40, 40)
    } else {
      buffer.ellipsoid(size, size, length, 40, 40)
    }
    buffer.pop()
  }

  offset() {
    return this.t * this.velocity.magnitude()
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
  let beams = {}

  for(let i = 0; i < 1; i++) {
    let beam = new Beam()
    beams[beam.id] = beam
  }

  p.draw = () => {
    p.background(0)

    Object.keys(beams).forEach(id => {
      let beam = beams[id]
      beam.render(p)
      beam.step()

      if (beam.offset() > 4000) {
        delete beams[beam.id]
      }
    })

    if (Utils.random(10) < 1) {
      for(let i = 0; i < 1; i++) {
        let beam = new Beam()
        beams[beam.id] = beam
      }
    }

    t++
  }
})
