console.log("starting playground")

import p5 from "p5"
import Vector from "./math/vector"
import Utils from "./utils"

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let t = 0

  p.setup = () => {
    p.createCanvas(width, height)
    p.noFill()
    p.stroke(0, 0, 0, 255)
  }

  let x = width / 2
  let y = height / 2
  let size = 20
  let limit = 1
  p.draw = () => {
    if (t > limit) { return }

    let peaks = Utils.random(4, 7)
    let horizon = 100
    let widthLeft = width
    let lastPeak = new Vector(0, horizon)
    for(let i = 0; i < peaks; i++) {
      console.log("hey")
      let deltaX = (widthLeft * Utils.random(6) / 10)
      let pX = width - widthLeft + deltaX
      let pY = Utils.random(horizon, horizon + 100)
      p.line(lastPeak.x, lastPeak.y, pX, pY)
      widthLeft -= deltaX
      lastPeak = new Vector(pX, pY)
    }
    t++
  }
})