console.log("Starting sunrises")

import p5 from "p5"
import Utils from "./utils"
import Color from "./renderables/color"

new p5(p => {
  var width = window.innerWidth
  var height = window.innerHeight
  var bubbles = {}
  var bubbleSources = []
  var clouds = []
  var time = 0

  p.setup = () => {
    p.frameRate(30)
    p.createCanvas(width, height, p.WEBGL)

    p.background(0)
    p.noStroke()

    for(let i = 0; i < 10; i++) {
      let cloud = new Cloud()
      cloud.x = Utils.random(-width / 2, width / 2)
      cloud.y = Utils.random(-height / 2, height / 2)
      clouds.push(cloud)
    }
  }

  p.draw = () => {
    let sunWidth = 200
    let sunHeight = 200
    // let colorB = color(230, 126, 34)
    // let colorA = color(241, 196, 15)
    let colorB = new Color(52, 152, 219)
    let colorA = new Color(31, 118, 175)
    let rows = 10
    let columns = 10

    for(let j = 0; j < rows; j++) {
      for(let i = 0; i < columns; i++) {
        var x, y

        if (j % 2 == 0) {
          x = i * sunWidth - width / 2
          y = j * sunHeight / 2.5 - height / 2
        } else {
          x = i * sunWidth - width / 2 - sunWidth / 2
          y = j * sunHeight / 2.5 - height / 2
        }

        // let color = lerpColor(colorA, colorB, ((j + time / 10) % rows)/rows)
        let color = Color.lerp(colorA, colorB, j / rows)
        // let color = p.lerpColor(colorA, colorB, j / rows)
        p.fill(color.toP5(p))
        p.ellipse(x, y, sunWidth, sunHeight, 50)
      }
    }

    clouds.forEach(cloud => {
      cloud.render(p)
      cloud.step()
    })

    time += 1
  }
})

class Cloud {
  constructor() {
    this.x = 0
    this.y = 0
    this.speed = Utils.random(10) / 10
  }

  render(p) {
    let width = 100
    let { x, y } = this

    p.fill(255, 255, 255, 255 / 2)
    p.ellipse(x - 30, y, 35)
    p.ellipse(x, y, 50)
    p.ellipse(x + 25, y, 30)
  }

  step() {
    this.x += this.speed
  }
}