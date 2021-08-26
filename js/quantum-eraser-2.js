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

const loader = new GLTFLoader()
import sceneURL from "url:../models/quantum-eraser.glb"
import photonURL from "url:../models/photon-wave.glb"

class Sketch {
  constructor(width, height) {
    loader.load(sceneURL,
                (sceneSrc) => {
                  loader.load(photonURL,
                              (photonSrc) => {
                                photonSrc.scene.scale.multiplyScalar(0.1)
                                this.render(sceneSrc.scene, photonSrc.scene.getObjectByName("Torus002"))
                              },
                              xhr => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
                              error => console.log(error))
                },
                xhr => console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ),
                error => console.log(error))

  }

  render(sceneModel, photon) {
    //   gltf.scene.traverse(geo => {
    //     geo.material = new THREE.MeshLambertMaterial({ color: "#0000FF" })
    //   })

    //   gltf.scene.scale.multiplyScalar(0.5)
    const emitter = sceneModel.getObjectByName("Slits")
    this.emitters = [ new Emitter(-10, 0, 10, photon) ]
    this.emitters[0].source.mesh.position.x = emitter.position.x
    this.emitters[0].source.mesh.position.y = emitter.position.y
    this.emitters[0].source.mesh.position.z = emitter.position.z
    this.sceneModel = sceneModel
    this.screen = sceneModel.getObjectByName("Screen")
    this.cone = sceneModel.getObjectByName("Cone")

    const fov = 45
    const aspect = 2
    const near = 0.1
    const far = 100

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(25, 25, 25)
    this.camera.lookAt(0, 0, 0)
    // this.camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -100, 1000 )
    // this.camera.position.set(1, 1, 1)
    // this.camera.zoom = 50
    // this.camera.updateProjectionMatrix()
    // this.camera.lookAt(0, 0, 0)

    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    this.glow = new Box(2, 2, 2)

    // this.emitter = new Box(0.1, 0.1, 0.1)
    // this.photons = []

    // this.line.rotation.x = 0.25
    // this.line.rotation.y = -0.5
    // this.scene.add(this.emitter.mesh)

    // const skyColor = 0xB1E1FF  // light blue
    // const groundColor = 0xB97A20  // brownish orange
    // const intensity = 1
    // const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    // const light = new THREE.AmbientLight( 0xFFFFFF )
    const light = new THREE.DirectionalLight(0xffffff, 2)
    light.position.set(100, 50, 100)
    // light.position.set(0, 100, 0)
    // light.lookAt(0, 0, 0)
    // const light = new THREE.SpotLight(0xffffff)
    // light.position.set(100, 1000, 100)
    // light.lookAt(0, 0, 0)
    // this.scene.add(light)

    // const light2 = new THREE.SpotLight(0xffffff)
    // light2.position.set(50, -100, -10)
    // this.scene.add(light2)
    this.scene.add(light)
    this.scene.add(this.sceneModel)
    this.scene.add(this.glow.mesh)

    let godraysEffect = new GodRaysEffect(this.camera, this.glow.mesh, {
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

    // Setup Objects
    this.emitters.forEach(e => this.scene.add(e.group))
    // this.screen = new Box(0.1, 1, 2, "#FFFFFF")
    // this.screen.mesh.position.x = 2
    // this.scene.add(this.screen.mesh)

    // this.floor = new Box(4, 0.1, 4, "#FFFFFF")
    // this.floor.mesh.position.y = -0.5
    // this.scene.add(this.floor.mesh)
    this.renderer.setAnimationLoop((time) => this.loop(time))
  }

  loop() {
    this.frame += 1
    this.emitters.forEach(emitter => emitter.render(this.frame))

    // if (this.frame % 100 === 0) {
    //   const photon = new Sphere(0.05, "#f1c40f")
    //   this.photons.push(photon)
    //   this.scene.add(photon.mesh)
    // }

    // this.photons.forEach(photon => {
    //   photon.move(0.01)
    // })

    const speed = 0.005

    this.controls.update()
    this.composer.render()
    // this.renderer.render(this.scene, this.camera)
  }
}

class Object {
  move(x, y=0, z=0) {
    this.mesh.position.x += x
    this.mesh.position.y += y
    this.mesh.position.z += z
  }
}

class Emitter {
  constructor(x=0, y=0, z=0, photon) {
    this.group = new THREE.Group()
    this.source = new Box(0.1, 0.1, 0.1)
    this.source.mesh.position.x = x
    this.source.mesh.position.y = y
    this.source.mesh.position.z = z
    this.group.add(this.source.mesh)
    this.photon = photon
    this.photons = []
  }

  render(time) {
    if (time % 50 === 0) {
      // const p = new Sphere(0.05, "#f1c40f")
      const p = this.photon.clone()
      // p.material = p.material.clone()
      p.material = new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
      p.material.renderOrder = 1
      p.position.x = this.source.mesh.position.x
      p.position.y = this.source.mesh.position.y
      p.position.z = this.source.mesh.position.z
      p.scale.multiplyScalar(0.05)
      p.rotateX(Math.PI / 2)
      this.photons.push(p)
      this.group.add(p)
    }

    if (this.photons.length > 100) {
      this.photons.shift()
    }

    this.photons.forEach(photon => {
      // if (this.screen && photon.position.z > screen.position.z) {
      //   photon.position.z -= 0.01
      //   photon.scale.multiplyScalar(1.002)
      //   photon.material.opacity *= 0.999
      //   photon.material.transparent = true
      // } else {
      //     scene.remove(photon)
      // }
    })
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
    this.material.opacity = 1;
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
})