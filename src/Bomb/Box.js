import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {clockCases} from './modules/clock'
import * as util from './modules/util'
import {sortByKey} from '../util'

export default class BoxLoader {
    constructor(scene, state) {
        this.boxLoader = new GLTFLoader()
        this.clockLoader = new GLTFLoader()
        this.digitalLoader = new GLTFLoader()
        this.batteryLoader = new GLTFLoader()
        this.serialText = new THREE.TextureLoader().load(`/models/serial.png`)
        this.serialLoader = new GLTFLoader()
        this.parallelLoader = new GLTFLoader()
        this.box = undefined
        this.scene = scene
        this.state = state
    }

    setup() {
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
            this.initClock()

            // add audio
            this.box.audio1 = document.createElement('audio')
            let source1 = document.createElement('source')
            source1.src = '/models/sound/squiggle.mp3'
            this.box.audio1.appendChild(source1)

            this.box.audio2 = document.createElement('audio')
            let source2 = document.createElement('source')
            source2.src = '/models/sound/Bomb.mp3'
            this.box.audio2.appendChild(source2)

            this.box.audio3 = document.createElement('audio')
            let source3 = document.createElement('source')
            source3.src = '/models/sound/onePiece.mp3'
            this.box.audio3.appendChild(source3)
        })
    }

    initClock = () => {
        this.clockLoader.load('models/clock.glb', clock => {
          this.clock = clock.scene
          this.box.add(this.clock)
          this.clock.scale.set(0.44, 0.44, 0.44)
          this.clock.position.x = 0.49 //Position (x = right+ left-)
          this.clock.position.y = -0.31 //Position (y = up+, down-)
          this.clock.position.z = -0.47 //Position (z = front +, back-)
          this.clock.rotation.z = Math.PI / 2
          this.clock.rotation.y = -Math.PI / 2
          this.clock.traverse(o => {
            if (o.isMesh) {
              if (o.name === 'Cube001') o.material = util.clockBackground
              else if (o.name === 'Cube002') {
                o.material = util.cubeMaterial
              } else if (o.name === 'Strike1' || o.name === 'Strike2') {
                o.material = util.flatRed
                o.visible = false
              } else o.material = util.defaultMaterial
            }
          })
          this.clock.castShadow = true
          this.clock.receiveShadow = true
        })
        this.initDigital()
        this.box.audio = document.createElement('audio')
        let source = document.createElement('source')
        source.src = '/models/sound/xBuzzer.mp3'
        this.box.audio.appendChild(source)
    }

    initDigital = () => {
        if (this.clock) {
          this.digitalLoader.load('models/digital.glb', digital => {
            this.digital = digital.scene
            this.clock.add(this.digital)
            this.digital.scale.set(0.9, 0.9, 0.9)
            this.digital.position.x = 0 //Position (x = right+ left-)
            this.digital.position.y = 0 //Position (y = up+, down-)
            this.digital.position.z = 0 //Position (z = front +, back-)
            this.digital.traverse(o => {
              if (o.isMesh) {
                o.material = util.brightRed
                if (o.name !== 'Dot') {
                  o.visible = false
                }
              }
            })
            this.calcInitialClock()
          })
          this.initInfo()
        } else {
          setTimeout(() => this.initDigital(), 100)
        }
    }

    calcInitialClock = () => {
        const {count, singleSecond} = this.state
        const minute = Math.floor(count / 60)
        const seconds = count % 60
        const tenSecond = Math.floor((seconds % 60) / 10)
        this.setClock('1', minute)
        this.setClock('2', tenSecond)
        this.setClock('3', singleSecond)
    }

    setClock = (position, time) => {
        this.clock.children[6].children
          .filter(child => child.name.startsWith(`D${position}`))
          .sort((a, b) => sortByKey(a, b, 'name'))
          .forEach((mark, index) => {
            mark.visible = clockCases[String(time)][index]
          })
      }

    initInfo = () => {
        this.batteryLoader.load('models/batterry.glb', battery => {
          this.battery1 = battery.scene
          this.box.add(this.battery1)
          this.battery1.scale.set(0.09, 0.11, 0.11)
          this.battery1.position.x = -0.3 //Position (x = right+ left-)
          this.battery1.position.y = -0.51 //Position (y = up+, down-)
          this.battery1.position.z = -0.91 //Position (z = front +, back-)
          this.battery1.rotation.y = -Math.PI / 2
          this.battery1.rotation.z = Math.PI / 2
          this.battery1.traverse(o => {
            if (o.isMesh) {
              if (o.name === 'Dock') {
                o.material = util.cubeMaterial
              } else if (o.name === 'Battery') {
                o.material = util.black
              } else if (o.name === 'Battery002') {
                o.material = util.copper
              } else o.material = util.defaultMaterial
            }
          })
          this.battery1.castShadow = true
          this.battery1.receiveShadow = true
          this.battery2 = this.battery1.clone()
          this.box.add(this.battery2)
          this.battery2.position.x = 1.3
          this.battery2.position.y = -0.54
          this.battery2.position.z = 0.91
          this.battery2.rotation.x = Math.PI / 2
        })
        this.serialText.wrapT = THREE.RepeatWrapping
        this.serialText.repeat.y = -2
  
        this.serialLoader.load('models/serial.glb', serial => {
          this.serial = serial.scene
          this.box.add(this.serial)
          this.serial.scale.set(0.2, 0.2, 0.2)
          this.serial.position.x = 1.3 //Position (x = right+ left-)
          this.serial.position.y = -0.55 //Position (y = up+, down-)
          this.serial.position.z = -1.013 //Position (z = front +, back-)
          this.serial.rotation.y = -Math.PI / 2
          this.serial.traverse(o => {
            if (o.isMesh) {
              if (o.name === 'Serial') {
                o.material = new THREE.MeshPhongMaterial({map: this.serialText})
              } else o.material = util.cubeMaterial
            }
          })
          this.serial.castShadow = true
          this.serial.receiveShadow = true
        })
        this.parallelLoader.load('models/parallel.glb', parallel => {
          this.parallel = parallel.scene
          this.box.add(this.parallel)
          this.parallel.scale.set(0.3, 0.3, 0.3)
          this.parallel.position.x = 0.49 //Position (x = right+ left-)
          this.parallel.position.y = -0.51 //Position (y = up+, down-)
          this.parallel.position.z = 1 //Position (z = front +, back-)
          this.parallel.rotation.y = -Math.PI / 2
          this.parallel.traverse(o => {
            if (o.isMesh) {
              if (o.name === 'Cube' || o.name === 'Cube002') {
                o.material = util.cubeMaterial
              } else o.material = util.defaultMaterial
            }
          })
          this.parallel.castShadow = true
          this.parallel.receiveShadow = true
        })
        // this.initModules()
      }
}
