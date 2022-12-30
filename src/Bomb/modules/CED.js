import {MeshPhongMaterial, Color, PointLight} from 'three'

export const CEDcreate = (o, modules, y) => {
  let CED = new PointLight(0x006600, 5, 0.2, 2)
  CED.name = `C${o.name}`
  CED.position.set(0.6, y, -0.7)
  CED.visible = false
  modules.add(CED)
  o.material = new MeshPhongMaterial({
    transparent: true,
    opacity: 0.9,
    emissive: new Color(0x000000),
    color: new Color(0x006600),
    shininess: 70
  })
}
