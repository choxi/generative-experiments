class Color {
  constructor(r, g, b, a=255) {
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }

  toP5(p) {
    return p.color(this.r, this.g, this.b, this.a)
  }

  alpha(newAlpha) {
    return new Color(this.r, this.g, this.b, newAlpha)
  }

  static lerp(colorA, colorB, weight) {
    let newR = weight * colorA.r + (1 - weight) * colorB.r
    let newG = weight * colorA.g + (1 - weight) * colorB.g
    let newB = weight * colorA.b + (1 - weight) * colorB.b
    let newA = weight * colorA.a + (1 - weight) * colorB.a

    return new Color(newR, newG, newB, newA)
  }
}

Color.palettes = {
  tron: {
    blue: new Color(95, 212, 230),
    white: new Color(239, 233, 234)
  }
}

export default Color