import Victor from "victor"

export default class Vector {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z

    if (z === undefined) {
      this.z = 0
    }
  }

  xAngle() {
    let v = new Victor(this.z, this.y)
    return v.angle()
  }

  yAngle() {
    let v = new Victor(this.z, this.x)
    return v.angle()
  }

  add(otherVector) {
    let newX = this.x + otherVector.x
    let newY = this.y + otherVector.y

    return new Vector(newX, newY)
  }

  subtract(otherVector) {
    let newX = this.x - otherVector.x
    let newY = this.y - otherVector.y

    return new Vector(newX, newY)
  }

  multiply(factor) {
    let newX = this.x * factor
    let newY = this.y * factor

    return new Vector(newX, newY)
  }

  magnitude() {
    let { x, y, z } = this
    return Math.sqrt(x*x + y*y + z*z)
  }

  rotate(theta) {
    let v = new Victor(this.x, this.y)
    v.rotate(theta)
    return new Vector(v.x, v.y)
  }

  unit() {
    let magnitude = this.magnitude()

    if (magnitude === 0) {
      return new Vector(0, 0)
    }

    return this.multiply(1 / magnitude)
  }

  equals(otherVector) {
    return this.x === otherVector.x && this.y === otherVector.y
  }
}