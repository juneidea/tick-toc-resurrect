import * as THREE from 'three'

export default class Lights {
    constructor(scene) {
        this.scene = scene
        this.spotLight = new THREE.SpotLight(0xffffff)
        this.dirLight = new THREE.DirectionalLight(0x55505a, 1)
    }

    setup() {
        this.spotLight.angle = Math.PI / 4
        this.spotLight.penumbra = 0.2
        this.spotLight.position.set(3.2, 3.2, 2.9)
        this.spotLight.castShadow = true
        this.spotLight.shadow.camera.near = 3
        this.spotLight.shadow.camera.far = 10
        this.spotLight.shadow.mapSize.width = 1024
        this.spotLight.shadow.mapSize.height = 1024
    
        this.scene.add(this.spotLight)

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
    }
}