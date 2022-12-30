/* eslint-disable radix */
/* eslint-disable complexity */
/* eslint-disable max-statements */
import './../styles/Bomb.css'
import './../styles/Banner.css'
import './../styles/Loader.css'
import {FaCog} from 'react-icons/fa'
import React, {useState} from 'react'
// import * as THREE from 'three'
// import GLTFLoader from 'three-gltf-loader'
// import {wireCount, wireCountCases} from './modules/wires'
// import {clockCases} from './modules/clock'
// import * as util from './modules/util'
// import {LEDcreate, ranPos} from './modules/LED'
// import {CEDcreate} from './modules/CED'
// import {generateRandomIndex, sortByKey} from '../util'
// import {CanMove, mazeCases, randomProperty} from './modules/mod4'
// import {SEDS} from './modules/bigbutton'
// const selectedMazeCase = randomProperty(mazeCases)

const Bomb = ({ startTime, strikesAllowed }) => {
  const strikeTotal = strikesAllowed ? 3 : 1
  const [state] = useState({
    count: startTime,
    strikeTotal,
    minute: 0,
    tenSecond: 0,
    singleSecond: 0,
    activated: false
  })

  // componentDidMount() {
  //   this.targetList = []

  //   this.scene = new THREE.Scene()

  //   this.camera = new THREE.PerspectiveCamera(
  //     36,
  //     window.innerWidth / window.innerHeight,
  //     0.25,
  //     16
  //   )

  //   this.camera.position.set(0, 1.8, 4)

  //   this.scene.add(new THREE.AmbientLight(0x505050))

  //   this.spotLight = new THREE.SpotLight(0xffffff)

  //   this.spotLight.angle = Math.PI / 4
  //   this.spotLight.penumbra = 0.2
  //   this.spotLight.position.set(3.2, 3.2, 2.9)
  //   this.spotLight.castShadow = true
  //   this.spotLight.shadow.camera.near = 3
  //   this.spotLight.shadow.camera.far = 10
  //   this.spotLight.shadow.mapSize.width = 1024
  //   this.spotLight.shadow.mapSize.height = 1024

  //   this.scene.add(this.spotLight)

  //   this.dirLight = new THREE.DirectionalLight(0x55505a, 1)

  //   this.dirLight.position.set(0, 3, 0)
  //   this.dirLight.castShadow = true
  //   this.dirLight.shadow.camera.near = 1
  //   this.dirLight.shadow.camera.far = 10
  //   this.dirLight.shadow.camera.right = 1
  //   this.dirLight.shadow.camera.left = -1
  //   this.dirLight.shadow.camera.top = 1
  //   this.dirLight.shadow.camera.bottom = -1
  //   this.dirLight.shadow.mapSize.width = 1024
  //   this.dirLight.shadow.mapSize.height = 1024

  //   this.scene.add(this.dirLight)

  //   this.boxLoader = new GLTFLoader()
  //   this.batteryLoader = new GLTFLoader()
  //   this.serialText = new THREE.TextureLoader().load(`/models/serial.png`)
  //   this.serialLoader = new GLTFLoader()
  //   this.parallelLoader = new GLTFLoader()
  //   this.clockLoader = new GLTFLoader()
  //   this.digitalLoader = new GLTFLoader()
  //   this.module1Loader = new GLTFLoader()
  //   this.module2Loader = new GLTFLoader()
  //   this.module3Loader = new GLTFLoader()
  //   this.module4Loader = new GLTFLoader()
  //   this.module5Loader = new GLTFLoader()

  //   this.boxLoader.load('models/box.glb', box => {
  //     this.box = box.scene
  //     this.scene.add(this.box)
  //     this.box.scale.set(1, 1, 1)
  //     this.box.position.x = -0.5 //Position (x = right+ left-)
  //     this.box.position.y = 1.7 //Position (y = up+, down-)
  //     this.box.position.z = 0 //Position (z = front +, back-)
  //     this.box.rotation.x = Math.PI / 2
  //     this.box.traverse(o => {
  //       if (o.isMesh) {
  //         if (o.name === 'Cube001') {
  //           o.material = util.cubeMaterial
  //         } else o.material = util.defaultMaterial
  //       }
  //     })
  //     this.box.castShadow = true
  //     this.box.receiveShadow = true
  //     this.initClock()
  //     this.box.audio1 = document.createElement('audio')
  //     let source1 = document.createElement('source')
  //     source1.src = '/models/sound/squiggle.mp3'
  //     this.box.audio1.appendChild(source1)
  //     this.box.audio2 = document.createElement('audio')
  //     let source2 = document.createElement('source')
  //     source2.src = '/models/sound/Bomb.mp3'
  //     this.box.audio2.appendChild(source2)
  //     this.box.audio3 = document.createElement('audio')
  //     let source3 = document.createElement('source')
  //     source3.src = '/models/sound/onePiece.mp3'
  //     this.box.audio3.appendChild(source3)
  //   })

  //   this.initClock = () => {
  //     this.clockLoader.load('models/clock.glb', glft => {
  //       this.clock = glft.scene
  //       this.box.add(this.clock)
  //       this.clock.scale.set(0.44, 0.44, 0.44)
  //       this.clock.position.x = 0.49 //Position (x = right+ left-)
  //       this.clock.position.y = -0.31 //Position (y = up+, down-)
  //       this.clock.position.z = -0.47 //Position (z = front +, back-)
  //       this.clock.rotation.z = Math.PI / 2
  //       this.clock.rotation.y = -Math.PI / 2
  //       this.clock.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Cube001') o.material = util.clockBackground
  //           else if (o.name === 'Cube002') {
  //             o.material = util.cubeMaterial
  //           } else if (o.name === 'Strike1' || o.name === 'Strike2') {
  //             o.material = util.flatRed
  //             o.visible = false
  //           } else o.material = util.defaultMaterial
  //         }
  //       })
  //       this.clock.castShadow = true
  //       this.clock.receiveShadow = true
  //     })
  //     this.initDigital()
  //     this.box.audio = document.createElement('audio')
  //     let source = document.createElement('source')
  //     source.src = '/models/sound/xBuzzer.mp3'
  //     this.box.audio.appendChild(source)
  //   }

  //   this.initDigital = () => {
  //     if (this.clock) {
  //       this.digitalLoader.load('models/digital.glb', glft => {
  //         this.digital = glft.scene
  //         this.clock.add(this.digital)
  //         this.digital.scale.set(0.9, 0.9, 0.9)
  //         this.digital.position.x = 0 //Position (x = right+ left-)
  //         this.digital.position.y = 0 //Position (y = up+, down-)
  //         this.digital.position.z = 0 //Position (z = front +, back-)
  //         this.digital.traverse(o => {
  //           if (o.isMesh) {
  //             o.material = util.brightRed
  //             if (o.name !== 'Dot') {
  //               o.visible = false
  //             }
  //           }
  //         })
  //         this.calcInitialClock()
  //       })
  //       this.initInfo()
  //     } else {
  //       setTimeout(() => this.initDigital(), 100)
  //     }
  //   }

  //   this.initInfo = () => {
  //     this.batteryLoader.load('models/batterry.glb', battery => {
  //       this.battery1 = battery.scene
  //       this.box.add(this.battery1)
  //       this.battery1.scale.set(0.09, 0.11, 0.11)
  //       this.battery1.position.x = -0.3 //Position (x = right+ left-)
  //       this.battery1.position.y = -0.51 //Position (y = up+, down-)
  //       this.battery1.position.z = -0.91 //Position (z = front +, back-)
  //       this.battery1.rotation.y = -Math.PI / 2
  //       this.battery1.rotation.z = Math.PI / 2
  //       this.battery1.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Dock') {
  //             o.material = util.cubeMaterial
  //           } else if (o.name === 'Battery') {
  //             o.material = util.black
  //           } else if (o.name === 'Battery002') {
  //             o.material = util.copper
  //           } else o.material = util.defaultMaterial
  //         }
  //       })
  //       this.battery1.castShadow = true
  //       this.battery1.receiveShadow = true
  //       this.battery2 = this.battery1.clone()
  //       this.box.add(this.battery2)
  //       this.battery2.position.x = 1.3
  //       this.battery2.position.y = -0.54
  //       this.battery2.position.z = 0.91
  //       this.battery2.rotation.x = Math.PI / 2
  //     })
  //     this.serialText.wrapT = THREE.RepeatWrapping
  //     this.serialText.repeat.y = -2

  //     this.serialLoader.load('models/serial.glb', serial => {
  //       this.serial = serial.scene
  //       this.box.add(this.serial)
  //       this.serial.scale.set(0.2, 0.2, 0.2)
  //       this.serial.position.x = 1.3 //Position (x = right+ left-)
  //       this.serial.position.y = -0.55 //Position (y = up+, down-)
  //       this.serial.position.z = -1.013 //Position (z = front +, back-)
  //       this.serial.rotation.y = -Math.PI / 2
  //       this.serial.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Serial') {
  //             o.material = new THREE.MeshPhongMaterial({map: this.serialText})
  //           } else o.material = util.cubeMaterial
  //         }
  //       })
  //       this.serial.castShadow = true
  //       this.serial.receiveShadow = true
  //     })
  //     this.parallelLoader.load('models/parallel.glb', parallel => {
  //       this.parallel = parallel.scene
  //       this.box.add(this.parallel)
  //       this.parallel.scale.set(0.3, 0.3, 0.3)
  //       this.parallel.position.x = 0.49 //Position (x = right+ left-)
  //       this.parallel.position.y = -0.51 //Position (y = up+, down-)
  //       this.parallel.position.z = 1 //Position (z = front +, back-)
  //       this.parallel.rotation.y = -Math.PI / 2
  //       this.parallel.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Cube' || o.name === 'Cube002') {
  //             o.material = util.cubeMaterial
  //           } else o.material = util.defaultMaterial
  //         }
  //       })
  //       this.parallel.castShadow = true
  //       this.parallel.receiveShadow = true
  //     })
  //     this.initModules()
  //   }

  //   this.initModules = () => {
  //     this.module1Loader.load('models/mo1.glb', gltf => {
  //       this.module1 = gltf.scene
  //       this.box.add(this.module1)
  //       this.module1.scale.set(0.42, 0.42, 0.42)
  //       this.module1.position.x = -0.49 //Position (x = right+ left-)
  //       this.module1.position.y = -0.31 //Position (y = up+, down-)
  //       this.module1.position.z = -0.47 //Position (z = front +, back-)
  //       this.module1.rotation.z = Math.PI / 2
  //       this.module1.rotation.y = -Math.PI / 2

  //       let count = parseInt(
  //         wireCount[Math.floor(Math.random() * wireCount.length)]
  //       )
  //       let wireCases = wireCountCases[count]
  //       let wireCase = wireCases[generateRandomIndex(wireCases.length)]
  //       let wires = this.module1.children.filter(element =>
  //         element.name.startsWith('Wire')
  //       )
  //       let uncutWires = wires
  //         .filter(wire => !wire.name.endsWith('Cut'))
  //         .sort((a, b) => sortByKey(a, b, 'name'))
  //       let cutWires = wires
  //         .filter(wire => wire.name.endsWith('Cut'))
  //         .sort((a, b) => sortByKey(a, b, 'name'))
  //       while (cutWires.length > count) {
  //         let wireIndex = generateRandomIndex(cutWires.length)
  //         this.module1.remove(cutWires[wireIndex])
  //         this.module1.remove(uncutWires[wireIndex])
  //         cutWires = cutWires.filter((wire, index) => index !== wireIndex)
  //         uncutWires = uncutWires.filter((wire, index) => index !== wireIndex)
  //       }

  //       uncutWires.forEach((wire, index) => {
  //         wire.material = wireCase.colors[index]
  //         cutWires[index].material = wireCase.colors[index]
  //         if (wireCase.correct === index) {
  //           wire.userData = {correct: true}
  //         } else {
  //           wire.userData = {correct: false}
  //         }
  //         this.targetList.push(wire)
  //       })

  //       this.module1.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Cube001') o.material = util.cubeMaterial
  //           else if (o.name === 'Socket') o.material = util.socketMaterial
  //           else if (o.name === 'LED') LEDcreate(o, this.module1, 'glow')
  //           else if (!o.name.includes('Wire')) o.material = util.defaultMaterial
  //         }
  //       })
  //       this.module1.castShadow = true
  //       this.module1.receiveShadow = true
  //       this.module1.audio = document.createElement('audio')
  //       let source = document.createElement('source')
  //       source.src = '/models/sound/wipe.mp3'
  //       this.module1.audio.appendChild(source)
  //     })
  //     this.module2Loader.load('models/mo2.glb', glft => {
  //       this.module2 = glft.scene
  //       this.box.add(this.module2)
  //       this.module2.scale.set(0.42, 0.42, 0.42)
  //       this.module2.position.x = 1.45 //Position (x = right+ left-)
  //       this.module2.position.y = -0.31 //Position (y = up+, down-)
  //       this.module2.position.z = -0.47 //Position (z = front +, back-)
  //       this.module2.rotation.z = Math.PI / 2
  //       this.module2.rotation.y = -Math.PI / 2

  //       let buttonIndex = String(generateRandomIndex(4) + 1)

  //       this.SEDIndex = generateRandomIndex(4)

  //       let texture = new THREE.TextureLoader().load(
  //         `/models/Button${buttonIndex}.png`
  //       )
  //       texture.wrapS = THREE.RepeatWrapping
  //       texture.repeat.x = -1

  //       this.module2.traverse(o => {
  //         if (o.isMesh) {
  //           if (
  //             o.name === 'Cube' ||
  //             o.name === 'Cylinder' ||
  //             o.name === 'LEDbase' ||
  //             o.name === 'Button001'
  //           )
  //             o.material = util.defaultMaterial
  //           else if (o.name === 'Cube001') o.material = util.cubeMaterial
  //           else if (o.name === 'Button002' || o.name === 'Button') {
  //             o.material = new THREE.MeshPhongMaterial({map: texture})
  //             o.rotation.x = -2.85
  //             if (buttonIndex === '1' || buttonIndex === '2') {
  //               o.userData = {
  //                 hold: false
  //               }
  //             } else {
  //               o.userData = {
  //                 hold: true
  //               }
  //             }
  //             this.targetList.push(o)
  //           } else if (o.name === 'LED') LEDcreate(o, this.module2, 'glow')
  //           else if (o.name === 'Cube002') {
  //             let em = new THREE.Color(0x000000)
  //             let SED1 = SEDS[this.SEDIndex].color
  //             SED1.name = 'LEDstripe1'
  //             this.module2.add(SED1)
  //             SED1.position.copy(o.position)
  //             SED1.position.z -= 0.9
  //             SED1.position.x -= 0.8
  //             SED1.position.y += 0.1
  //             let SED2 = SED1.clone()
  //             SED2.name = 'LEDstripe2'
  //             SED2.position.y -= 0.25
  //             this.module2.add(SED2)
  //             let SED3 = SED1.clone()
  //             SED3.name = 'LEDstripe3'
  //             SED3.position.y -= 0.5
  //             this.module2.add(SED3)
  //             let SED4 = SED1.clone()
  //             SED4.name = 'LEDstripe4'
  //             SED4.position.y -= 0.75
  //             this.module2.add(SED4)
  //             o.material = new THREE.MeshPhongMaterial({
  //               transparent: true,
  //               opacity: 0.9,
  //               emissive: em,
  //               color: SED1.color,
  //               shininess: 500
  //             })
  //           } else {
  //             o.material = util.defaultMaterial
  //           }
  //         }
  //         this.module2.castShadow = true
  //         this.module2.receiveShadow = true
  //       })
  //       this.module2.audio = document.createElement('audio')
  //       let source = document.createElement('source')
  //       source.src = '/models/sound/bigButton.mp3'
  //       this.module2.audio.appendChild(source)
  //     })

  //     this.module3Loader.load('models/mo3.glb', gltf => {
  //       this.module3 = gltf.scene
  //       this.module3.pickFour = []
  //       this.box.add(this.module3)
  //       this.module3.scale.set(0.42, 0.42, 0.42)
  //       this.module3.position.x = -0.49 //Position (x = right+ left-)
  //       this.module3.position.y = -0.31 //Position (y = up+, down-)
  //       this.module3.position.z = 0.47 //Position (z = front +, back-)
  //       this.module3.rotation.z = Math.PI / 2
  //       this.module3.rotation.y = -Math.PI / 2
  //       let alphaSet = []
  //       if (!alphaSet[0]) {
  //         let set = Math.floor(Math.random() * 6)
  //         for (let i = 1; i < 8; i++) {
  //           alphaSet.push(set * 7 + i)
  //         }
  //       }
  //       let pickFour = [],
  //         idx
  //       if (!pickFour[0]) {
  //         for (let i = 0; i < 4; i++) {
  //           idx = Math.floor(Math.random() * alphaSet.length)
  //           pickFour.push(alphaSet[idx])
  //           alphaSet = [...alphaSet.slice(0, idx), ...alphaSet.slice(idx + 1)]
  //         }
  //         this.module3.pickFour = pickFour
  //       }

  //       this.module3.traverse(o => {
  //         let texture1 = new THREE.TextureLoader().load(
  //           `/models/alphabets/Alp${this.module3.pickFour[0]}.png`
  //         )
  //         texture1.wrapT = THREE.RepeatWrapping
  //         texture1.repeat.y = -1
  //         var texture2 = new THREE.TextureLoader().load(
  //           `/models/alphabets/Alp${this.module3.pickFour[1]}.png`
  //         )
  //         texture2.wrapT = THREE.RepeatWrapping
  //         texture2.repeat.y = -1
  //         var texture3 = new THREE.TextureLoader().load(
  //           `/models/alphabets/Alp${this.module3.pickFour[2]}.png`
  //         )
  //         texture3.wrapT = THREE.RepeatWrapping
  //         texture3.repeat.y = -1
  //         var texture4 = new THREE.TextureLoader().load(
  //           `/models/alphabets/Alp${this.module3.pickFour[3]}.png`
  //         )
  //         texture4.wrapT = THREE.RepeatWrapping
  //         texture4.repeat.y = -1

  //         if (o.isMesh) {
  //           if (o.name === 'Cube000') o.material = util.cubeMaterial
  //           else if (o.name === 'LED') LEDcreate(o, this.module3, 'glow')
  //           else if (o.name.includes('Lface1')) {
  //             o.material = new THREE.MeshPhongMaterial({map: texture1})
  //             this.targetList.push(o)
  //           } else if (o.name.includes('Lface2')) {
  //             o.material = new THREE.MeshPhongMaterial({map: texture2})
  //             this.targetList.push(o)
  //           } else if (o.name.includes('Lface3')) {
  //             o.material = new THREE.MeshPhongMaterial({map: texture3})
  //             this.targetList.push(o)
  //           } else if (o.name.includes('Lface4')) {
  //             o.material = new THREE.MeshPhongMaterial({map: texture4})
  //             this.targetList.push(o)
  //           } else if (o.name.includes('Letter')) {
  //             o.material = new THREE.MeshPhongMaterial({map: texture1})
  //             this.targetList.push(o)
  //           } else if (o.name.includes('LG')) {
  //             o.material = new THREE.MeshPhongMaterial({
  //               color: new THREE.Color(0x000000),
  //               shininess: 100
  //             })
  //           } else {
  //             o.material = util.defaultMaterial
  //           }
  //         }
  //       })
  //       this.pickFour = pickFour.sort((a, b) => a - b)
  //       this.module3.castShadow = true
  //       this.module3.receiveShadow = true
  //       this.module3.audio = document.createElement('audio')
  //       var source = document.createElement('source')
  //       source.src = '/models/sound/press1.mov'
  //       this.module3.audio.appendChild(source)
  //     })
  //     this.module4Loader.load('models/mo4.glb', gltf => {
  //       this.head = {}
  //       this.module4 = gltf.scene
  //       this.box.add(this.module4)
  //       this.module4.scale.set(0.42, 0.42, 0.42)
  //       this.module4.position.x = 1.45 //Position (x = right+ left-)
  //       this.module4.position.y = -0.31 //Position (y = up+, down-)
  //       this.module4.position.z = 0.47 //Position (z = front +, back-)
  //       this.module4.rotation.z = Math.PI / 2
  //       this.module4.rotation.y = -Math.PI / 2

  //       this.module4.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Cube000') o.material = util.cubeMaterial
  //           else if (
  //             o.name === 'LEDbase' ||
  //             o.name === 'Cylinder' ||
  //             o.name === 'Cube'
  //           )
  //             o.material = util.defaultMaterial
  //           else if (o.name === 'LED') LEDcreate(o, this.module4, 'glow')
  //           else if (o.name === 'Board') {
  //             o.material = util.cubeMaterial
  //           } else if (o.name.includes('Go')) {
  //             //arrows up down left right
  //             o.material = util.cubeMaterial
  //             this.targetList.push(o)
  //           } else if (o.name === 'CircleOne') {
  //             // first green circle  mazeCases['1'].CircleOne
  //             o.material = util.green
  //             o.position.copy(
  //               this.module4.children.filter(
  //                 a => a.name === selectedMazeCase.CircleOne
  //               )[0].position
  //             )
  //             o.position.x -= 0.165
  //           } else if (o.name === 'CircleTwo') {
  //             // second green circle
  //             o.material = util.green
  //             o.position.copy(
  //               this.module4.children.filter(
  //                 a => a.name === selectedMazeCase.CircleTwo
  //               )[0].position //Pos11, ... Pos66
  //             )
  //             o.position.x -= 0.165
  //           } else if (o.name === 'End') {
  //             //ending spot
  //             o.material = util.redTran
  //             let randomName = `Pos${ranPos()}${ranPos()}`
  //             o.userData = {winningPosition: randomName}
  //             o.position.copy(
  //               this.module4.children.filter(a => a.name === randomName)[0]
  //                 .position
  //             )
  //             o.position.x -= 0.1
  //             o.position.y += 0.06
  //             o.position.z -= 0.07
  //           } else {
  //             o.material = util.flatBlack
  //           }
  //         }
  //       })
  //       let randomName = `Pos${ranPos()}${ranPos()}`
  //       let head = this.module4.children.filter(a => a.name === randomName)[0]
  //       head.material = util.white
  //       this.module4.head = head
  //       this.module4.castShadow = true
  //       this.module4.receiveShadow = true
  //       this.module4.audio = document.createElement('audio')
  //       var source = document.createElement('source')
  //       source.src = '/models/sound/arrow.mp3'
  //       this.module4.audio.appendChild(source)
  //     })
  //     this.module5Loader.load('models/mo5.glb', gltf => {
  //       this.module5 = gltf.scene
  //       this.module5.correct = '5'
  //       this.module5.quest = [[], [], [], []]
  //       this.module5.textures = []
  //       this.box.add(this.module5)
  //       gltf.scene.scale.set(0.42, 0.42, 0.42)
  //       gltf.scene.position.x = 0.49 //Position (x = right+ left-)
  //       gltf.scene.position.y = -0.31 //Position (y = up+, down-)
  //       gltf.scene.position.z = 0.47 //Position (z = front +, back-)
  //       gltf.scene.rotation.z = Math.PI / 2
  //       gltf.scene.rotation.y = -Math.PI / 2

  //       this.module5.randomKey = () => {
  //         let order = [1, 2, 3, 4]
  //         let unOrder = []
  //         for (let i = 4; i > 0; i--) {
  //           let indx = Math.ceil(Math.random() * i) - 1
  //           unOrder.push(order[indx])
  //           order = [...order.slice(0, indx), ...order.slice(indx + 1)]
  //         }
  //         let texture1 = new THREE.TextureLoader().load(
  //           `/models/Key${unOrder[0]}.png`
  //         )
  //         texture1.wrapT = THREE.RepeatWrapping
  //         texture1.repeat.y = -1
  //         let texture2 = new THREE.TextureLoader().load(
  //           `/models/Key${unOrder[1]}.png`
  //         )
  //         texture2.wrapT = THREE.RepeatWrapping
  //         texture2.repeat.y = -1
  //         let texture3 = new THREE.TextureLoader().load(
  //           `/models/Key${unOrder[2]}.png`
  //         )
  //         texture3.wrapT = THREE.RepeatWrapping
  //         texture3.repeat.y = -1
  //         let texture4 = new THREE.TextureLoader().load(
  //           `/models/Key${unOrder[3]}.png`
  //         )
  //         texture4.wrapT = THREE.RepeatWrapping
  //         texture4.repeat.y = -1
  //         this.module5.textures = [texture1, texture2, texture3, texture4]
  //       }
  //       this.module5.randomKey()

  //       let texture5 = new THREE.TextureLoader().load(
  //         `/models/Read${Math.ceil(Math.random() * 4)}.png`
  //       )
  //       texture5.wrapT = THREE.RepeatWrapping
  //       texture5.repeat.y = -1

  //       this.module5.traverse(o => {
  //         if (o.isMesh) {
  //           if (o.name === 'Cube000') o.material = util.cubeMaterial
  //           else if (
  //             o.name === 'LEDbase' ||
  //             o.name === 'Cylinder' ||
  //             o.name === 'Cube' ||
  //             o.name === 'Ftwo'
  //           )
  //             o.material = util.defaultMaterial
  //           else if (o.name === 'LED') LEDcreate(o, this.module5, 'glow')
  //           else if (
  //             o.name === 'Board' ||
  //             o.name === 'Fone' ||
  //             o.name === 'Fthree'
  //           )
  //             o.material = util.cubeMaterial
  //           else if (o.name === 'Read1' || o.name === 'Correct')
  //             o.material = util.flatBlack
  //           else if (o.name === 'CED5') CEDcreate(o, this.module5, -0.56)
  //           else if (o.name === 'CED6') CEDcreate(o, this.module5, -0.43)
  //           else if (o.name === 'CED7') CEDcreate(o, this.module5, -0.3)
  //           else if (o.name === 'CED8') CEDcreate(o, this.module5, -0.17)
  //           else if (o.name === 'CED9') CEDcreate(o, this.module5, -0.04)
  //           else if (o.name.includes('1')) {
  //             o.material = new THREE.MeshPhongMaterial({
  //               map: this.module5.textures[0]
  //             })
  //             this.targetList.push(o)
  //           } else if (o.name.includes('2')) {
  //             o.material = new THREE.MeshPhongMaterial({
  //               map: this.module5.textures[1]
  //             })
  //             this.targetList.push(o)
  //           } else if (o.name.includes('3')) {
  //             o.material = new THREE.MeshPhongMaterial({
  //               map: this.module5.textures[2]
  //             })
  //             this.targetList.push(o)
  //           } else if (o.name.includes('4')) {
  //             o.material = new THREE.MeshPhongMaterial({
  //               map: this.module5.textures[3]
  //             })
  //             this.targetList.push(o)
  //           } else if (o.name === 'ReadNumber') {
  //             o.material = new THREE.MeshPhongMaterial({map: texture5})
  //             this.targetList.push(o)
  //           } else o.material = util.flatBlack
  //         }
  //       })
  //       this.module5.castShadow = true
  //       this.module5.receiveShadow = true
  //       this.module5.audio = document.createElement('audio')
  //       var source = document.createElement('source')
  //       source.src = '/models/sound/press1.mov'
  //       this.module5.audio.appendChild(source)
  //     })
  //   }

  //   this.renderer = new THREE.WebGLRenderer({antialias: true})
  //   this.renderer.shadowMap.enabled = true
  //   this.renderer.setPixelRatio(window.devicePixelRatio)
  //   this.renderer.setSize(window.innerWidth, window.innerHeight)
  //   this.mount.appendChild(this.renderer.domElement)
  //   window.addEventListener('resize', this.onWindowResize, false)

  //   this.isDragging = false

  //   this.toRadians = angle => {
  //     return angle * (Math.PI / 180)
  //   }

  //   this.toDegress = angle => {
  //     return angle * (180 / Math.PI)
  //   }

  //   this.mouse = {
  //     x: 0,
  //     y: 0
  //   }

  //   this.previousMousePosition = {
  //     x: 0,
  //     y: 0
  //   }

  //   this.renderArea = this.renderer.domElement

  //   this.renderArea.addEventListener('mousedown', e => {
  //     this.isDragging = true
  //   })

  //   this.renderArea.addEventListener('mousemove', e => {
  //     let deltaMove = {
  //       x: e.offsetX - this.previousMousePosition.x,
  //       y: e.offsetY - this.previousMousePosition.y
  //     }

  //     if (this.isDragging) {
  //       let deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
  //         new THREE.Euler(this.toRadians(deltaMove.y * 1), 0, 0, 'XYZ')
  //       )
  //       this.box.quaternion.multiplyQuaternions(
  //         deltaRotationQuaternion,
  //         this.box.quaternion
  //       )
  //     }

  //     this.previousMousePosition = {
  //       x: e.offsetX,
  //       y: e.offsetY
  //     }
  //   })

  //   document.addEventListener('mouseup', () => {
  //     const {minute, tenSecond, singleSecond} = this.state
  //     this.isDragging = false
  //     if (
  //       this.module2.children.filter(a => a.name.startsWith('Button'))[0]
  //         .position.x < 0.4
  //     ) {
  //       this.module2.children
  //         .filter(a => a.name.startsWith('Button'))
  //         .map(b => {
  //           b.position.x += 0.18
  //         })
  //     }
  //     if (
  //       this.intersects[0] &&
  //       this.intersects[0].object.name.startsWith('Button')
  //     ) {
  //       if (this.intersects[0].object.userData.hold === true) {
  //         if (
  //           minute === SEDS[this.SEDIndex].num ||
  //           tenSecond === SEDS[this.SEDIndex].num ||
  //           singleSecond === SEDS[this.SEDIndex].num
  //         ) {
  //           this.props.passModule('BigButton')
  //           this.handlePass('module2')
  //           this.removeAllTargets('Button')
  //         } else {
  //           this.box.audio.play()
  //           this.props.setStrike()
  //         }
  //       } else {
  //         this.props.passModule('BigButton')
  //         this.handlePass('module2')
  //         this.removeAllTargets('Button')
  //       }
  //     }
  //     this.module4.children.filter(a => a.name.includes('Go')).map(b => {
  //       if (b.material.shininess === 10) b.material = util.cubeMaterial
  //     })
  //   })

  //   document.addEventListener(
  //     'mousedown',
  //     e => {
  //       this.onDocumentMouseDown(e)
  //     },
  //     false
  //   )

  //   this.projector = new THREE.Projector()
  //   this.start()
  //   setTimeout(() => {
  //     this.setState(prevState => ({
  //       activated: !prevState.activated
  //     }))
  //     this.handleCountStart()
  //   }, 5000)
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.gameStatus !== 'pending') {
  //     setTimeout(() => this.props.history.push('/recap'), 3000)
  //   }
  //   if (this.props.moduleTotal === this.props.modulesPassed) {
  //     this.handleDiffusal()
  //   } else if (
  //     this.props.strikeCount === this.props.strikeTotal ||
  //     (this.state.count === 0 && this.state.singleSecond === 0)
  //   ) {
  //     this.handleFailure()
  //   } else {
  //     if (prevProps.strikeCount !== this.props.strikeCount) {
  //       const count = this.props.strikeCount
  //       const Strike = this.clock.children.find(
  //         child => child.name === `Strike${count}`
  //       )
  //       Strike.visible = true
  //     }
  //     if (prevState.count !== this.state.count) {
  //       if (this.clock.children[6]) this.calcClock(prevState)
  //       else setTimeout(this.calcClock(prevState), 1000)
  //     }
  //   }
  // }

  // onDocumentMouseDown = e => {
  //   // the following line would stop any other event handler from firing
  //   // (such as the mouse's TrackballControls)
  //   // event.preventDefault();

  //   // update the mouse variable
  //   this.mouse.x = event.clientX / window.innerWidth * 2 - 1
  //   this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  //   // find intersections
  //   // create a Ray with origin at the mouse position
  //   //   and direction into the scene (camera direction)
  //   let vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1)
  //   this.projector.unprojectVector(vector, this.camera)
  //   let ray = new THREE.Raycaster(
  //     this.camera.position,
  //     vector.sub(this.camera.position).normalize()
  //   )
  //   // create an array containing all objects in the scene with which the ray intersects
  //   this.intersects = ray.intersectObjects(this.targetList)
  //   // if there is one (or more) intersections
  //   if (this.intersects.length > 0) {
  //     let itemClicked = this.intersects[0].object
  //     if (this.targetList.includes(itemClicked)) {
  //       let {name} = itemClicked
  //       if (name.startsWith('Wire')) {
  //         this.handleWires(itemClicked)
  //       } else if (name.startsWith('Button')) {
  //         this.module2.audio.play()
  //         this.module2.children
  //           .filter(child => child.name.startsWith('Button'))
  //           .forEach(child => {
  //             child.position.x -= 0.18
  //           })
  //       }
  //       // module3
  //       if (name.startsWith('Letter') || name.startsWith('Lface')) {
  //         if (
  //           this.intersects[0].object.material.map.image.src.slice(-6, -5) !==
  //           'p'
  //         ) {
  //           if (
  //             this.module3.pickFour[0] ===
  //             Number(
  //               this.intersects[0].object.material.map.image.src.slice(-6, -5) +
  //                 this.intersects[0].object.material.map.image.src.slice(-5, -4)
  //             )
  //           ) {
  //             this.module3.audio.play()
  //             this.module3.children
  //               .filter(a =>
  //                 a.name.includes('' + this.intersects[0].object.name.slice(-1))
  //               )
  //               .map(b => {
  //                 if (b.position.x > 1.26) b.position.x -= 0.07
  //                 if (b.position.x < 0.5 && b.position.x > 0.35) {
  //                   b.position.x -= 0.07
  //                   b.material.color.setRGB(0, 1, 0)
  //                 }
  //               })
  //             this.removeTarget(this.intersects[0].object)
  //             this.module3.pickFour.shift()
  //             if (!this.module3.pickFour[0]) this.handleLetters()
  //           } else {
  //             this.box.audio.play()
  //             this.props.setStrike()
  //           }
  //         } else if (
  //           this.module3.pickFour[0] ===
  //           Number(
  //             this.intersects[0].object.material.map.image.src.slice(-5, -4)
  //           )
  //         ) {
  //           this.module3.audio.play()
  //           this.module3.children
  //             .filter(a =>
  //               a.name.includes('' + this.intersects[0].object.name.slice(-1))
  //             )
  //             .map(b => {
  //               if (b.position.x > 1.26) b.position.x -= 0.07
  //               if (b.position.x < 0.5 && b.position.x > 0.35) {
  //                 b.position.x -= 0.07
  //                 b.material.color.setRGB(0, 1, 0)
  //               }
  //             })
  //           this.removeTarget(this.intersects[0].object)
  //           this.module3.pickFour.shift()
  //           if (!this.module3.pickFour[0]) this.handleLetters()
  //         } else {
  //           this.box.audio.play()
  //           this.props.setStrike()
  //         }
  //       }
  //       // module4
  //       let head = this.module4.head

  //       if (this.intersects[0].object.name.includes('Go')) {
  //         this.intersects[0].object.material = util.flatBlack
  //         if (this.intersects[0].object.name === 'GoUp') {
  //           if (head.name[3] !== '1') {
  //             let newHead =
  //               head.name.slice(0, 3) +
  //               (Number(head.name[3]) - 1) +
  //               head.name[4] //new position established
  //             if (
  //               CanMove(
  //                 [this.module4.head.name[3], this.module4.head.name[4]],
  //                 selectedMazeCase.Maze,
  //                 this.intersects[0].object.name
  //               )
  //             ) {
  //               this.module4.audio.play()
  //               head.material = util.flatBlack // unpaint
  //               head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
  //               head.material = util.white // paint
  //               this.module4.head = head
  //             } else {
  //               this.box.audio.play()
  //               this.props.setStrike()
  //             }
  //           }
  //         } else if (this.intersects[0].object.name === 'GoDown') {
  //           if (head.name[3] !== '6') {
  //             let newHead =
  //               head.name.slice(0, 3) +
  //               (Number(head.name[3]) + 1) +
  //               head.name[4]
  //             if (
  //               CanMove(
  //                 [this.module4.head.name[3], this.module4.head.name[4]],
  //                 selectedMazeCase.Maze,
  //                 this.intersects[0].object.name
  //               )
  //             ) {
  //               this.module4.audio.play()
  //               head.material = util.flatBlack // unpaint
  //               head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
  //               head.material = util.white // paint
  //               this.module4.head = head
  //             } else {
  //               this.box.audio.play()
  //               this.props.setStrike()
  //             }
  //           }
  //         } else if (this.intersects[0].object.name === 'GoLeft') {
  //           if (head.name[4] !== '1') {
  //             let newHead = head.name.slice(0, 4) + (Number(head.name[4]) - 1)
  //             if (
  //               CanMove(
  //                 [this.module4.head.name[3], this.module4.head.name[4]],
  //                 selectedMazeCase.Maze,
  //                 this.intersects[0].object.name
  //               )
  //             ) {
  //               this.module4.audio.play()
  //               head.material = util.flatBlack // unpaint
  //               head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
  //               head.material = util.white // paint
  //               this.module4.head = head
  //             } else {
  //               this.box.audio.play()
  //               this.props.setStrike()
  //             }
  //           }
  //         } else if (this.intersects[0].object.name === 'GoRight') {
  //           if (head.name[4] !== '6') {
  //             let newHead = head.name.slice(0, 4) + (Number(head.name[4]) + 1)
  //             if (
  //               CanMove(
  //                 [this.module4.head.name[3], this.module4.head.name[4]],
  //                 selectedMazeCase.Maze,
  //                 this.intersects[0].object.name
  //               )
  //             ) {
  //               this.module4.audio.play()
  //               head.material = util.flatBlack // unpaint
  //               head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
  //               head.material = util.white // paint
  //               this.module4.head = head
  //             } else {
  //               this.box.audio.play()
  //               this.props.setStrike()
  //             }
  //           }
  //         }

  //         if (
  //           this.module4.children[0].userData.winningPosition ===
  //           this.module4.head.name
  //         ) {
  //           this.handlePass('module4')
  //           this.props.passModule('Maze')
  //           this.removeAllTargets('Go')
  //         }
  //       }

  //       // module5
  //       if (this.intersects[0].object.name.includes('Kface')) {
  //         const lit = str => {
  //           this.module5.children.filter(a => a.name.includes(str)).map(b => {
  //             b.visible = true
  //           })
  //         }
  //         const readAgain = () => {
  //           let texture5 = new THREE.TextureLoader().load(
  //             `/models/Read${Math.ceil(Math.random() * 4)}.png`
  //           )
  //           texture5.wrapT = THREE.RepeatWrapping
  //           texture5.repeat.y = -1
  //           this.module5.children.filter(
  //             a => a.name === 'ReadNumber'
  //           )[0].material = new THREE.MeshPhongMaterial({map: texture5})
  //         }
  //         const resetKey = () => {
  //           this.module5.children
  //             .filter(a => a.name.includes('K'))
  //             .map(b => (b.visible = false))
  //           this.setKey = k => {
  //             this.module5.children
  //               .filter(a => a.name.includes(k))
  //               .map(b => (b.visible = true))
  //           }
  //           this.module5.children.filter(
  //             a => a.name === 'Kface1'
  //           )[0].material = new THREE.MeshPhongMaterial({
  //             map: this.module5.textures[0]
  //           })
  //           this.module5.children.filter(
  //             a => a.name === 'Kface2'
  //           )[0].material = new THREE.MeshPhongMaterial({
  //             map: this.module5.textures[1]
  //           })
  //           this.module5.children.filter(
  //             a => a.name === 'Kface3'
  //           )[0].material = new THREE.MeshPhongMaterial({
  //             map: this.module5.textures[2]
  //           })
  //           this.module5.children.filter(
  //             a => a.name === 'Kface4'
  //           )[0].material = new THREE.MeshPhongMaterial({
  //             map: this.module5.textures[3]
  //           })
  //           setTimeout(() => this.setKey('1'), 250)
  //           setTimeout(() => this.setKey('2'), 500)
  //           setTimeout(() => this.setKey('3'), 750)
  //           setTimeout(() => this.setKey('4'), 1000)
  //         }
  //         const reRun = () => {
  //           readAgain()
  //           this.module5.randomKey()
  //           resetKey()
  //         }
  //         const runDown = () => {
  //           this.module5.children
  //             .filter(a => a.name.includes('CCED'))
  //             .map(b => (b.visible = false))
  //           this.module5.correct = '5'
  //         }
  //         let readNumber = this.module5.children
  //           .filter(a => a.name === 'ReadNumber')[0]
  //           .material.map.image.src.slice(-5)[0]
  //         this.module5.audio.play()
  //         if (this.module5.correct === '5') {
  //           if (Number(readNumber) < 3) {
  //             this.module5.quest[0] = [
  //               2,
  //               Number(
  //                 this.module5.children
  //                   .filter(a => a.name === 'Kface2')[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           } else {
  //             this.module5.quest[0] = [
  //               Number(readNumber),
  //               Number(
  //                 this.module5.children
  //                   .filter(a => a.name === `Kface${readNumber}`)[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           }
  //           if (
  //             this.intersects[0].object.name[5] ===
  //             this.module5.quest[0][0] + ''
  //           ) {
  //             lit('5')
  //             this.module5.correct = '6'
  //             reRun()
  //           } else {
  //             this.box.audio.play()
  //             this.props.setStrike()
  //             reRun()
  //           }
  //         } else if (this.module5.correct === '6') {
  //           if (readNumber === '1') {
  //             let position4 = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(b => b.material.map.image.src.slice(-5, -4) === '4')[0]
  //             this.module5.quest[1] = [Number(position4.name.slice(-1)), 4]
  //           } else if (readNumber === '3') {
  //             this.module5.quest[1] = [
  //               1,
  //               Number(
  //                 this.module5.children
  //                   .filter(a => a.name === `Kface1`)[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           } else {
  //             this.module5.quest[1] = [
  //               this.module5.quest[0][0],
  //               Number(
  //                 this.module5.children
  //                   .filter(
  //                     a => a.name === `Kface${this.module5.quest[0][0]}`
  //                   )[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           }
  //           if (
  //             this.intersects[0].object.name[5] ===
  //             this.module5.quest[1][0] + ''
  //           ) {
  //             lit('6')
  //             this.module5.correct = '7'
  //             reRun()
  //           } else {
  //             this.box.audio.play()
  //             this.props.setStrike()
  //             runDown()
  //             reRun()
  //           }
  //         } else if (this.module5.correct === '7') {
  //           if (readNumber === '1') {
  //             let position = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(
  //                 b =>
  //                   b.material.map.image.src.slice(-5, -4) ===
  //                   this.module5.quest[1][1] + ''
  //               )[0]
  //             this.module5.quest[2] = [
  //               Number(position.name.slice(-1)),
  //               this.module5.quest[1][1]
  //             ]
  //           } else if (readNumber === '2') {
  //             let position = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(
  //                 b =>
  //                   b.material.map.image.src.slice(-5, -4) ===
  //                   this.module5.quest[0][1] + ''
  //               )[0]
  //             this.module5.quest[2] = [
  //               Number(position.name.slice(-1)),
  //               this.module5.quest[0][1]
  //             ]
  //           } else if (readNumber === '3') {
  //             this.module5.quest[2] = [
  //               3,
  //               Number(
  //                 this.module5.children
  //                   .filter(a => a.name === `Kface3`)[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           } else if (readNumber === '4') {
  //             let position4 = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(b => b.material.map.image.src.slice(-5, -4) === '4')[0]
  //             this.module5.quest[2] = [Number(position4.name.slice(-1)), 4]
  //           }
  //           if (
  //             this.intersects[0].object.name[5] ===
  //             this.module5.quest[2][0] + ''
  //           ) {
  //             lit('7')
  //             this.module5.correct = '8'
  //             reRun()
  //           } else {
  //             this.box.audio.play()
  //             this.props.setStrike()
  //             runDown()
  //             reRun()
  //           }
  //         } else if (this.module5.correct === '8') {
  //           if (readNumber === '1') {
  //             this.module5.quest[3] = [
  //               this.module5.quest[0][0],
  //               Number(
  //                 this.module5.children
  //                   .filter(
  //                     a => a.name === `Kface${this.module5.quest[0][0]}`
  //                   )[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           } else if (readNumber === '2') {
  //             this.module5.quest[3] = [
  //               1,
  //               Number(
  //                 this.module5.children
  //                   .filter(a => a.name === `Kface1`)[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           } else {
  //             this.module5.quest[3] = [
  //               this.module5.quest[1][0],
  //               Number(
  //                 this.module5.children
  //                   .filter(
  //                     a => a.name === `Kface${this.module5.quest[1][0]}`
  //                   )[0]
  //                   .material.map.image.src.slice(-5, -4)
  //               )
  //             ]
  //           }
  //           if (
  //             this.intersects[0].object.name[5] ===
  //             this.module5.quest[3][0] + ''
  //           ) {
  //             lit('8')
  //             this.module5.correct = '9'
  //             reRun()
  //           } else {
  //             this.box.audio.play()
  //             this.props.setStrike()
  //             runDown()
  //             reRun()
  //           }
  //         } else if (this.module5.correct === '9') {
  //           if (readNumber === '1') {
  //             let position = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(
  //                 b =>
  //                   b.material.map.image.src.slice(-5, -4) ===
  //                   this.module5.quest[0][1] + ''
  //               )[0]
  //             this.module5.quest[4] = [
  //               Number(position.name.slice(-1)),
  //               this.module5.quest[0][1]
  //             ]
  //           } else if (readNumber === '2') {
  //             let position = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(
  //                 b =>
  //                   b.material.map.image.src.slice(-5, -4) ===
  //                   this.module5.quest[1][1] + ''
  //               )[0]
  //             this.module5.quest[4] = [
  //               Number(position.name.slice(-1)),
  //               this.module5.quest[1][1]
  //             ]
  //           } else if (readNumber === '3') {
  //             let position = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(
  //                 b =>
  //                   b.material.map.image.src.slice(-5, -4) ===
  //                   this.module5.quest[3][1] + ''
  //               )[0]
  //             this.module5.quest[4] = [
  //               Number(position.name.slice(-1)),
  //               this.module5.quest[3][1]
  //             ]
  //           } else if (readNumber === '4') {
  //             let position = this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .filter(
  //                 b =>
  //                   b.material.map.image.src.slice(-5, -4) ===
  //                   this.module5.quest[2][1] + ''
  //               )[0]
  //             this.module5.quest[4] = [
  //               Number(position.name.slice(-1)),
  //               this.module5.quest[2][1]
  //             ]
  //           }
  //           if (
  //             this.intersects[0].object.name[5] ===
  //             this.module5.quest[4][0] + ''
  //           ) {
  //             lit('9')
  //             this.handleKeys()
  //             this.module5.children
  //               .filter(a => a.name.includes('Kface'))
  //               .map(b => this.removeTarget(b))
  //           } else {
  //             this.box.audio.play()
  //             this.props.setStrike()
  //             runDown()
  //             reRun()
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  // const handleDiffusal = () => {
    // this.box.audio3.play()
    // const {count} = this.state
    // if (this.props.gameStatus === 'pending') {
    //   clearTimeout(this.timer)
    //   this.targetList = []
    //   this.props.endGame('diffused', count)
    // }
  // }

  // const handleFailure = () => {
    // this.box.audio2.play()
    // const {count} = this.state
    // if (this.props.gameStatus === 'pending') {
    //   if (count) clearTimeout(this.timer)
    //   this.targetList = []
    //   this.props.endGame('failed', count)
    // }
  // }

  // const handleCountStart = () => {
    // this.timer = setInterval(() => {
    //   const newCount = this.state.count - 1
    //   this.setState({count: newCount >= 0 ? newCount : 0})
    // }, 1000)
  // }

  // const start = () => {
  //   if (!this.frameId) {
  //     this.frameId = requestAnimationFrame(this.animate)
  //   }
  // }

  // const stop = () => {
  //   cancelAnimationFrame(this.animate)
  // }

  // onWindowResize = () => {
  //   this.camera.aspect = window.innerWidth / window.innerHeight
  //   this.camera.updateProjectionMatrix()

  //   this.renderer.setSize(window.innerWidth, window.innerHeight)
  // }

  // const animate = () => {
    // this.renderer.render(this.scene, this.camera)
    // this.frameId = requestAnimationFrame(this.animate)
  // }

  // const calcClock = cstate => {
    // const {count} = state
    // const minute = Math.floor(count / 60)
    // const seconds = count % 60
    // const tenSecond = Math.floor((seconds % 60) / 10)
    // const singleSecond = seconds % 10
    // if (cstate.minute !== minute) {
    //   this.setState({minute})
    //   this.setClock('1', minute)
    //   if (minute === 0) {
    //     let spotLight = this.spotLight
    //     spotLight.color.g = 0
    //     spotLight.color.b = 0
    //     spotLight.intensity = 0.7
    //     setInterval(function() {
    //       spotLight.visible = !spotLight.visible
    //     }, 1000)
    //     this.spotLight = spotLight
    //   }
    // }
    // if (cstate.tenSecond !== tenSecond) {
    //   this.setState({tenSecond})
    //   this.setClock('2', tenSecond)
    // }
    // if (cstate.singleSecond !== singleSecond) {
    //   this.setState({singleSecond})
    //   this.setClock('3', singleSecond)
    // }
  // }

  // const calcInitialClock = () => {
    // const {count, singleSecond} = state
    // const minute = Math.floor(count / 60)
    // const seconds = count % 60
    // const tenSecond = Math.floor((seconds % 60) / 10)
    // this.setClock('1', minute)
    // this.setClock('2', tenSecond)
    // this.setClock('3', singleSecond)
  // }

  // const setClock = (position, time) => {
    // this.clock.children[6].children
    //   .filter(child => child.name.startsWith(`D${position}`))
    //   .sort((a, b) => sortByKey(a, b, 'name'))
    //   .forEach((mark, index) => {
    //     mark.visible = clockCases[String(time)][index]
    //   })
  // }

  // handleWires = wire => {
  //   this.module1.audio.play()
  //   if (wire.userData.correct === true) {
  //     this.props.passModule('Wires')
  //     this.handlePass('module1')
  //   } else {
  //     this.box.audio.play()
  //     this.props.setStrike()
  //   }
  //   this.module1.remove(wire)
  //   this.removeTarget(wire)
  // }

  // handleLetters = () => {
  //   this.props.passModule('Letters')
  //   this.handlePass('module3')
  // }

  // handleKeys = () => {
  //   this.props.passModule('Keys')
  //   this.handlePass('module5')
  // }

  // handlePass = moduleName => {
  //   this.box.audio1.play()
  //   const glow = this[moduleName].children.find(child => child.name === 'glow')
  //   const LED = this[moduleName].children.find(child => child.name === 'LED')
  //   glow.visible = true
  //   LED.material = util.LEDMaterialON
  // }

  // removeTarget = target => {
  //   this.targetList = this.targetList.filter(item => item !== target)
  // }

  // removeAllTargets = target => {
  //   this.targetList = this.targetList.filter(
  //     item => !item.name.includes(target)
  //   )
  // }

  const {gameStatus} = 'pending'
  const {activated} = state
  return (
    <>
      {gameStatus !== 'pending' && (
        <div className="banner-container">
          <div className={`banner ${gameStatus}--banner`}>{gameStatus}</div>
        </div>
      )}
      {!activated && (
        <div className="stamp activating--banner">
          <div>Bomb activating. Get ready.</div>
          <FaCog className="loader" />
        </div>
      )}
      <div
        className={activated ? 'bomb--activated' : 'bomb--activating'}
        ref={mount => {
          this.mount = mount
        }}
      />
    </>
  )
}

export default Bomb
