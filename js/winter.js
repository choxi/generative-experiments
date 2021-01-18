console.log("moonlight")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var droplets = []
var trees = []
var backgroundSetting = 0
var offset = 0
var width = window.innerWidth
var height = window.innerHeight
var buildings = []
var layerBuffer

let app = new p5((p) => {
})

function setup() {
  console.log("setup")
  width = window.innerWidth
  height = window.innerHeight

  frameRate(30)
  createCanvas(width, height, WEBGL)
  noStroke()

  layerBuffer = createGraphics(width, height)

  for (var i = 0; i < 2000; i++) {
    let droplet = new Droplet()
    droplet.y = random(- height / 2, height / 2)
    droplet.x = random( - width / 2, width / 2)
    droplets.push(droplet)
  }

  for(var i = 0; i < 1; i++) {
    let tree = new Tree()
    tree.x = random(width)
    trees.push(tree)
  }

  for(let i = 0; i < 100; i++) {
    let building = new Building()
    building.x = random(- width / 2, width / 2)
    building.height = random(50, 300)
    building.width = random(10, 100)
    building.y = height / 2 - building.height
    buildings.push(building)
  }

  buildings.forEach(building => building.render(layerBuffer))
}


function draw() {
  background(0)
  image(layerBuffer, -width / 2, - height / 2)
    // .color(lerpColor(color(255, 255, 255, 1), color(255, 0, 0, 1), 0.5))

  // trees.forEach(tree => {
  //   tree.render()
  // })

  fill(255, 255, 255)
  ellipse(1100, 200, 200, 200)
  // drawGradient(1100, 200, color(255, 255, 255, 4), color(255, 255, 255, 0), 600)
  // Utils.radialGradient(1100, 200, 600, 600, color(255, 255, 255, 1), color(255, 255, 255, 0))

  droplets.forEach(droplet => {
    fill(droplet.color)
    ellipse(droplet.x, droplet.y, droplet.size, droplet.size)
    droplet.y += droplet.speed

    if (droplet.y > height / 2) {
      droplet.y = - height / 2
    }
  })
}

class Building {
  constructor() {
    this.x = 0
    this.y = 0
    this.height = 100
    this.width = 100
  }

  render(buffer) {
    let { x, y, height, width } = this
    let borderWidth = 2
    // fill(155, 155, 155)
    // buffer.fill(0)
    // buffer.rect(x - borderWidth, y - borderWidth, width + 2*borderWidth, height + 2*borderWidth)
    // buffer.fill(25, 25, 25)
    // buffer.rect(x, y, width, height)

    let windowHeight = 3
    let windowWidth = 3
    let padding = 4
    let rows = Math.floor(height / (windowHeight + padding))
    let columns = Math.floor(width / (windowWidth + padding))

    buffer.fill(55, 55, 55)
    for(let r = 0; r < rows; r++) {
      for(let c = 0; c < columns; c++) {
        let wX = x + c * (windowWidth + padding) + padding / 2
        let wY = y + r * (windowHeight + padding) + padding / 2
        buffer.rect(wX, wY, windowWidth, windowHeight)
      }
    }
  }
}

class Tree {
  constructor() {
    this.x = 100
    this.y = height - 200
  }

  render() {
    fill(0, 255, 0)
    triangle(this.x, this.y, this.x - 50, this.y + 100, this.x + 50, this.y + 100)
      .noStroke()
    var newY = this.y + 50
    triangle(this.x, newY, this.x - 50, newY + 100, this.x + 50, newY + 100)
      .noStroke()
    var newY = this.y + 100
    triangle(this.x, newY, this.x - 50, newY + 100, this.x + 50, newY + 100)
      .noStroke()
  }
}

class Droplet {
  constructor() {
    this.x = 0
    this.y = 0
    this.size = random(2)
    this.speed = this.size / 5 + random(2)
    this.color = color(255, 255, 255, random(1, 255))
  }

  move(x, y) {
    this.x = x
    this.y = y
  }
}

function blendColors(colorA, colorB, percentage) {
  let blendedRed = colorA._getRed() * (1 - percentage) + colorB._getRed() * percentage
  let blendedGreen = colorA._getGreen() * (1 - percentage) + colorB._getGreen() * percentage
  let blendedBlue = colorA._getBlue() * (1 - percentage) + colorB._getBlue() * percentage
  let blendedAlpha = colorA._getAlpha() * (1 - percentage) + colorB._getAlpha() * percentage

  return color(blendedRed, blendedGreen, blendedBlue, blendedAlpha)
}