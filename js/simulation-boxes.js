import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Sketch {
  constructor() {
    const fov = 45
    const aspect = 2
    const near = 0.1
    const far = 100

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(-1, 0.25, 2)
    this.camera.lookAt(0, 0, 0)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setAnimationLoop((time) => this.loop(time))
    document.body.appendChild(this.renderer.domElement)

    const box = new THREE.BoxGeometry(0.1, 0.1, 0.1)
    const white = new THREE.MeshBasicMaterial({ color: "#FFFFFF", wireframe: true })
    this.mesh = new THREE.Mesh(box, white)
    const edges = new THREE.EdgesGeometry(box)
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: "#FFFFFF" }))
    line.position.z = line.scale.z * 0.1 / 2
    line.position.y = line.scale.y * 0.1 / 2
    line.position.x = line.scale.x * 0.1 / 2
    // this.line.rotation.x = 0.25
    // this.line.rotation.y = -0.5
    this.scene.add(line)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.boxes = [ line ]
    this.frame = 0
  }

  loop() {
    this.frame += 1

    const speed = 0.005

    this.boxes.forEach(box => {
      box.scale.x += speed
      box.scale.y += speed
      box.scale.z += speed
      box.position.z = box.scale.z * 0.1 / 2
      box.position.y = box.scale.y * 0.1 / 2
      box.position.x = box.scale.x * 0.1 / 2
      box.material.transparent = true
      box.material.opacity *= 0.999
    })

    if (this.frame % 400 === 0) {
      console.log("add box")
      const box = new THREE.BoxGeometry(0.1, 0.1, 0.1)
      const white = new THREE.MeshBasicMaterial({ color: "#FFFFFF", wireframe: true })
      const edges = new THREE.EdgesGeometry(box)
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: "#FFFFFF" }))
      line.position.z = line.scale.z * 0.1 / 2
      line.position.y = line.scale.y * 0.1 / 2
      line.position.x = line.scale.x * 0.1 / 2
      // this.line.rotation.x = 0.25
      // this.line.rotation.y = -0.5
      this.scene.add(line)
      this.boxes.push(line)
    }

    // this.line.position.y -= speed * 0.1
    // this.line.position.x -= speed
    // mesh.rotation.x = time / 2000;

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}

document.addEventListener("DOMContentLoaded", event => {
  const sketch = new Sketch()
})