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
    this.x = 0
    this.y = 0
    this.velocity = new Vector(0, 0)
    this.color = color(255, 0, 0)
    this.fixed = false
  }

  step() {
    if (this.fixed) {
      return
    }

    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  render() {
    let { x, y, color } = this
    fill(color)
    ellipse(x, y, this.radius() * 2)
  }

  applyForceFrom(otherPlanet) {
    if(this.fixed) {
      return
    }

    let scale = 1000

    let { x, y, mass, velocity } = this
    let vector = new Vector((otherPlanet.x - x)*scale, (otherPlanet.y - y)*scale)
    let distance = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2))
    let force = otherPlanet.mass * mass / Math.pow(distance, 2)
    let acceleration = force / mass
    let newVelocity = new Vector(velocity.x + acceleration * vector.x, velocity.y + acceleration * vector.y)
    this.velocity = newVelocity

    console.log(`force: ${force}`)
    console.log(`velocity: (${newVelocity.x},${newVelocity.y})`)
  }

  radius() {
    return Math.sqrt(this.mass) / 5
  }
}

function randomPlanet() {
  let planet = new Planet()
  planet.velocity = new Vector(random(-10, 10) / 10, random(-10, 10) / 10)
  planet.x = random(- window.innerWidth / 2, window.innerWidth / 2)
  planet.y = random(- window.innerHeight / 2, window.innerHeight / 2)
  planet.mass = random(200, 500)
  planet.color = color(random(255), random(255), random(255))
  return planet
}

var planets = {}
var root

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  background(0);
  frameRate(10)
  noStroke()

  let planet = new Planet()
  planet.mass = 4000
  planet.fixed = true
  planets[planet.id] = planet

  let planetB = new Planet()
  planetB.velocity = new Vector(1, 0)
  planetB.x = -100
  planetB.y = -200
  planetB.mass = 400
  planetB.color = color(0, 255, 0)
  planets[planetB.id] = planetB

  let planetC = new Planet()
  planetC.velocity = new Vector(0.1, 1)
  planetC.x = 400
  planetC.y = -200
  planetC.mass = 300
  planetC.color = color(0, 0, 255)
  planets[planetC.id] = planetC

  for(let i = 0; i < 100; i++) {
    let planet = randomPlanet()
    planets[planet.id] = planet
  }
}

function draw() {
  background(0)

  var toDelete = []
  Object.keys(planets).forEach(id => {
    let planet = planets[id]
    planet.render()

    Object.keys(planets).forEach(otherID => {
      if (otherID != id) {
        let otherPlanet = planets[otherID]
        planet.applyForceFrom(otherPlanet)

        let biggerPlanet = planet.radius() > otherPlanet.radius() ? planet : otherPlanet
        let smallerPlanet = planet.radius() < otherPlanet.radius() ? planet : otherPlanet
        let collisionRadius = biggerPlanet.radius()
        if (Math.abs(planet.x - otherPlanet.x) < collisionRadius &&
            Math.abs(planet.y - otherPlanet.y) < collisionRadius) {
          biggerPlanet.mass += smallerPlanet.mass
          toDelete.push(smallerPlanet)
        }
      }
    })

    planet.step()
  })

  toDelete.forEach(planet => delete planets[planet.id])

  // F = GMm / r^2
  // F = ma
}