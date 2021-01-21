import p5 from "p5"
import Utils from "./utils"

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight

  p.setup = () => {
    console.log("Setup")
    p.createCanvas(width, height, p.WEBGL)
    p.background(0)
    // Utils.setGradient(p, - width / 2, - height / 2, width, height, p.color(255), p.color(0), 1)

    let layer = p.createGraphics(width, height, p.WEBGL)
    Utils.setGradient(layer, - width / 2, - height / 2, width, height, p.color(25, 25, 25, 255), p.color(0, 0, 0, 0), 1)
    p.scale(1, -1)
    p.image(layer, - width / 2, - height / 2)
  }
})