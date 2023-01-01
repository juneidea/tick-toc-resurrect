import * as util from './modules/util'

export default class BoxLoader {
    constructor(scene, GLTFLoader) {
        this.boxLoader = new GLTFLoader()
        this.box = undefined
        this.scene = scene
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

            // add audio
            this.box.audio = document.createElement('audio')
            let source = document.createElement('source')
            source.src = '/models/sound/xBuzzer.mp3'
            this.box.audio.appendChild(source)

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
}
