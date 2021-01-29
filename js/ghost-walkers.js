import p5 from "p5"

console.log("starting playground")

import Utils from "./utils"
import Color from "./renderables/color"
import Vector from "./math/vector"
import { v4 as uuid } from "uuid"
import RandomWalker from "./renderables/random-walker"

class Bubble {
  constructor(location) {
    this.id = uuid()
    this.location = location
    this.radius = 2
  }

  render(p) {
    let { x, y } = this.location
    let { alpha, radius } = this

    p.push()
    p.noFill()
    p.stroke(Color.palettes.tron.blue.alpha(alpha).toP5(p))
    p.ellipse(x, y, radius)
    p.pop()
  }

  step() {
    this.radius += 1
    this.alpha = 255 / this.radius
  }
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let xRange = 200
  let bubbles = {}
  let walkers = []

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
    for(let i = 0; i < 10; i++) {
      let walker = new RandomWalker()
      walkers.push(walker)
    }
  }

  p.draw = () => {
    p.background(0)

    walkers.forEach(walker => {
      walker.render((lastX, lastY, x, y, color) => {
        let source = new Vector(x, y)
        let bubble = new Bubble(source)
        bubbles[bubble.id] = bubble
      })

      walker.step()
    })

    Object.keys(bubbles).forEach(id => {
      let bubble = bubbles[id]
      bubble.render(p)
      bubble.step()

      if (bubble.alpha < 1) {
        delete bubbles[bubble.id]
      }
    })
  }

  // p.mouseMoved = (event) => {
  //   let source = new Vector(p.mouseX - width / 2, p.mouseY - height / 2)
  //   let bubble = new Bubble(source)
  //   bubbles[bubble.id] = bubble
  // }
})