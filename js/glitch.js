import * as THREE from 'three'
import { Scene } from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import modelURL from "url:../models/old-spoon/source/spoon.obj"

let camera, scene, renderer

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
                console.log("loaded")
                object.rotation.x = Math.PI / 2
                scene.add(object)
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
}

var frame = 0
function animation( time ) {
  let speed = 0.08

  frame++
  renderer.render( scene, camera )
}