import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

const BLOOM_PARAMS = {
  exposure: 1,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0
}

const loader = new GLTFLoader()
import modelURL from "url:../models/double-slit.glb"
import photonURL from "url:../models/photon-wave.glb"
let photon

class Sketch {
  constructor() {
    const fov = 45
    const aspect = 2
    const near = 0.1
    const far = 100

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(0, 0, 5)
    this.camera.lookAt(0, 0, 0)
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setAnimationLoop((time) => this.loop(time))
    document.body.appendChild(this.renderer.domElement)

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
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(-100, 50, 100)
    // light.lookAt(0, 0, 0)
    // const light = new THREE.SpotLight(0xffffff)
    // light.position.set(100, 1000, 100)
    // light.lookAt(0, 0, 0)
    // this.scene.add(light)

    // const light2 = new THREE.SpotLight(0xffffff)
    // light2.position.set(50, -100, -10)
    // this.scene.add(light2)
    this.scene.add(light)

    const renderPass = new RenderPass(this.scene, this.camera)

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
    bloomPass.threshold = BLOOM_PARAMS.bloomThreshold
    bloomPass.strength = BLOOM_PARAMS.bloomStrength
    bloomPass.radius = BLOOM_PARAMS.bloomRadius

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(renderPass)
    // this.composer.addPass(bloomPass)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.frame = 0

    // Setup Objects
    this.emitters = [ new Emitter(-1, 0, -1), new Emitter(-1, 0, 0) ]
    this.emitters.forEach(e => this.scene.add(e.group))
    this.screen = new Box(0.1, 1, 2, "#FFFFFF")
    this.screen.mesh.position.x = 2
    this.scene.add(this.screen.mesh)

    this.floor = new Box(4, 0.1, 4, "#FFFFFF")
    this.floor.mesh.position.y = -0.5
    this.scene.add(this.floor.mesh)
    
    loader.load(modelURL, 
                (gltf) => {
                  gltf.scene.traverse(geo => { 
                    geo.material = new THREE.MeshLambertMaterial({ color: "#0000FF" })
                  })

                  gltf.scene.scale.multiplyScalar(0.5)
                  this.scene.add( gltf.scene )

                  gltf.animations; // Array<THREE.AnimationClip>
                  gltf.scene; // THREE.Group
                  gltf.scenes; // Array<THREE.Group>
                  gltf.cameras; // Array<THREE.Camera>
                  gltf.asset; // Object
                },
                // called while loading is progressing
                function ( xhr ) {
                  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                // called when loading has errors
                function (error) {
                  console.log(error)
                  console.log( 'An error happened' );
                })

    loader.load(photonURL, 
                (gltf) => {
                  gltf.scene.scale.multiplyScalar(0.1)
                  photon = gltf.scene.getObjectByName("Torus002")
                  // this.scene.add(this.photon)
                },
                // called while loading is progressing
                function ( xhr ) {
                  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                },
                // called when loading has errors
                function (error) {
                  console.log(error)
                  console.log( 'An error happened' );
                })
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
  constructor(x=0, y=0, z=0) {
    this.group = new THREE.Group()
    this.source = new Box(0.1, 0.1, 0.1)
    this.source.mesh.position.x = x
    this.source.mesh.position.y = y
    this.source.mesh.position.z = z
    this.group.add(this.source.mesh)
    this.photons = []
  }

  render(time) {
    if (time % 40 === 0 && photon) {
      // const p = new Sphere(0.05, "#f1c40f")
      const p = photon.clone()
      // p.material = p.material.clone()
      p.material = new THREE.MeshStandardMaterial({ color: "#FFFFFF" })
      p.material.renderOrder = 1
      p.position.x = this.source.mesh.position.x
      p.position.y = this.source.mesh.position.y
      p.position.z = this.source.mesh.position.z
      p.scale.multiplyScalar(0.05)
      p.rotateZ(Math.PI / 2)
      this.photons.push(p)
      this.group.add(p)
    }

    if (this.photons.length > 10) {
      this.photons.shift()
    }

    this.photons.forEach(photon => {
      photon.position.x += 0.01
      photon.scale.multiplyScalar(1.005)
      photon.material.opacity *= 0.99
      photon.material.transparent = true
    })
  }
}

class Box extends Object {
  constructor(width, height, depth, color="#FFFFFF") {
    super()
    this.geometry = new THREE.BoxGeometry(width, height, depth)
    this.material = new THREE.MeshStandardMaterial({ color: color, wireframe: false })
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
  const sketch = new Sketch()
})