export default class Utils {
  static random(range, endRange=-1) {
    if (endRange == -1) {
      endRange = range
      range = 0
    }

    return Math.floor(Math.random() * endRange) + range
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