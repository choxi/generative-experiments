import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// https://redstapler.co/godrays-three-js-post-processing-tutorial/
import { RenderPass, EffectPass, GodRaysEffect, EffectComposer } from "postprocessing"

const BLOOM_PARAMS = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0
}

class Sketch {
  render() {
    const fov = 45
    const aspect = 2
    const near = 0.1
    const far = 100

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(25, 25, 25)
    this.camera.lookAt(0, 0, 0)

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    this.glow = new Box(2, 2, 2)

    const light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(100, 50, 100)

    const pointsMaterial = new THREE.PointsMaterial({ color: 0xffffcc })
    const pointsGeometry = new THREE.BufferGeometry()

    const vertices = []
    for(let i = 0; i < 1000; i++) {
      const x = (Math.random() * 100) - 50;
      const y = (Math.random() * 100) - 50;
      const z = (Math.random() * 100) - 50;

      vertices.push(x, y, z);
    }
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    this.scene.add(points)

    this.scene.add(light)
    this.scene.add(this.glow.mesh)

    let godraysEffect = new GodRaysEffect(this.camera, points, {
      resolutionScale: 1,
      density: 1.8,
      decay: 0.95,
      weight: 0.9,
      samples: 100,
    })

    let postRenderPass = new RenderPass(this.scene, this.camera)
    let postEffectPass = new EffectPass(this.camera, godraysEffect)
    postEffectPass.renderToScreen = true

    // const renderPass = new RenderPass(this.scene, this.camera)

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
    bloomPass.strength = BLOOM_PARAMS.bloomStrength
    bloomPass.radius = BLOOM_PARAMS.bloomRadius

    this.composer = new EffectComposer(this.renderer, { multisampling: 0 })
    this.composer.addPass(postRenderPass)
    // this.composer.addPass(postRenderPass)
    this.composer.addPass(postEffectPass)
    // this.composer.addPass(bloomPass)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.frame = 0

    this.renderer.setAnimationLoop((time) => this.loop(time))
  }

  loop() {
    this.frame += 1
    this.controls.update()
    this.composer.render()
  }
}

class Object {
  move(x, y=0, z=0) {
    this.mesh.position.x += x
    this.mesh.position.y += y
    this.mesh.position.z += z
  }
}

class Box extends Object {
  constructor(width, height, depth, color="#FFFFFF") {
    super()
    this.geometry = new THREE.SphereGeometry(width)
    // this.geometry = new THREE.BoxGeometry(width, height, depth)
    // this.material = new THREE.MeshStandardMaterial({ color: color, wireframe: false })
    this.material = new THREE.MeshBasicMaterial({
			color: 0xffddaa,
			transparent: true,
            opacity: 1,
			fog: false
		});
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
}

class Sphere extends Object {
  constructor(radius, color="#FFFFFF") {
    super()
    this.geometry = new THREE.SphereGeometry(radius)
    this.material = new THREE.MeshStandardMaterial({ color: color, wireframe: false })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }
}

document.addEventListener("DOMContentLoaded", event => {
  const sketch = new Sketch(window.innerWidth, window.innerHeight)
  sketch.render()
})