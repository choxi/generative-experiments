import p5 from "p5"

let app = new p5(p => {
  p.setup = () => {
    console.log("Setup")

    p.createCanvas(400, 400)
    let layer = p.createGraphics(400, 400)
    layer.fill(255, 255, 0)
    layer.rect(0, 0, 400, 400)
    layer.fill(0, 255, 255)
    layer.rect(10, 10, 400, 400)
    p.image(layer, 0, 0)
  }
})