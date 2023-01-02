import * as THREE from 'three'

import Lights from './Lights'
import BoxLoader from './Box'
import {sortByKey} from '../util'
import {clockCases} from './modules/clock'

export default class BombClass {
    constructor(mount, state) {
        this.mount = mount
        this.state = state
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(
            36,
            window.innerWidth / window.innerHeight,
            0.25,
            16
          )

        // this.projector = undefined
        this.timer = undefined
        this.targetList = []
    }

    initialize(renderer) {
        this.renderer = renderer
        this.camera.position.set(0, 1.8, 4)
        this.scene.add(new THREE.AmbientLight(0x505050))
    
        const lights = new Lights(this.scene)
        lights.setup()

        const boxLoader = new BoxLoader(this.scene, this.state)
        boxLoader.setup()

        this.renderer.shadowMap.enabled = true
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.mount.appendChild(this.renderer.domElement)
        window.addEventListener('resize', this.onWindowResize(this.camera), false)

        // this.projector = new THREE.Projector()
        this.start()
    }

    handleCountStart() {
        this.timer = setInterval(() => {
            if(this.state.count < 1) clearInterval(this.timer)
            if(this.state.count < 1) clearInterval(this.lastMin)
            const newCount = this.state.count - 1
            this.setState({count: newCount >= 0 ? newCount : 0})
            if (this.scene.children[3].children[2].children[6]) this.calcClock(this.state)
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
        this.scene.children[3].children[2].children[6].children
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
}