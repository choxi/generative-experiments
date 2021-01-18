console.log("moonlight")

var droplets = []
var trees = []
var backgroundSetting = 0
var offset = 0
var width = window.innerWidth
var height = window.innerHeight

function draw() {
  console.log("draw")
  background(0)
    // .color(lerpColor(color(255, 255, 255, 1), color(255, 0, 0, 1), 0.5))

  trees.forEach(tree => {
    tree.render()
  })

  fill(255, 255, 255)
  ellipse(1100, 200, 200, 200)
  // drawGradient(1100, 200, color(255, 255, 255, 4), color(255, 255, 255, 0), 600)
  Utils.radialGradient(1100, 200, 600, 600, color(255, 255, 255, 1), color(255, 255, 255, 0))

  droplets.forEach(droplet => {
    fill(255, 255, 255)
    ellipse(droplet.x, droplet.y, droplet.size, droplet.size)
    droplet.y += droplet.speed

    if (droplet.y > height) {
      droplet.y = 0
    }
  })
}

setup = function() {
  console.log("setup")
  width = window.innerWidth
  height = window.innerHeight

  frameRate(10)
  createCanvas(width, height)

  for (var i = 0; i < 250; i++) {
    let droplet = new Droplet()
    droplet.y = random(height)
    droplet.x = random(width)
    droplets.push(droplet)
  }

  for(var i = 0; i < 20; i++) {
    let tree = new Tree()
    tree.x = random(width)
    trees.push(tree)
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
    this.size = random(10) + 2.5
    this.speed = this.size / 5
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
