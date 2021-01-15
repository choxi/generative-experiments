console.log("Starting sunrises")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width = window.innerWidth
var height = window.innerHeight
var bubbles = {}
var bubbleSources = []

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(30)
  createCanvas(width, height, WEBGL)

  background(0)
  noStroke()

  let sunWidth = 150
  let sunHeight = 150
  let colorA = color(230, 126, 34)
  let colorB = color(241, 196, 15)

  for(let j = 0; j < 20; j++) {
    for(let i = 0; i < 10; i++) {
      var x, y

      if (j % 2 == 0) {
        x = i * sunWidth - width / 2
        y = j * sunHeight / 2.5 - height / 2
      } else {
        x = i * sunWidth - width / 2 - sunWidth / 2
        y = j * sunHeight / 2.5 - height / 2
      }

      if (j % 2 == 0) {
        fill(colorA)
      } else {
        fill(colorB)
      }

      ellipse(x, y, sunWidth, sunHeight, 50)
    }
  }
}

class Bubble {
  constructor() {
    this.id = uuidv4()
    this.x = random(width) -  width / 2
    this.y = random(height) - height / 2
    this.originX = this.x
    this.originY = this.y
    this.speed = random(10) + 1
    this.size = random(10) + 50
    this.color = color(random(255), random(255), random(255), 100)
  }
}