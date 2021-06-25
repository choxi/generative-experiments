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
    this.radius = Utils.random(10, 100)
    this.alpha = 255 * 10 / this.radius
  }

  render(p) {
    const { x, y } = this.location
    const { alpha, radius } = this

    p.push()
    p.noFill()
    p.stroke(Color.palettes.tron.blue.alpha(alpha).toP5(p))
    p.ellipse(x, y, radius)
    p.pop()
  }

  step() {
    this.radius += 0.2
    this.alpha = this.alpha * 0.99
  }
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let bubbles = {}

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
    for(let i = 0; i < 5; i++) {
      const x = Utils.random(- width / 2, width / 2)
      const y = Utils.random(- height / 2, height / 2)
      const bubble = new Bubble(new Vector(x, y))
      bubbles[bubble.id] = bubble
    }
  }

  function updateBubbles(id) {
    let bubble = bubbles[id]
    bubble.render(p)
    bubble.step()

    if (bubble.alpha < 1) {
      delete bubbles[bubble.id]
    }
  }

  p.draw = () => {
    // p.background(41, 128, 185)
    p.background(30)

    Object.keys(bubbles).forEach(updateBubbles)

    if (Utils.random(20) < 1) {
      const x = Utils.random(- width / 2, width / 2)
      const y = Utils.random(- height / 2, height / 2)
      const newBubble = new Bubble(new Vector(x, y))
      bubbles[newBubble.id] = newBubble
    }
  }

  // p.mouseMoved = (event) => {
  //   let source = new Vector(p.mouseX - width / 2, p.mouseY - height / 2)
  //   let bubble = new Bubble(source)
  //   bubbles[bubble.id] = bubble
  // }
})