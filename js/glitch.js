import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'

import modelURL from "url:../models/old-spoon/source/spoon.obj"

let camera, scene, renderer
let spoon, composer

document.addEventListener("DOMContentLoaded", event => {
  init()
})

function init() {
  const fov = 45
  const aspect = 2
  const near = 0.1
  const far = 100

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 00, 20)
	scene = new THREE.Scene()

  const skyColor = 0xB1E1FF  // light blue
  const groundColor = 0xB97A20  // brownish orange
  const intensity = 1
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
  scene.add(light)

  const loader = new OBJLoader()
  loader.load(modelURL,
              object => {
                spoon = object
                console.log("loaded")
                spoon.rotation.x = Math.PI / 2
                scene.add(spoon)
              },
              xhr => {
                console.log("in progress")
              },
              error => {
                console.log(`error: ${ error }`)
              })

	renderer = new THREE.WebGLRenderer( { antialias: true } )
	renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setAnimationLoop( animation )
  document.body.appendChild( renderer.domElement )

  composer = new EffectComposer(renderer)

  const renderPass = new RenderPass( scene, camera )
  composer.addPass(renderPass)

  const glitchPass = new GlitchPass()
  composer.addPass(glitchPass)

  // const bokehPass = new BokehPass( scene, camera, {} )
  // composer.addPass(bokehPass)
}

var frame = 0
function animation( time ) {
  let speed = 0.08
  if (spoon) {
    // spoon.rotation.x += 0.01
    // spoon.rotation.y += 0.01
    spoon.rotation.z += 0.01
  }

  frame++

  // const renderPass = new RenderPass( scene, camera )
  // composer.addPass(renderPass)

  // const glitchPass = new GlitchPass()
  // composer.addPass(glitchPass)
  // // renderer.render( scene, camera )
  composer.render()
}