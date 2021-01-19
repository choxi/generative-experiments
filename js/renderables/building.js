import Utils from "../utils"

export default class Building {
  constructor() {
    this.x = 0
    this.y = 0
    this.height = Utils.random(10, 100)
    this.width = Utils.random(10, 100)
  }

  render(context) {
    let { x, y, height, width } = this
    let borderWidth = 2

    context.fill(0, 0, 0)
    context.rect(x - borderWidth, y - borderWidth, width + 2*borderWidth, height + 2*borderWidth)
    context.noStroke()
    context.fill(25, 25, 25)
    context.rect(x, y, width, height)

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