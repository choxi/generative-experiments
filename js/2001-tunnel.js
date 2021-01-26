console.log("starting 2001-tunnel")

import p5 from "p5"
import Snake from "./renderables/snake"
import Vector from "./math/vector"

let app = new p5(p => {
  let width = window.innerWidth
  let height = window.innerHeight
  let planeWidth = width * 2
  let planeHeight = height * 1.5
  let tilt = Math.PI / 2 - 0.1
  let blue = p.color(95, 212, 230)
  let white = p.color(239, 233, 234)
  let snake = new Snake([new Vector(50, -50), new Vector(100, -100)])

  p.setup = () => {
    p.createCanvas(width, height, p.WEBGL)
  }

  p.draw = () => {
    p.background(0)
    p.noStroke()

    // Sunrise
    p.push()
    p.translate(0, 100, - planeHeight / 2)
    p.ellipse(0, 0, 300, 300, 40)
    p.pop()

    snake.render(p)

    // Plane
    p.translate(0, 100, 0)

    p.push()
    p.fill(255, 0, 0)
    p.rotateX(tilt)
    p.plane(planeWidth, planeHeight)
    p.pop()

    let cellWidth = 20
    let cellHeight = 20
    let columns = planeWidth / cellWidth
    let rows = planeHeight / cellHeight

    // for(let r=0; r < rows; r++) {
    //   for(let c=0; c < columns; c++) {
    //     let x = c*cellWidth
    //     let y = r*cellHeight
    //     p.push()
    //     p.fill(p.lerpColor(blue, white, p.random(1, 10) / 10))
    //     p.rotateX(tilt)
    //     p.translate(- planeWidth / 2 + x + cellWidth/ 2, - planeHeight / 2 + y + cellHeight / 2, 1)
    //     p.plane(cellWidth, cellHeight)
    //     p.pop()
    //   }
    // }
  }
})

function renderPlane(p) {

}