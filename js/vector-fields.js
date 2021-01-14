console.log("Starting vector-fields")

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class VectorGrid {
  constructor(width, height) {
    let rows = 10
    let columns = 10
    let velocityRange = 2
    this.dimensions = { width: width, height: height }

    this.grid = []
    for(let r = 0; r < rows; r++) {
      let row = []

      for(let c = 0; c < columns; c++) {
        row.push(new Vector(random(-velocityRange, velocityRange), random(-velocityRange, velocityRange)))
      }

      this.grid.push(row)
    }
  }

  vectorAt(x, y) {
    let rows = this.grid.length
    let columns = this.grid[0].length
    let cellWidth = this.dimensions.width / columns
    let cellHeight = this.dimensions.height / rows
    let normX = x + this.dimensions.width / 2
    let normY = y + this.dimensions.height / 2

    var col = Math.floor(normX / cellWidth)
    var row = Math.floor(normY / cellHeight)

    if (row >= rows) {
      row = rows - 1
    }

    if (col >= columns) {
      col = columns - 1
    }

    try {
      let vector = this.grid[row][col]
      return vector
    } catch(error) {
      debugger
      console.log(`Grid index out of bounds: (${x},${y}) - (${normX}, ${normY}) - (${col},${row})`)
    }
  }

  render() {
    let rows = this.grid.length
    let columns = this.grid[0].length

    let cellWidth = this.dimensions.width / columns
    let cellHeight = this.dimensions.height / rows

    fill(color(0, 255, 0))

    for(let r = 0; r < this.grid.length; r++) {
      for(let c = 0; c < this.grid[0].length; c++) {
        let x = c*cellWidth - this.dimensions.width / 2
        let y = r*cellHeight - this.dimensions.height / 2

        rect(x, y, cellWidth, cellHeight)
        let vector = this.grid[r][c]
        let endX = x + vector.x / 2 + cellWidth / 2
        let endY = y + vector.y / 2 + cellHeight / 2
        line(x - vector.x / 2 + cellWidth / 2, y - vector.y / 2 + cellHeight / 2, endX, endY)
        ellipse(endX, endY, 10)
      }
    }
  }
}

var vectors
window.vectors = vectors
var particles = []
var static = []

class Particle {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
    this.size = 10
    this.velocity = new Vector(0, 0)
    // this.color = color(random(255), random(255), random(255), random(150, 255))
    this.color = color(0, 0, random(255), random(150, 255))
  }

  render() {
    fill(this.color)
    ellipse(this.x, this.y, this.size)
  }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  background(255);
  vectors = new VectorGrid(window.innerWidth, window.innerHeight)
  frameRate(30)
  noStroke()

  for(let i = 0; i < 1; i++) {
    let particle = new Particle()
    particle.x = random(- window.innerWidth / 2, window.innerWidth / 2)
    particle.y = random(- window.innerHeight /2, window.innerHeight / 2)
    particles.push(particle)
  }
}

function draw() {
  // vectors.render()
  particles.forEach(particle => {
    let vector = vectors.vectorAt(particle.x, particle.y)
    particle.velocity.x += vector.x
    particle.velocity.y += vector.y
    particle.x += particle.velocity.x
    particle.y += particle.velocity.y
    let xRange = window.innerWidth / 2
    let yRange = window.innerHeight / 2

    if (particle.x < -xRange || particle.x > xRange) {
      particle.x -= particle.velocity.x
      particle.velocity.x = -particle.velocity.x
    }

    if (particle.y < -yRange || particle.y > yRange) {
      particle.y -= particle.velocity.y
      particle.velocity.y = -particle.velocity.y
    }

    particle.render()

    let copy = new Particle()
    copy.x = particle.x
    copy.y = particle.y
    copy.color = particle.color
    static.push(copy)

    if (static.length > 20) {
      static.shift()
    }
  })

  static.forEach(particle => particle.render())
  // particles.push(new Particle())
}