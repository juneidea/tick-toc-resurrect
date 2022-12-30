import {TextureLoader} from 'three'

var texture1 = new THREE.TextureLoader().load(
  `/models/alphabets/Alp${Math.ceil(Math.random() * 42)}.png`
)
texture1.wrapT = THREE.RepeatWrapping
texture1.repeat.y = -1
var texture2 = new THREE.TextureLoader().load(
  `/models/alphabets/Alp${Math.ceil(Math.random() * 42)}.png`
)
texture2.wrapT = THREE.RepeatWrapping
texture2.repeat.y = -1
var texture3 = new THREE.TextureLoader().load(
  `/models/alphabets/Alp${Math.ceil(Math.random() * 42)}.png`
)
texture3.wrapT = THREE.RepeatWrapping
texture3.repeat.y = -1
var texture4 = new THREE.TextureLoader().load(
  `/models/alphabets/Alp${Math.ceil(Math.random() * 42)}.png`
)
texture4.wrapT = THREE.RepeatWrapping
texture4.repeat.y = -1
