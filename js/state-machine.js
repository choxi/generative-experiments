import * as THREE from 'three'

class Renderable {
  constructor() {
    this.children = []
    this.type = "sphere"
  }

  add(renderable) {
    this.children.push(renderable)
  }
}

class Render {
  constructor() {
    this.children = []
  }
}

class Sketch {
  constructor(config) {
    this.draw = config.draw
    this.state = config.init()
    this.renders = []

    const fov = 45
    const aspect = 2
    const near = 0.1
    const far = 100

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(0, 0, 2)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setAnimationLoop(() => this.loop())
    document.body.appendChild(this.renderer.domElement)
  }

  loop() {
    this.state = this.draw(this.state)
    this.render()
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    const { state } = this

    state.children.forEach(child => {
      const geometry = new THREE.SphereGeometry(0.1, 10, 10)
      const white = new THREE.MeshBasicMaterial({ color: "#FFFFFF" })
      const mesh = new THREE.Mesh(geometry, white)
      this.scene.add(mesh)
    })
  }
}

document.addEventListener("DOMContentLoaded", event => {
  const sketch = new Sketch({
    init: () => {
      return new Renderable()
    },

    draw: (state) => {
      state.add(new Renderable())
      return state
    }
  })
})