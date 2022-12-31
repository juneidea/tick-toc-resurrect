import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import * as util from './modules/util'

export default class BombClass {
    constructor(canvasId) {
        this.canvasId = canvasId
        this.scene = undefined
        this.camera = undefined
        this.renderer = undefined

        // models
        this.boxLoader = undefined

        // this.projector = undefined

        this.targetList = []
    }

    initialize() {
        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(
          36,
          window.innerWidth / window.innerHeight,
          0.25,
          16
        )

        this.camera.position.set(0, 1.8, 4)

        this.scene.add(new THREE.AmbientLight(0x505050))
    
        this.spotLight = new THREE.SpotLight(0xffffff)
    
        this.spotLight.angle = Math.PI / 4
        this.spotLight.penumbra = 0.2
        this.spotLight.position.set(3.2, 3.2, 2.9)
        this.spotLight.castShadow = true
        this.spotLight.shadow.camera.near = 3
        this.spotLight.shadow.camera.far = 10
        this.spotLight.shadow.mapSize.width = 1024
        this.spotLight.shadow.mapSize.height = 1024
    
        this.scene.add(this.spotLight)
    
        this.dirLight = new THREE.DirectionalLight(0x55505a, 1)
    
        this.dirLight.position.set(0, 3, 0)
        this.dirLight.castShadow = true
        this.dirLight.shadow.camera.near = 1
        this.dirLight.shadow.camera.far = 10
        this.dirLight.shadow.camera.right = 1
        this.dirLight.shadow.camera.left = -1
        this.dirLight.shadow.camera.top = 1
        this.dirLight.shadow.camera.bottom = -1
        this.dirLight.shadow.mapSize.width = 1024
        this.dirLight.shadow.mapSize.height = 1024
    
        this.scene.add(this.dirLight)
    
        this.boxLoader = new GLTFLoader()



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
            // this.initClock()
            // this.box.audio1 = document.createElement('audio')
            // let source1 = document.createElement('source')
            // source1.src = '/models/sound/squiggle.mp3'
            // this.box.audio1.appendChild(source1)
            // this.box.audio2 = document.createElement('audio')
            // let source2 = document.createElement('source')
            // source2.src = '/models/sound/Bomb.mp3'
            // this.box.audio2.appendChild(source2)
            // this.box.audio3 = document.createElement('audio')
            // let source3 = document.createElement('source')
            // source3.src = '/models/sound/onePiece.mp3'
            // this.box.audio3.appendChild(source3)
        })

        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.shadowMap.enabled = true
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
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