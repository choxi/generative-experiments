import * as THREE from 'three';

console.log("starting playground")
console.log(THREE)

import Utils from "./utils"
import Color from "./renderables/color"
import Vector from "./math/vector"
import { v4 as uuid } from "uuid"
import RandomWalker from "./renderables/random-walker"

let camera, scene, renderer;
let geometry, material, mesh;
let meshes = [];
let walker = new RandomWalker()
let width, height
let planeGeo, blueMaterial, whiteMaterial
let tiles = []

document.addEventListener("DOMContentLoaded", event => {
  width = window.innerWidth
  height = window.innerHeight
  init()
})

function init() {
  let rows = 100
  let columns = 100
  let cellWidth = 2 / rows
  let cellHeight = 2 / columns

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

  // geometry = new THREE.BoxGeometry( 0.01, 0.01, 0.01 );
  geometry = new THREE.TorusGeometry( 0.01, 0.005, 32 , 100)
  planeGeo = new THREE.PlaneGeometry(cellWidth, cellHeight)
  material = new THREE.MeshNormalMaterial()
  blueMaterial = new THREE.MeshBasicMaterial({ color: "#334EEE" })
  whiteMaterial = new THREE.MeshBasicMaterial({ color: "#FFFFFF" })

  // let rows = 100
  // let columns = 100
  // for(let r=0; r < rows; r++) {
  //   for(let c=0; c < columns; c++) {
  //     mesh = new THREE.Mesh( geometry, material );
  //     mesh.translateX(-1 + (c / rows)*2)
  //     mesh.translateY(-1 + (r / columns)*2)
  //     scene.add( mesh );
  //     meshes.push(mesh)
  //   }
  // }
  mesh = new THREE.Mesh(geometry, material)

  for(let r = 0; r < rows; r++) {
    for(let c = 0; c < columns; c++) {
      let x = c * cellWidth - 1 + cellWidth / 2
      let y = r * cellHeight - 1 + cellHeight / 2
      let planeMesh
      if (Math.random() < 0.5) {
        planeMesh = new THREE.Mesh(planeGeo, blueMaterial)
      } else {
        planeMesh = new THREE.Mesh(planeGeo, whiteMaterial)
      }
      planeMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), -3 * Math.PI / 8)
      planeMesh.translateX(x)
      planeMesh.translateY(y)
      // planeMesh.position.y = y
      // planeMesh.rotation.x = -3 * Math.PI / 8
      // planeMesh.position.x = x
      // planeMesh.position.y = y
      // planeMesh.rotation.x = -3 * Math.PI / 8
      // planeMesh.position.y = -0.75
      scene.add(planeMesh)
      tiles.push(planeMesh)
    }
  }
  // mesh.translateX(-1 + (c / rows)*2)
  // mesh.translateY(-1 + (r / columns)*2)
  scene.add( mesh )
  meshes.push(mesh)

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setAnimationLoop( animation );
  document.body.appendChild( renderer.domElement );
}

var frame = 0
function animation( time ) {
  let speed = 0.08
  console.log(frame)

  meshes.forEach(mesh => {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;
    // mesh.scale.x += speed
    // mesh.scale.y += speed
    // mesh.scale.z += speed
    mesh.position.z += 0.001
    // mesh.position.x += 0.001
  })

  if (frame % 10 === 0) {
    console.log("here")
    tiles.forEach(tile => {
      if (tile.material.color.getHexString() === "ffffff") {
        tile.material.color.set(0x334eee)
        tile.material.needsUpdate = true
      } else {
        tile.material.color.set(0xffffff)
        tile.material.needsUpdate = true
      }

      // if (tile.material === whiteMaterial) {
      //   tile.material = blueMaterial
      // } else {
      //   tile.material = whiteMaterial
      // }
    })
  }
  frame++
  renderer.render( scene, camera )
}