console.log("starting playground")

import p5 from "p5"
import Vector from "./math/vector"
import Utils from "./utils"
import { v4 as uuid } from "uuid"
import Color from "./renderables/color"

// Try to do a Brownian tree?
// https://en.wikipedia.org/wiki/Diffusion-limited_aggregation
// https://aiartists.org/generative-art-design
// https://www.youtube.com/watch?v=Cl_Gjj80gPE
class Point {
  constructor(x, y, size = 10, previousDirection = new Vector(0, 0)) {
    this.id = uuid()
    this.location = new Vector(x, y)
    this.direction = previousDirection.add(new Vector(Utils.random(-2, 3), Utils.random(-2, 3))).unit()
    this.start = new Vector(x, y)
    this.size = size
    this.color = Color.random(Color.palettes.gray)
  }

  update() {
    this.location = this.location.add(this.direction)
  }


  branches() {
    let { size, color, direction } = this
    let { x, y } = this.location

    let newPointA = new Point(x, y, size * 0.8, direction)
    newPointA.color = color
    let newPointB = new Point(x, y, size * 0.8, direction)
    newPointB.color = color

    return [newPointA, newPointB]
  }

  render(buffer) {
    let { x, y } = this.location
    let { size } = this
    buffer.fill(this.color.toP5(buffer))
    buffer.ellipse(x, y, size)
  }
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let points = {}

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
    p.noStroke()
    p.background(255)
    p.frameRate(60)
  }

  let color = Color.random()
  let firstPoint = new Point(0, 0)
  points[firstPoint.id] = firstPoint
  let secondPoint = new Point(0, 0)
  points[secondPoint.id] = secondPoint
  let pointC = new Point(0, 0)
  points[pointC.id] = pointC

  p.draw = () => {
    p.fill(color.toP5(p))
    Object.keys(points).forEach(id => {
      // if (Utils.random(300) < 1) {
      //   delete points[id]
      //   return
      // }

      let point = points[id]
      if (point.size < 2) {
        delete points[point.id]
        return
      }

      let { x, y } = point.location
      point.render(p)
      point.update()

      if (Utils.random(100) < 1) {
        point.branches().forEach(p => {
          points[p.id] = p
        })

        delete points[id]
      }
    })
  }
})