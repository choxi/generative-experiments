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
    let roofHeight = Utils.random(10, 30)

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

    let padding = 2
    let windowHeight = 3
    let windowWidth = 3
    let windowSpacing = 5
    // bg = building background
    // the windows will align to the edges of this background.
    let bgHeight = height - 2*padding
    let bgWidth = width - 2*padding

    // windowSpacing is how much spacing is between each column or row, i.e:
    // totalWidth = columns * windowWidth + (columns - 1) * windowSpacing
    let rows = Math.floor((bgHeight + windowSpacing) / (windowHeight + windowSpacing))
    let columns = Math.floor((bgWidth + windowSpacing) / (windowWidth + windowSpacing))

    // Add the extra padding evenly horizontally and vertically
    let extraSpaceX = (bgWidth - columns * windowWidth - (columns - 1) * windowSpacing)
    let extraSpaceY = (bgHeight - rows * windowHeight - (rows - 1) * windowSpacing)

    let finalSpacingX = windowSpacing + extraSpaceX / (columns - 1)
    let finalSpacingY = windowSpacing + extraSpaceY / (rows - 1)

    // context.fill(255, 0, 0)
    // context.rect(x + padding + extraSpaceX, y + padding + extraSpaceY, bgWidth, bgHeight)

    context.fill(55, 55, 55)
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < columns; c++) {
        let wX = x + padding + c * (windowWidth + finalSpacingX)
        let wY = y + padding + r * (windowHeight + finalSpacingY)
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