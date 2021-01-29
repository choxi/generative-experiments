import p5 from "p5"
import RandomWalker from "./renderables/random-walker"
console.log("starting random-walker")

import Utils from "./utils"

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let walkers = []

  for(let i = 0; i < 10; i++) {
    let walker = new RandomWalker()
    walkers.push(walker)
  }

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
  }

  p.draw = () => {
    walkers.forEach(walker => {
      walker.render((lastX, lastY, x, y, color) => {
        p.fill(color.toP5(p))
        p.stroke(color.toP5(p))
        p.line(lastX, lastY, x, y)
      })
      walker.step()
    })
  }
})