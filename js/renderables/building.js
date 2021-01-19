import Utils from "../utils"

export default class Building {
  constructor() {
    this.x = 0
    this.y = 0
    this.height = Utils.random(10, 100)
    this.width = Utils.random(10, 100)
    this.hasRoof = Utils.random(5) < 1 ? true : false
    let colorFactor = Utils.random(0, 50)
    this.color = {
      r: colorFactor,
      g: colorFactor,
      b: colorFactor
    }
  }

  render(context) {
    let { x, y, height, width, hasRoof, color } = this

    let borderWidth = 2
    let roofHeight = Utils.random(10, 20)

    context.noStroke()
    context.fill(color.r, color.g, color.b)
    context.rect(x - borderWidth, y - borderWidth, width + 2*borderWidth, height + 2*borderWidth)
    context.rect(x, y, width, height)

    if (hasRoof) {
      let pointA = { x: x - borderWidth, y: y + height + borderWidth }
      let pointB = { x: x + width / 2, y: y + height + borderWidth + roofHeight }
      let pointC = { x: x + width + borderWidth, y: y + height + borderWidth }
      context.triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y)
    }

    let windowHeight = 3
    let windowWidth = 3
    let padding = 4
    let rows = Math.floor(height / (windowHeight + padding))
    let columns = Math.floor(width / (windowWidth + padding))

    context.fill(55, 55, 55)
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < columns; c++) {
        let wX = x + c * (windowWidth + padding) + padding / 2
        let wY = y + r * (windowHeight + padding) + padding / 2
        if (context.random(10) < 2) {
          context.fill(120, 120, 100, context.random(100, 255))
        } else {
          context.fill(55, 55, 55)
        }
        context.rect(wX, wY, windowWidth, windowHeight)
      }
    }
  }
}