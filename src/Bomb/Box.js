import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {clockCases} from './modules/clock'
import {wireCount, wireCountCases} from './modules/wires'
import {LEDcreate} from './modules/LED'
import {SEDS} from './modules/bigbutton'

import * as util from './modules/util'
import {generateRandomIndex, sortByKey} from '../util'

export default class BoxLoader {
    constructor(scene, state, targetList) {
        this.boxLoader = new GLTFLoader()
        this.clockLoader = new GLTFLoader()
        this.digitalLoader = new GLTFLoader()
        this.batteryLoader = new GLTFLoader()
        this.serialText = new THREE.TextureLoader().load(`/models/serial.png`)
        this.serialLoader = new GLTFLoader()
        this.parallelLoader = new GLTFLoader()
        this.module1Loader = new GLTFLoader()
        this.module2Loader = new GLTFLoader()
        this.module3Loader = new GLTFLoader()
        this.module4Loader = new GLTFLoader()
        this.module5Loader = new GLTFLoader()
        this.box = undefined
        this.clock = undefined
        this.scene = scene
        this.state = state
        this.targetList = targetList
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
    
    // box children 2
    initClock() {
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

    initDigital() {
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

    calcInitialClock() {
        const {count, singleSecond} = this.state
        const minute = Math.floor(count / 60)
        const seconds = count % 60
        const tenSecond = Math.floor((seconds % 60) / 10)
        this.setClock('1', minute)
        this.setClock('2', tenSecond)
        this.setClock('3', singleSecond)
    }

    setClock(position, time) {
        this.clock.children[6].children
          .filter(child => child.name.startsWith(`D${position}`))
          .sort((a, b) => sortByKey(a, b, 'name'))
          .forEach((mark, index) => {
            mark.visible = clockCases[String(time)][index]
          })
    }

    // box children 3-6
    initInfo() {
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

          this.initModule1()
        })
    }

    initModule1() {
        this.module1Loader.load('models/mo1.glb', gltf => {
            this.module1 = gltf.scene
            this.box.add(this.module1)
            this.module1.scale.set(0.42, 0.42, 0.42)
            this.module1.position.x = -0.49 //Position (x = right+ left-)
            this.module1.position.y = -0.31 //Position (y = up+, down-)
            this.module1.position.z = -0.47 //Position (z = front +, back-)
            this.module1.rotation.z = Math.PI / 2
            this.module1.rotation.y = -Math.PI / 2
    
            let count = parseInt(
              wireCount[Math.floor(Math.random() * wireCount.length)]
            )
            let wireCases = wireCountCases[count]
            let wireCase = wireCases[generateRandomIndex(wireCases.length)]
            let wires = this.module1.children.filter(element =>
              element.name.startsWith('Wire')
            )
            let uncutWires = wires
              .filter(wire => !wire.name.endsWith('Cut'))
              .sort((a, b) => sortByKey(a, b, 'name'))
            let cutWires = wires
              .filter(wire => wire.name.endsWith('Cut'))
              .sort((a, b) => sortByKey(a, b, 'name'))
            while (cutWires.length > count) {
              let wireIndex = generateRandomIndex(cutWires.length)
              this.module1.remove(cutWires[wireIndex])
              this.module1.remove(uncutWires[wireIndex])
              cutWires = cutWires.filter((wire, index) => index !== wireIndex)
              uncutWires = uncutWires.filter((wire, index) => index !== wireIndex)
            }
    
            uncutWires.forEach((wire, index) => {
              wire.material = wireCase.colors[index]
              cutWires[index].material = wireCase.colors[index]
              if (wireCase.correct === index) {
                wire.userData = {correct: true}
              } else {
                wire.userData = {correct: false}
              }
              this.targetList.push(wire)
            })
    
            this.module1.traverse(o => {
              if (o.isMesh) {
                if (o.name === 'Cube001') o.material = util.cubeMaterial
                else if (o.name === 'Socket') o.material = util.socketMaterial
                else if (o.name === 'LED') LEDcreate(o, this.module1, 'glow')
                else if (!o.name.includes('Wire')) o.material = util.defaultMaterial
              }
            })
            this.module1.castShadow = true
            this.module1.receiveShadow = true
            this.module1.audio = document.createElement('audio')
            let source = document.createElement('source')
            source.src = '/models/sound/wipe.mp3'
            this.module1.audio.appendChild(source)

            this.initModule2()
        })
    }

    initModule2() {
        this.module2Loader.load('models/mo2.glb', glft => {
            this.module2 = glft.scene
            this.box.add(this.module2)
            this.module2.scale.set(0.42, 0.42, 0.42)
            this.module2.position.x = 1.45 //Position (x = right+ left-)
            this.module2.position.y = -0.31 //Position (y = up+, down-)
            this.module2.position.z = -0.47 //Position (z = front +, back-)
            this.module2.rotation.z = Math.PI / 2
            this.module2.rotation.y = -Math.PI / 2
    
            let buttonIndex = String(generateRandomIndex(4) + 1)
    
            this.module2.SEDIndex = generateRandomIndex(4)
    
            let texture = new THREE.TextureLoader().load(
              `/models/Button${buttonIndex}.png`
            )
            texture.wrapS = THREE.RepeatWrapping
            texture.repeat.x = -1
    
            this.module2.traverse(o => {
              if (o.isMesh) {
                if (
                  o.name === 'Cube' ||
                  o.name === 'Cylinder' ||
                  o.name === 'LEDbase' ||
                  o.name === 'Button001'
                )
                  o.material = util.defaultMaterial
                else if (o.name === 'Cube001') o.material = util.cubeMaterial
                else if (o.name === 'Button002' || o.name === 'Button') {
                  o.material = new THREE.MeshPhongMaterial({map: texture})
                  o.rotation.x = -2.85
                  if (buttonIndex === '1' || buttonIndex === '2') {
                    
                    o.userData = {
                      hold: false
                    }
                  } else {
                    o.userData = {
                      hold: true
                    }
                  }
                  this.targetList.push(o)
                } else if (o.name === 'LED') LEDcreate(o, this.module2, 'glow')
                else if (o.name === 'Cube002') {
                  let em = new THREE.Color(0x000000)
                  let SED1 = SEDS[this.module2.SEDIndex].color
                  SED1.name = 'LEDstripe1'
                  this.module2.add(SED1)
                  SED1.position.copy(o.position)
                  SED1.position.z -= 0.9
                  SED1.position.x -= 0.8
                  SED1.position.y += 0.1
                  let SED2 = SED1.clone()
                  SED2.name = 'LEDstripe2'
                  SED2.position.y -= 0.25
                  this.module2.add(SED2)
                  let SED3 = SED1.clone()
                  SED3.name = 'LEDstripe3'
                  SED3.position.y -= 0.5
                  this.module2.add(SED3)
                  let SED4 = SED1.clone()
                  SED4.name = 'LEDstripe4'
                  SED4.position.y -= 0.75
                  this.module2.add(SED4)
                  o.material = new THREE.MeshPhongMaterial({
                    transparent: true,
                    opacity: 0.9,
                    emissive: em,
                    color: SED1.color,
                    shininess: 500
                  })
                } else {
                  o.material = util.defaultMaterial
                }
              }
              this.module2.castShadow = true
              this.module2.receiveShadow = true
            })
            this.module2.audio = document.createElement('audio')
            let source = document.createElement('source')
            source.src = '/models/sound/bigButton.mp3'
            this.module2.audio.appendChild(source)

            this.initModule3()
        })
    }

    initModule3() {
      this.module3Loader.load('models/mo3.glb', gltf => {
        this.module3 = gltf.scene
        this.module3.pickFour = []
        this.box.add(this.module3)
        this.module3.scale.set(0.42, 0.42, 0.42)
        this.module3.position.x = -0.49 //Position (x = right+ left-)
        this.module3.position.y = -0.31 //Position (y = up+, down-)
        this.module3.position.z = 0.47 //Position (z = front +, back-)
        this.module3.rotation.z = Math.PI / 2
        this.module3.rotation.y = -Math.PI / 2
        let alphaSet = []
        if (!alphaSet[0]) {
          let set = Math.floor(Math.random() * 6)
          for (let i = 1; i < 8; i++) {
            alphaSet.push(set * 7 + i)
          }
        }
        let pickFour = [],
          idx
        if (!pickFour[0]) {
          for (let i = 0; i < 4; i++) {
            idx = Math.floor(Math.random() * alphaSet.length)
            pickFour.push(alphaSet[idx])
            alphaSet = [...alphaSet.slice(0, idx), ...alphaSet.slice(idx + 1)]
          }
          this.module3.pickFour = pickFour
        }

        this.module3.traverse(o => {
          let texture1 = new THREE.TextureLoader().load(
            `/models/alphabets/Alp${this.module3.pickFour[0]}.png`
          )
          texture1.wrapT = THREE.RepeatWrapping
          texture1.repeat.y = -1
          var texture2 = new THREE.TextureLoader().load(
            `/models/alphabets/Alp${this.module3.pickFour[1]}.png`
          )
          texture2.wrapT = THREE.RepeatWrapping
          texture2.repeat.y = -1
          var texture3 = new THREE.TextureLoader().load(
            `/models/alphabets/Alp${this.module3.pickFour[2]}.png`
          )
          texture3.wrapT = THREE.RepeatWrapping
          texture3.repeat.y = -1
          var texture4 = new THREE.TextureLoader().load(
            `/models/alphabets/Alp${this.module3.pickFour[3]}.png`
          )
          texture4.wrapT = THREE.RepeatWrapping
          texture4.repeat.y = -1

          if (o.isMesh) {
            if (o.name === 'Cube000') o.material = util.cubeMaterial
            else if (o.name === 'LED') LEDcreate(o, this.module3, 'glow')
            else if (o.name.includes('Lface1')) {
              o.material = new THREE.MeshPhongMaterial({map: texture1})
              this.targetList.push(o)
            } else if (o.name.includes('Lface2')) {
              o.material = new THREE.MeshPhongMaterial({map: texture2})
              this.targetList.push(o)
            } else if (o.name.includes('Lface3')) {
              o.material = new THREE.MeshPhongMaterial({map: texture3})
              this.targetList.push(o)
            } else if (o.name.includes('Lface4')) {
              o.material = new THREE.MeshPhongMaterial({map: texture4})
              this.targetList.push(o)
            } else if (o.name.includes('Letter')) {
              o.material = new THREE.MeshPhongMaterial({map: texture1})
              this.targetList.push(o)
            } else if (o.name.includes('LG')) {
              o.material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(0x000000),
                shininess: 100
              })
            } else {
              o.material = util.defaultMaterial
            }
          }
        })
        this.pickFour = pickFour.sort((a, b) => a - b)
        this.module3.castShadow = true
        this.module3.receiveShadow = true
        this.module3.audio = document.createElement('audio')
        var source = document.createElement('source')
        source.src = '/models/sound/press1.mov'
        this.module3.audio.appendChild(source)
      })
    }

}
