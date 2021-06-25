import Utils from "../utils"

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

  static random(palette=Color.palettes.flat) {
    let keys = Object.keys(palette)
    let keyIndex = Utils.random(0, keys.length)
    let key = keys[keyIndex]

    return palette[key]
  }

  static lerp(colorA, colorB, weight) {
    let newR = weight * colorA.r + (1 - weight) * colorB.r
    let newG = weight * colorA.g + (1 - weight) * colorB.g
    let newB = weight * colorA.b + (1 - weight) * colorB.b
    let newA = weight * colorA.a + (1 - weight) * colorB.a

    return new Color(newR, newG, newB, newA)
  }
}

// From: https://flatuicolors.com/palette/defo
// Script:
//     let colors = {}
//     document.querySelectorAll(".color").forEach(c => {
//       colors[c.querySelectorAll("span")[0].innerText.toLowerCase()] = c.style.backgroundColor
//     })
//     colors

Color.palettes = {
  tron: {
    blue: new Color(95, 212, 230),
    white: new Color(239, 233, 234)
  },

  gray: {
    a: new Color(0, 0, 0),
    b: new Color(20, 20, 20),
    c: new Color(40, 40, 40),
    d: new Color(60, 60, 60),
    e: new Color(80, 80, 80),
    f: new Color(100, 100, 100),
    g: new Color(120, 120, 120),
    h: new Color(140, 140, 140),
    i: new Color(160, 160, 160),
    j: new Color(180, 180, 180)
  },

  flat: {
    alizarin: new Color(231, 76, 60),
    amethyst: new Color(155, 89, 182),
    asbestos: new Color(127, 140, 141),
    belizeHole: new Color(41, 128, 185),
    carrot: new Color(230, 126, 34),
    clouds: new Color(236, 240, 241),
    concrete: new Color(149, 165, 166),
    emerald: new Color(46, 204, 113),
    greenSea: new Color(22, 160, 133),
    midnightBlue: new Color(44, 62, 80),
    nephritis: new Color(39, 174, 96),
    orange: new Color(243, 156, 18),
    peterRiver: new Color(52, 152, 219),
    pomegranate: new Color(192, 57, 43),
    pumpkin: new Color(211, 84, 0),
    silver: new Color(189, 195, 199),
    sunFlower: new Color(241, 196, 15),
    turquoise: new Color(26, 188, 156),
    wetAsphalt: new Color(52, 73, 94),
    wisteria: new Color(142, 68, 173)
  }
}



export default Color