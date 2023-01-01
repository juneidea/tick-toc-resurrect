import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Lights from './Lights'
import * as util from './modules/util'

export default class BombClass {
    constructor(canvasId) {
        this.canvasId = canvasId
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            36,
            window.innerWidth / window.innerHeight,
            0.25,
            16
          )
        this.renderer = undefined

        // models
        this.boxLoader = new GLTFLoader()

        // this.projector = undefined

        this.targetList = []
    }

    initialize() {
        this.camera.position.set(0, 1.8, 4)

        this.scene.add(new THREE.AmbientLight(0x505050))
    
        const lights = new Lights(this.scene)
        lights.setup()

        this.boxLoader.load('models/box.glb', box => {
            this.box = box.scene
            this.scene.add(this.box)
            this.box.scale.set(1, 1, 1)
            this.box.position.x = -0.5 //Position (x = right+ left-)
            this.box.position.y = 1.7 //Position (y = up+, down-)
            this.box.position.z = 0 //Position (z = front +, back-)
            this.box.rotation.x = Math.PI / 2
            this.box.traverse(o => {
              if (o.isMesh) {
                if (o.name === 'Cube001') {
                  o.material = util.cubeMaterial
                } else o.material = util.defaultMaterial
              }
            })
            this.box.castShadow = true
            this.box.receiveShadow = true
        })

        const canvas = document.getElementById(this.canvasId)
        this.renderer = new THREE.WebGLRenderer({canvas, antialias: true})
        this.renderer.shadowMap.enabled = true
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        window.addEventListener('resize', this.onWindowResize, false)

        // this.projector = new THREE.Projector()
        this.start()
    }



    start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate)
        }
      }
    
    stop = () => {
        cancelAnimationFrame(this.animate)
    }

    onWindowResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate = () => {
        this.renderer.render(this.scene, this.camera)
        this.frameId = requestAnimationFrame(this.animate)
    }
}