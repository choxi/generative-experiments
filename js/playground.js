import p5 from "p5"
import Building from "./renderables/building"

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight

  p.setup = () => {
    console.log("Setup")
    p.createCanvas(width, height, p.WEBGL)
    let layer = p.createGraphics(width, height, p.WEBGL)

    let building = new Building()
    building.render(layer)

    p.image(layer, - width / 2, - height / 2)
  }
})