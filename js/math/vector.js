export default class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
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
    let { x, y } = this
    return Math.sqrt(x*x + y*y)
  }

  unit() {
    return this.multiply(1 / this.magnitude())
  }
}