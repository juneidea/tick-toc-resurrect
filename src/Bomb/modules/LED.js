import {MeshPhongMaterial, Color, PointLight} from 'three'

export const ranPos = () => {
  return Math.ceil(Math.random() * 6)
}

export const LEDcreate = (o, modules, name) => {
  let em = new Color(0x000000)
  let LED = new PointLight(0x00ff00, 5, 0.2, 2)
  LED.name = name
  LED.position.copy(o.position)
  LED.visible = false
  modules.add(LED)
  o.material = new MeshPhongMaterial({
    transparent: true,
    opacity: 0.9,
    emissive: em,
    color: em,
    shininess: 100
  })
}
