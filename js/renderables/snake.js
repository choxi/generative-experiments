import Vector from "../math/vector"

export default class Snake {
  constructor(vectors) {
    this.root = new Waypoint()
    this.orbs = []
    this.orbCount = 100

    this.root.location = vectors[0]
    var current = this.root

    vectors.slice(1).forEach(vector => {
      let waypoint = new Waypoint()
      waypoint.location = vector
      current.addNext(waypoint)
      current = waypoint
    })

    let orb = new Orb(this.root)
    orb.location = this.root.location
    this.orbs.push(orb)
  }

  render(buffer) {
    this.orbs.forEach(orb => {
      orb.render(buffer)
      orb.step()
    })

    if (this.orbs.length < this.orbCount) {
      let orb = new Orb(this.root)
      orb.location = this.root.location
      this.orbs.push(orb)
    }
  }
}

class Waypoint {
  constructor() {
    this.location = new Vector(0, 0)
    this.next = null
  }

  addNext(waypoint) {
    this.next = waypoint
  }
}

class Orb {
  constructor(waypoint) {
    this.location = new Vector(0, 0)
    this.waypoint = waypoint
    // this.size = Utils.random(5,20)
    this.size = 10
  }

  render(buffer) {
    let { x, y } = this.location
    let { size } = this
    // let color = buffer.color(255, 0, 255)
    let color = buffer.color(95, 212, 230)

    buffer.noStroke()
    buffer.fill(color)
    buffer.ellipse(x, y, size, size, 40)
  }

  step() {
    let { location, waypoint }  = this
    let speed = 1
    let delta = waypoint.location.subtract(location)

    if (delta.magnitude() >= speed) {
      let move = delta.unit().multiply(speed)
      let newLocation = location.add(move)
      this.location = newLocation
    } else {
      if (waypoint.next != null) {
        let distanceAfterNextWaypoint = speed - delta.magnitude()
        let newDelta = waypoint.next.location.subtract(waypoint.location).unit().multiply(distanceAfterNextWaypoint)
        this.location = waypoint.location.add(newDelta)
        this.waypoint = waypoint.next
      } else {
        this.location = waypoint.location
      }
    }
  }
}
