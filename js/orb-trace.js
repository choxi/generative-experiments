console.log("starting orb-trace")

import p5 from "p5"
import Vector from "./math/vector"
import Utils from "./utils"

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
    let color = buffer.color(255, 0, 255)

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

    // if (newLocation.subtract(waypoint.location).magnitude() < 5 && waypoint.next != null) {
    //   this.waypoint = waypoint.next
    //   this.location = waypoint.location
    // }
  }
}

let app = new p5(p => {
  let waypointA = new Waypoint()
  waypointA.location = new Vector(50, 50)
  let waypointB = new Waypoint()
  waypointB.location = new Vector(50, -50)
  waypointA.addNext(waypointB)
  let waypointC = new Waypoint()
  waypointC.location = new Vector(100, -50)
  waypointB.addNext(waypointC)

  let orbs = []
  let width = window.innerWidth
  let height = window.innerHeight

  p.setup = () => {
    console.log("setup")

    p.createCanvas(width, height, p.WEBGL)
    let startPoint = new Vector(0, 0)
    let startVector = waypointA.location.subtract(startPoint).unit()

    for(let i = 0; i < 100; i++) {
      let orb = new Orb(waypointA)
      orb.location = startVector.multiply(-(i + 1))
      orbs.push(orb)
    }
  }

  var frame = 0
  p.draw = () => {
    // if (frame == 12) {
    //   return
    // }

    p.background(0)

    orbs.forEach(orb => {
      orb.render(p)
      orb.step()
    })

    frame++
  }
})