console.log("moonlight")

import p5 from "p5"
import Utils from "./utils"

var droplets = []
var trees = []
var backgroundSetting = 0
var offset = 0
var width = window.innerWidth
var height = window.innerHeight

let app = new p5(p => {
  p.setup = () => {
    console.log("setup")
    width = window.innerWidth
    height = window.innerHeight

    p.frameRate(10)
    p.createCanvas(width, height)

    for (var i = 0; i < 250; i++) {
      let droplet = new Droplet()
      droplet.y = p.random(height)
      droplet.x = p.random(width)
      droplets.push(droplet)
    }

    for(var i = 0; i < 20; i++) {
      let tree = new Tree()
      tree.x = p.random(width)
      trees.push(tree)
    }
  }

  p.draw = () => {
    console.log("draw")
    p.background(0)

    trees.forEach(tree => tree.render(p))

    p.fill(255, 255, 255)
    p.ellipse(1100, 200, 200, 200)
    Utils.radialGradient(1100, 200, 600, 600, color(255, 255, 255, 1), color(255, 255, 255, 0))

    droplets.forEach(droplet => {
      p.fill(255, 255, 255)
      p.ellipse(droplet.x, droplet.y, droplet.size, droplet.size)
      droplet.y += droplet.speed

      if (droplet.y > height) {
        droplet.y = 0
      }
    })
  }
})


class Tree {
  constructor() {
    this.x = 100
    this.y = height - 200
  }

  render(buffer) {
    buffer.fill(0, 255, 0)
    buffer
      .triangle(this.x, this.y, this.x - 50, this.y + 100, this.x + 50, this.y + 100)
      .noStroke()
    var newY = this.y + 50
    buffer
      .triangle(this.x, newY, this.x - 50, newY + 100, this.x + 50, newY + 100)
      .noStroke()
    var newY = this.y + 100
    buffer
      .triangle(this.x, newY, this.x - 50, newY + 100, this.x + 50, newY + 100)
      .noStroke()
  }
}

class Droplet {
  constructor() {
    this.x = 0
    this.y = 0
    this.size = Utils.random(10) + 2.5
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
