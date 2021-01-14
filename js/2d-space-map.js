console.log("Starting 2d-space-map")

class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Planet {
  constructor() {
    this.id = uuidv4()
    this.mass = 10
    this.radius = 10
    this.x = 0
    this.y = 0
    this.velocity = new Vector(0, 0)
    this.color = color(255, 0, 0)
    this.fixed = false
  }

  step() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  render() {
    let { x, y, radius, color } = this
    fill(color)
    ellipse(x, y, radius * 2)
  }

  applyForceFrom(otherPlanet) {
    if(this.fixed) {
      return
    }

    let { x, y, mass, velocity } = this
    let vector = new Vector(otherPlanet.x - x, otherPlanet.y - y)
    let distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
    let force = otherPlanet.mass * mass / Math.pow(distance, 2)
    let acceleration = force / mass
    let newVelocity = new Vector(velocity.x + acceleration * vector.x, velocity.y + acceleration * vector.y)
    this.velocity = newVelocity

    console.log(`force: ${force}`)
    console.log(`velocity: (${newVelocity.x},${newVelocity.y})`)
  }
}

var planets = {}
var root

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  background(0);
  frameRate(60)
  noStroke()

  let planet = new Planet()
  planet.mass = 50
  planet.fixed = true
  planets[planet.id] = planet

  let planetB = new Planet()
  planetB.velocity = new Vector(3, 0)
  planetB.x = -100
  planetB.y = -200
  planetB.mass = 30
  planetB.color = color(0, 255, 0)
  planets[planetB.id] = planetB

  let planetC = new Planet()
  planetC.velocity = new Vector(0.1, 1)
  planetC.x = 400
  planetC.y = -200
  planetC.mass = 20
  planetC.color = color(0, 0, 255)
  planets[planetC.id] = planetC
}

function draw() {
  background(0)

  Object.keys(planets).forEach(id => {
    let planet = planets[id]
    planet.render()

    Object.keys(planets).forEach(otherID => {
      if (otherID != id) {
        let otherPlanet = planets[otherID]
        planet.applyForceFrom(otherPlanet)
      }
    })

    planet.step()
  })

  // F = GMm / r^2
  // F = ma
}