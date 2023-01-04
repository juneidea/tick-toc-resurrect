import * as THREE from 'three'

import Lights from './Lights'
import BoxLoader from './Box'

import {clockCases} from './modules/clock'
import {SEDS} from './modules/bigbutton'
import {CanMove} from './modules/mod4'

import {sortByKey} from '../util'
import * as util from './modules/util'

export default class BombClass {
    constructor(mount, state, setActivated, setRestart, setGameStatus) {
        this.mount = mount
        this.state = state
        this.setActivated = setActivated
        this.setRestart = setRestart
        this.setGameStatus = setGameStatus
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            36,
            window.innerWidth / window.innerHeight,
            0.25,
            16
          )
        this.timer = undefined
        this.targetList = []
    }

    initialize(renderer) {
        this.renderer = renderer
        this.camera.position.set(0, 1.8, 4)
        this.scene.add(new THREE.AmbientLight(0x505050))
    
        const lights = new Lights(this.scene)
        lights.setup()

        const boxLoader = new BoxLoader(this.scene, this.state, this.targetList)
        boxLoader.setup()

        this.renderer.shadowMap.enabled = true
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.mount.appendChild(this.renderer.domElement)
        window.addEventListener('resize', this.onWindowResize(this.camera), false)

        // Mouse rotate box
        this.isDragging = false

        this.toRadians = angle => {
          return angle * (Math.PI / 180)
        }
    
        this.toDegress = angle => {
          return angle * (180 / Math.PI)
        }
    
        this.mouse = {
          x: 0,
          y: 0
        }
    
        this.previousMousePosition = {
          x: 0,
          y: 0
        }
    
        this.renderArea = this.renderer.domElement
    
        this.renderArea.addEventListener('mousedown', e => {
          this.isDragging = true
        })
    
        this.renderArea.addEventListener('mousemove', e => {
          let deltaMove = {
            x: e.offsetX - this.previousMousePosition.x,
            y: e.offsetY - this.previousMousePosition.y
          }
    
          if (this.isDragging) {
            let deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
              new THREE.Euler(this.toRadians(deltaMove.y * 1), 0, 0, 'XYZ')
            )
            this.box.quaternion.multiplyQuaternions(
              deltaRotationQuaternion,
              this.box.quaternion
            )
          }
    
          this.previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
          }
        })

        document.addEventListener('mouseup', () => {
            const {minute, tenSecond, singleSecond} = this.state
            this.isDragging = false
            if (
                this.module2.children.filter(a => a.name.startsWith('Button'))[0]
                  .position.x < 0.4
              ) {
                this.module2.children
                  .filter(a => a.name.startsWith('Button'))
                  .map(b => {
                    b.position.x += 0.18
                    return b
                  })
              }
              if (
                this.intersects[0] &&
                this.intersects[0].object.name.startsWith('Button')
              ) {
                if (this.intersects[0].object.userData.hold === true) {
                  if (
                    minute === SEDS[this.module2.SEDIndex].num ||
                    tenSecond === SEDS[this.module2.SEDIndex].num ||
                    singleSecond === SEDS[this.module2.SEDIndex].num
                  ) {
                    this.handlePass('module2')
                    this.removeAllTargets('Button')
                  } else {
                    this.box.audio.play()
                    this.setStrike()
                  }
                } else {
                  this.handlePass('module2')
                  this.removeAllTargets('Button')
                }
            }
            this.module4.children.filter(a => a.name.includes('Go')).map(b => {
              if (b.material.shininess === 10) b.material = util.cubeMaterial
              return b
            })
        })

        document.addEventListener(
            'mousedown',
            e => {
              this.onDocumentMouseDown(e)
            },
            false
        )

        this.start()
    }

    handleCountStart() {
        // reference to 3d models after loading
        this.box = this.scene.children[3]
        this.clock = this.box.children[2]
        this.module1 = this.box.children[7]
        this.module2 = this.box.children[8]
        this.module3 = this.box.children[9]
        this.module4 = this.box.children[10]
        this.module5 = this.box.children[11]
        // then start the clock
        this.timer = setInterval(() => {
            if(this.state.count < 1) clearInterval(this.timer)
            if(this.state.count < 1) clearInterval(this.lastMin)
            const newCount = this.state.count - 1
            this.setState({count: newCount >= 0 ? newCount : 0})
            if (this.clock.children[6]) this.calcClock(this.state)
        }, 1000)
    }

    setState(update) {
        this.state = { ...this.state, ...update}
    }

    calcClock(state) {
        const {count} = this.state
        const minute = Math.floor(count / 60)
        const seconds = count % 60
        const tenSecond = Math.floor((seconds % 60) / 10)
        const singleSecond = seconds % 10
        if (state.minute !== minute) {
          this.setState({minute})
          this.setClock('1', minute)
          if (minute === 0) {
            let spotLight = this.scene.children[1]
            spotLight.color.g = 0
            spotLight.color.b = 0
            spotLight.intensity = 0.7
            this.lastMin = setInterval(function() {
                spotLight.visible = !spotLight.visible
            }, 1000)
          }
        }
        if (state.tenSecond !== tenSecond) {
          this.setState({tenSecond})
          this.setClock('2', tenSecond)
        }
        if (state.singleSecond !== singleSecond) {
          this.setState({singleSecond})
          this.setClock('3', singleSecond)
        }
    }

    setClock = (position, time) => {
        this.clock.children[6].children
          .filter(child => child.name.startsWith(`D${position}`))
          .sort((a, b) => sortByKey(a, b, 'name'))
          .forEach((mark, index) => {
            mark.visible = clockCases[String(time)][index]
        })
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }
    
    stop() {
        cancelAnimationFrame(this.animate)
        window.removeEventListener('resize', this.onWindowResize)
        this.mount.removeChild(this.renderer.domElement)
        this.targetList = []
        this.intersects = undefined
    }

    onWindowResize(camera) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate = () => {
        this.renderer.render(this.scene, this.camera)
        this.frameId = requestAnimationFrame(this.animate)
    }
    

    // Game handles

    handleWires(wire) {
        this.module1.audio.play()
        if (wire.userData.correct === true) {
          this.handlePass('module1')
          this.removeAllTargets('Wire')
        } else {
          this.box.audio.play()
          this.setStrike()
        }
        this.module1.remove(wire)
        this.removeTarget(wire)
    }

    handlePass(moduleName) {
        this.box.audio1.play()
        const glow = this[moduleName].children.find(child => child.name === 'glow')
        const LED = this[moduleName].children.find(child => child.name === 'LED')
        glow.visible = true
        LED.material = util.LEDMaterialON
        this.state.modulesPassed += 1
        if (this.state.modulesPassed === 5) {
          this.handleDiffusal()
        }
    }
    
    removeTarget(target) {
        this.targetList = this.targetList.filter(item => item !== target)
    }
    
    removeAllTargets(target) {
        this.targetList = this.targetList.filter(
          item => !item.name.includes(target)
        )
    }

    setStrike() {
      this.state.strikeCount += 1
      if (this.state.strikeTotal > 1 && this.state.strikeCount < 3) {
        const Strike = this.clock.children.find(
          child => child.name === `Strike${this.state.strikeCount}`
        )
        Strike.visible = true
      }
      if (this.state.strikeTotal === this.state.strikeCount ||
      (this.state.count === 0 && this.state.singleSecond === 0)) {
        this.handleFailure()
      }
    }

    handleFailure = () => {
      this.box.audio2.play()
      const {count} = this.state
      if (count) clearInterval(this.timer)
      this.targetList = []
      setTimeout(() => {
        this.scene.remove(this.box)
      }, 1400)
      setTimeout(() => {
        this.setActivated(false)
        this.setRestart(true)
        this.setGameStatus('failed')
      }, 2700)
    }

    handleDiffusal = () => {
      this.box.audio3.play()
      clearInterval(this.timer)
      this.targetList = []
      const strikes = this.clock.children.filter(child => child.name.startsWith('Strike'))
      strikes.forEach(s => {
        s.visible = true
        s.material = util.green
      })
      const digitals = this.clock.children[6].children
      digitals.forEach(d => d.material = util.green)
      setTimeout(() => {
        this.setActivated(false)
        this.setRestart(true)
        this.setGameStatus('diffused')
      }, 5000)
      // const {count} = this.state
      // this.props.endGame('diffused', count)
    }



    // Game mouse down logic

    onDocumentMouseDown = event => {
        // start raycaster
        const rect = this.renderer.domElement.getBoundingClientRect();

        // update the mouse variable
        this.mouse.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
        this.mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

        let vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1)
        vector.unproject(this.camera);
        let ray = new THREE.Raycaster(
          this.camera.position,
          vector.sub(this.camera.position).normalize()
        )

        // create an array containing all objects in the scene with which the ray intersects
        this.intersects = ray.intersectObjects(this.targetList)
        // if there is one (or more) intersections
        if (this.intersects.length > 0) {
          let itemClicked = this.intersects[0].object
          if (this.targetList.includes(itemClicked)) {
            let {name} = itemClicked
            if (name.startsWith('Wire')) {
              this.handleWires(itemClicked)
            } else if (name.startsWith('Button')) {
              this.module2.audio.play()
              this.module2.children
                .filter(child => child.name.startsWith('Button'))
                .forEach(child => {
                  child.position.x -= 0.18
                })
            }
            // module3
            if (name.startsWith('Letter') || name.startsWith('Lface')) {
              if (
                this.intersects[0].object.material.map.image.src.slice(-6, -5) !==
                'p'
              ) {
                if (
                  this.module3.pickFour[0] ===
                  Number(
                    this.intersects[0].object.material.map.image.src.slice(-6, -5) +
                      this.intersects[0].object.material.map.image.src.slice(-5, -4)
                  )
                ) {
                  this.module3.audio.play()
                  this.module3.children
                    .filter(a =>
                      a.name.includes('' + this.intersects[0].object.name.slice(-1))
                    )
                    .map(b => {
                      if (b.position.x > 1.26) b.position.x -= 0.07
                      if (b.position.x < 0.5 && b.position.x > 0.35) {
                        b.position.x -= 0.07
                        b.material.color.setRGB(0, 1, 0)
                      }
                      return b
                    })
                  this.removeTarget(this.intersects[0].object)
                  this.module3.pickFour.shift()
                  if (!this.module3.pickFour[0]) this.handlePass('module3')
                } else {
                  this.box.audio.play()
                  this.setStrike()
                }
              } else if (
                this.module3.pickFour[0] ===
                Number(
                  this.intersects[0].object.material.map.image.src.slice(-5, -4)
                )
              ) {
                this.module3.audio.play()
                this.module3.children
                  .filter(a =>
                    a.name.includes('' + this.intersects[0].object.name.slice(-1))
                  )
                  .map(b => {
                    if (b.position.x > 1.26) b.position.x -= 0.07
                    if (b.position.x < 0.5 && b.position.x > 0.35) {
                      b.position.x -= 0.07
                      b.material.color.setRGB(0, 1, 0)
                    }
                    return b
                  })
                this.removeTarget(this.intersects[0].object)
                this.module3.pickFour.shift()
                if (!this.module3.pickFour[0]) this.handlePass('module3')
              } else {
                this.box.audio.play()
                this.setStrike()
              }
            }
            // module4
            let head = this.module4.head
    
            if (this.intersects[0].object.name.includes('Go')) {
              this.intersects[0].object.material = util.flatBlack
              if (this.intersects[0].object.name === 'GoUp') {
                if (head.name[3] !== '1') {
                  let newHead =
                    head.name.slice(0, 3) +
                    (Number(head.name[3]) - 1) +
                    head.name[4] //new position established
                  if (
                    CanMove(
                      [this.module4.head.name[3], this.module4.head.name[4]],
                      this.module4.selectedMazeCase.Maze,
                      this.intersects[0].object.name
                    )
                  ) {
                    this.module4.audio.play()
                    head.material = util.flatBlack // unpaint
                    head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
                    head.material = util.white // paint
                    this.module4.head = head
                  } else {
                    this.box.audio.play()
                    this.setStrike()
                  }
                }
              } else if (this.intersects[0].object.name === 'GoDown') {
                if (head.name[3] !== '6') {
                  let newHead =
                    head.name.slice(0, 3) +
                    (Number(head.name[3]) + 1) +
                    head.name[4]
                  if (
                    CanMove(
                      [this.module4.head.name[3], this.module4.head.name[4]],
                      this.module4.selectedMazeCase.Maze,
                      this.intersects[0].object.name
                    )
                  ) {
                    this.module4.audio.play()
                    head.material = util.flatBlack // unpaint
                    head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
                    head.material = util.white // paint
                    this.module4.head = head
                  } else {
                    this.box.audio.play()
                    this.setStrike()
                  }
                }
              } else if (this.intersects[0].object.name === 'GoLeft') {
                if (head.name[4] !== '1') {
                  let newHead = head.name.slice(0, 4) + (Number(head.name[4]) - 1)
                  if (
                    CanMove(
                      [this.module4.head.name[3], this.module4.head.name[4]],
                      this.module4.selectedMazeCase.Maze,
                      this.intersects[0].object.name
                    )
                  ) {
                    this.module4.audio.play()
                    head.material = util.flatBlack // unpaint
                    head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
                    head.material = util.white // paint
                    this.module4.head = head
                  } else {
                    this.box.audio.play()
                    this.setStrike()
                  }
                }
              } else if (this.intersects[0].object.name === 'GoRight') {
                if (head.name[4] !== '6') {
                  let newHead = head.name.slice(0, 4) + (Number(head.name[4]) + 1)
                  if (
                    CanMove(
                      [this.module4.head.name[3], this.module4.head.name[4]],
                      this.module4.selectedMazeCase.Maze,
                      this.intersects[0].object.name
                    )
                  ) {
                    this.module4.audio.play()
                    head.material = util.flatBlack // unpaint
                    head = this.module4.children.filter(a => a.name === newHead)[0] // get the newHead position
                    head.material = util.white // paint
                    this.module4.head = head
                  } else {
                    this.box.audio.play()
                    this.setStrike()
                  }
                }
              }
    
              if (
                this.module4.children[0].userData.winningPosition ===
                this.module4.head.name
              ) {
                this.handlePass('module4')
                this.removeAllTargets('Go')
              }
            }
    
            // module5
            if (this.intersects[0].object.name.includes('Kface')) {
              const lit = str => {
                this.module5.children.filter(a => a.name.includes(str)).map(b => {
                  b.visible = true
                  return b
                })
              }
              const readAgain = () => {
                let texture5 = new THREE.TextureLoader().load(
                  `/models/Read${Math.ceil(Math.random() * 4)}.png`
                )
                texture5.wrapT = THREE.RepeatWrapping
                texture5.repeat.y = -1
                this.module5.children.filter(
                  a => a.name === 'ReadNumber'
                )[0].material = new THREE.MeshPhongMaterial({map: texture5})
              }
              const resetKey = () => {
                this.module5.children
                  .filter(a => a.name.includes('K'))
                  .map(b => (b.visible = false))
                this.setKey = k => {
                  this.module5.children
                    .filter(a => a.name.includes(k))
                    .map(b => (b.visible = true))
                }
                this.module5.children.filter(
                  a => a.name === 'Kface1'
                )[0].material = new THREE.MeshPhongMaterial({
                  map: this.module5.textures[0]
                })
                this.module5.children.filter(
                  a => a.name === 'Kface2'
                )[0].material = new THREE.MeshPhongMaterial({
                  map: this.module5.textures[1]
                })
                this.module5.children.filter(
                  a => a.name === 'Kface3'
                )[0].material = new THREE.MeshPhongMaterial({
                  map: this.module5.textures[2]
                })
                this.module5.children.filter(
                  a => a.name === 'Kface4'
                )[0].material = new THREE.MeshPhongMaterial({
                  map: this.module5.textures[3]
                })
                setTimeout(() => this.setKey('1'), 250)
                setTimeout(() => this.setKey('2'), 500)
                setTimeout(() => this.setKey('3'), 750)
                setTimeout(() => this.setKey('4'), 1000)
              }
              const reRun = () => {
                readAgain()
                this.module5.randomKey()
                resetKey()
              }
              const runDown = () => {
                this.module5.children
                  .filter(a => a.name.includes('CCED'))
                  .map(b => (b.visible = false))
                this.module5.correct = '5'
              }
              let readNumber = this.module5.children
                .filter(a => a.name === 'ReadNumber')[0]
                .material.map.image.src.slice(-5)[0]
              this.module5.audio.play()
              if (this.module5.correct === '5') {
                if (Number(readNumber) < 3) {
                  this.module5.quest[0] = [
                    2,
                    Number(
                      this.module5.children
                        .filter(a => a.name === 'Kface2')[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                } else {
                  this.module5.quest[0] = [
                    Number(readNumber),
                    Number(
                      this.module5.children
                        .filter(a => a.name === `Kface${readNumber}`)[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                }
                if (
                  this.intersects[0].object.name[5] ===
                  this.module5.quest[0][0] + ''
                ) {
                  lit('5')
                  this.module5.correct = '6'
                  reRun()
                } else {
                  this.box.audio.play()
                  this.setStrike()
                  reRun()
                }
              } else if (this.module5.correct === '6') {
                if (readNumber === '1') {
                  let position4 = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(b => b.material.map.image.src.slice(-5, -4) === '4')[0]
                  this.module5.quest[1] = [Number(position4.name.slice(-1)), 4]
                } else if (readNumber === '3') {
                  this.module5.quest[1] = [
                    1,
                    Number(
                      this.module5.children
                        .filter(a => a.name === `Kface1`)[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                } else {
                  this.module5.quest[1] = [
                    this.module5.quest[0][0],
                    Number(
                      this.module5.children
                        .filter(
                          a => a.name === `Kface${this.module5.quest[0][0]}`
                        )[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                }
                if (
                  this.intersects[0].object.name[5] ===
                  this.module5.quest[1][0] + ''
                ) {
                  lit('6')
                  this.module5.correct = '7'
                  reRun()
                } else {
                  this.box.audio.play()
                  this.setStrike()
                  runDown()
                  reRun()
                }
              } else if (this.module5.correct === '7') {
                if (readNumber === '1') {
                  let position = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(
                      b =>
                        b.material.map.image.src.slice(-5, -4) ===
                        this.module5.quest[1][1] + ''
                    )[0]
                  this.module5.quest[2] = [
                    Number(position.name.slice(-1)),
                    this.module5.quest[1][1]
                  ]
                } else if (readNumber === '2') {
                  let position = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(
                      b =>
                        b.material.map.image.src.slice(-5, -4) ===
                        this.module5.quest[0][1] + ''
                    )[0]
                  this.module5.quest[2] = [
                    Number(position.name.slice(-1)),
                    this.module5.quest[0][1]
                  ]
                } else if (readNumber === '3') {
                  this.module5.quest[2] = [
                    3,
                    Number(
                      this.module5.children
                        .filter(a => a.name === `Kface3`)[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                } else if (readNumber === '4') {
                  let position4 = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(b => b.material.map.image.src.slice(-5, -4) === '4')[0]
                  this.module5.quest[2] = [Number(position4.name.slice(-1)), 4]
                }
                if (
                  this.intersects[0].object.name[5] ===
                  this.module5.quest[2][0] + ''
                ) {
                  lit('7')
                  this.module5.correct = '8'
                  reRun()
                } else {
                  this.box.audio.play()
                  this.setStrike()
                  runDown()
                  reRun()
                }
              } else if (this.module5.correct === '8') {
                if (readNumber === '1') {
                  this.module5.quest[3] = [
                    this.module5.quest[0][0],
                    Number(
                      this.module5.children
                        .filter(
                          a => a.name === `Kface${this.module5.quest[0][0]}`
                        )[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                } else if (readNumber === '2') {
                  this.module5.quest[3] = [
                    1,
                    Number(
                      this.module5.children
                        .filter(a => a.name === `Kface1`)[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                } else {
                  this.module5.quest[3] = [
                    this.module5.quest[1][0],
                    Number(
                      this.module5.children
                        .filter(
                          a => a.name === `Kface${this.module5.quest[1][0]}`
                        )[0]
                        .material.map.image.src.slice(-5, -4)
                    )
                  ]
                }
                if (
                  this.intersects[0].object.name[5] ===
                  this.module5.quest[3][0] + ''
                ) {
                  lit('8')
                  this.module5.correct = '9'
                  reRun()
                } else {
                  this.box.audio.play()
                  this.setStrike()
                  runDown()
                  reRun()
                }
              } else if (this.module5.correct === '9') {
                if (readNumber === '1') {
                  let position = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(
                      b =>
                        b.material.map.image.src.slice(-5, -4) ===
                        this.module5.quest[0][1] + ''
                    )[0]
                  this.module5.quest[4] = [
                    Number(position.name.slice(-1)),
                    this.module5.quest[0][1]
                  ]
                } else if (readNumber === '2') {
                  let position = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(
                      b =>
                        b.material.map.image.src.slice(-5, -4) ===
                        this.module5.quest[1][1] + ''
                    )[0]
                  this.module5.quest[4] = [
                    Number(position.name.slice(-1)),
                    this.module5.quest[1][1]
                  ]
                } else if (readNumber === '3') {
                  let position = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(
                      b =>
                        b.material.map.image.src.slice(-5, -4) ===
                        this.module5.quest[3][1] + ''
                    )[0]
                  this.module5.quest[4] = [
                    Number(position.name.slice(-1)),
                    this.module5.quest[3][1]
                  ]
                } else if (readNumber === '4') {
                  let position = this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .filter(
                      b =>
                        b.material.map.image.src.slice(-5, -4) ===
                        this.module5.quest[2][1] + ''
                    )[0]
                  this.module5.quest[4] = [
                    Number(position.name.slice(-1)),
                    this.module5.quest[2][1]
                  ]
                }
                if (
                  this.intersects[0].object.name[5] ===
                  this.module5.quest[4][0] + ''
                ) {
                  lit('9')
                  this.handlePass('module5')
                  this.module5.children
                    .filter(a => a.name.includes('Kface'))
                    .map(b => this.removeTarget(b))
                } else {
                  this.box.audio.play()
                  this.setStrike()
                  runDown()
                  reRun()
                }
              }
            }
          }
        }
      }
}