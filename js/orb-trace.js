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

class Chain {
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

function fromCenter(center, distance, theta) {
  let point = new Vector(distance, 0).rotate(theta)
  return center.add(point)
}

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let blue = p.color(95, 212, 230)
  let circleCenter =  new Vector(0, height / 4 + 80)
  let ccFrame = circleCenter.multiply(-1)
  let circleRadius = 200
  let offset = circleRadius + 10
  let length = 100

  let chainA = new Chain([ fromCenter(circleCenter, offset, -Math.PI / 2), fromCenter(circleCenter, offset + length, -Math.PI / 2) ])
  let chainB = new Chain([ fromCenter(circleCenter, offset, -Math.PI / 4), fromCenter(circleCenter, offset + length, -Math.PI / 4) ])
  let chainC = new Chain([ fromCenter(circleCenter, offset, -Math.PI / 8), fromCenter(circleCenter, offset + length, -Math.PI / 8) ])
  let chainD = new Chain([ fromCenter(circleCenter, offset, - 3 * Math.PI / 8), fromCenter(circleCenter, offset + length, -3 * Math.PI / 8) ])

  let chainE = new Chain([ fromCenter(circleCenter, offset, - 5 * Math.PI / 8), fromCenter(circleCenter, offset + length, -5 * Math.PI / 8) ])
  let chainF = new Chain([ fromCenter(circleCenter, offset, - 6 * Math.PI / 8), fromCenter(circleCenter, offset + length, -6 * Math.PI / 8) ])
  let chainG = new Chain([ fromCenter(circleCenter, offset, - 7 * Math.PI / 8), fromCenter(circleCenter, offset + length, -7 * Math.PI / 8) ])
  let chains = [chainA, chainB, chainC, chainD, chainE, chainF, chainG]

  p.setup = () => {
    console.log("setup")
    p.createCanvas(width, height, p.WEBGL)
  }

  var frame = 0
  p.draw = () => {
    // if (frame == 12) {
    //   return
    // }

    p.background(0)
    p.fill(blue)
    p.rect(- width / 2, height / 4, width, height / 4)
    p.ellipse(circleCenter.x, circleCenter.y, circleRadius * 2, circleRadius * 2, 50)
    chains.forEach(chain => chain.render(p))

    frame++
  }
})