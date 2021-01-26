import Vector from "./math/vector"

const Y_AXIS = 1
const X_AXIS = 2

export default class Utils {
  static fromCenter(center, distance, theta) {
    let point = new Vector(distance, 0).rotate(theta)
    return center.add(point)
  }

  static random(range, endRange=-1) {
    if (endRange == -1) {
      endRange = range
      range = 0
    }

    let rangeWidth = endRange - range

    return Math.floor(Math.random() * rangeWidth) + range
  }
  static setGradient(p, x, y, w, h, c1, c2, axis) {
    p.noStroke()
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = p.map(i, y, y + h, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        p.fill(c);
        p.rect(x, i, w, 1);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = p.map(i, x, x + w, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        p.fill(c);
        p.rect(i, y, 1, h);
      }
    }
  }

  static drawGradient(x, y, colorA, colorB, radius) {
    for (let r = radius; r > 0; --r) {
      // let blended = blendColors(colorA, colorB, r / radius)
      let blended = lerpColor(colorA, colorB, r / radius)
      fill(blended);
      ellipse(x, y, r, r);
    }
  }

  static radialGradient(x, y, w, h, inner, outer) {
    noStroke();
    for (let i = Math.max(w, h); i > 0; i--) {
      const step = i / Math.max(w, h);
      const colour = lerpColor(inner, outer, step);
      fill(colour);
      ellipse(x, y, step * w, step * h);
    }
  }

  static toGPUCoordinate(x, y) {
    let height = window.innerHeight
    let width = window.innerWidth

    let centeredX = x - width / 2
    let centeredY = y - height / 2

    return { x: centeredX, y: centeredY }
  }
}

window.Utils = Utils