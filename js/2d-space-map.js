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

    // console.log(`force: ${force}`)
    // console.log(`velocity: (${newVelocity.x},${newVelocity.y})`)
  }

  radius() {
    return Math.sqrt(this.mass) / 50
  }
}

function randomPlanet() {
  let planet = new Planet()
  let range = 200
  planet.velocity = new Vector(random(-range, range) / 10, random(-range, range) / 10)
  planet.x = random(- window.innerWidth / 2, window.innerWidth / 2)
  planet.y = random(- window.innerHeight / 2, window.innerHeight / 2)
  // let rangeB = 100
  // planet.x = random(-rangeB, rangeB)
  // planet.y = random(-rangeB, rangeB)
  planet.mass = random(200, 2000)
  planet.color = color(random(255), random(255), random(255))
  return planet
}

var planets = {}
var root

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  background(0);
  frameRate(20)
  noStroke()

  // let planet = new Planet()
  // planet.mass = 4000
  // // planet.fixed = true
  // planets[planet.id] = planet

  for(let i = 0; i < 1000; i++) {
    let planet = randomPlanet()
    planets[planet.id] = planet
  }
}

// Updates planet mass and returns planet to delete
function collide(planetA, planetB) {
  let biggerPlanet = planetA.radius() > planetB.radius() ? planetA : planetB
  let smallerPlanet = planetA.radius() < planetB.radius() ? planetA : planetB
  let collisionRadius = biggerPlanet.radius()
  if (Math.abs(planetA.x - planetB.x) < collisionRadius &&
      Math.abs(planetA.y - planetB.y) < collisionRadius) {
    biggerPlanet.mass += smallerPlanet.mass
    return smallerPlanet
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

        let destroyed = collide(planet, otherPlanet)
        if (destroyed != null) {
          toDelete.push(destroyed)
        }
      }
    })

    planet.step()
  })

  toDelete.forEach(planet => delete planets[planet.id])

  // F = GMm / r^2
  // F = ma
}