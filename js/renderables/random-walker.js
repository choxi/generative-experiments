import Utils from "../utils"
import Color from "./color"

export default class RandomWalker {
  constructor(x=0, y=0, options={}) {
    this.x = x
    this.y = y
    this.lastX = x
    this.lastY = y
    this.range = options.range || 10
    this.color = Utils.randomColor()
  }

  render(callback) {
    let { lastX, lastY, x, y, color } = this
    callback(lastX, lastY, x, y, color)
  }

  step() {
    let { range, x, y } = this

    this.lastX = x
    this.lastY = y

    this.x += Utils.random(-range, range + 1)
    this.y += Utils.random(-range, range + 1)
  }
}