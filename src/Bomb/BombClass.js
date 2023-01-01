import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import Lights from './Lights'
import BoxLoader from './Box'

export default class BombClass {
    constructor(mount) {
        this.mount = mount
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            36,
            window.innerWidth / window.innerHeight,
            0.25,
            16
          )

        // this.projector = undefined

        this.targetList = []
    }

    initialize(renderer) {
        this.renderer = renderer
        this.camera.position.set(0, 1.8, 4)

        this.scene.add(new THREE.AmbientLight(0x505050))
    
        const lights = new Lights(this.scene, GLTFLoader)
        lights.setup()

        const boxLoader = new BoxLoader(this.scene, GLTFLoader)
        boxLoader.setup()
        this.box  = boxLoader.box

        this.renderer.shadowMap.enabled = true
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.mount.appendChild(this.renderer.domElement)
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
        window.removeEventListener('resize', this.onWindowResize)
        this.mount.removeChild(this.renderer.domElement)
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