import * as THREE from 'three'

class Sketch {
  constructor(config) {
    this.state = config.init()
    this.draw = config.draw
    this.loop()
  }

  loop() {
    requestAnimationFrame(() => {
      this.state = this.draw(this.state)
      this.loop()
    })
  }
}

const sketch = new Sketch({
  init: () => {
    return {}
  },

  draw: (state) => {
    // console.log(`state: ${ state }`)
  }
})