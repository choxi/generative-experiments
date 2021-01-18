console.log("Starting sunrises")

// Auto-reload the page
// setInterval(() => { location.reload() }, 10000)

var width
var height
var bubbles = {}
var bubbleSources = []
var clouds = []
var time = 0

function setup() {
  width = window.innerWidth
  height = window.innerHeight

  frameRate(30)
  createCanvas(width, height, WEBGL)

  background(0)
  noStroke()
  for(let i = 0; i < 10; i++) {
    clouds.push(new Cloud())
  }
}

function draw() {
  let sunWidth = 200
  let sunHeight = 200
  // let colorB = color(230, 126, 34)
  // let colorA = color(241, 196, 15)
  let colorB = color(52, 152, 219)
  let colorA = color(31, 118, 175)
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
      let color = lerpColor(colorA, colorB, j / rows)
      fill(color)
      ellipse(x, y, sunWidth, sunHeight, 50)
    }
  }

  clouds.forEach(cloud => {
    cloud.render()
    cloud.step()
  })

  time += 1
}

class Cloud {
  constructor() {
    this.x = random(-width / 2, width / 2)
    this.y = random(-height / 2, height / 2)
    this.speed = random(10) / 10
  }

  render() {
    let width = 100
    let { x, y } = this

    fill(255, 255, 255, 255 / 2)
    ellipse(x - 30, y, 35)
    ellipse(x, y, 50)
    ellipse(x + 25, y, 30)
  }

  step() {
    this.x += this.speed
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