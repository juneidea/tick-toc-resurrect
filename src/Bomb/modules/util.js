import {MeshPhongMaterial, Color} from 'three'

export const red = new MeshPhongMaterial({
  color: 0xff0000,
  shininess: 100
})

export const flatRed = new MeshPhongMaterial({
  color: 0xff0000,
  shininess: 10
})

export const brightRed = new MeshPhongMaterial({
  color: 0xee0000,
  shininess: 100
})

export const redTran = new MeshPhongMaterial({
  color: 0xff0000,
  shininess: 100,
  opacity: 0.5,
  transparent: true
})

export const white = new MeshPhongMaterial({
  color: 0xffffff,
  shininess: 100
})

export const black = new MeshPhongMaterial({
  color: 0x000000,
  shininess: 100
})

export const flatBlack = new MeshPhongMaterial({
  color: 0x000000,
  shininess: 10
})

export const blue = new MeshPhongMaterial({
  color: 0x0000ff,
  shininess: 100
})

export const yellow = new MeshPhongMaterial({
  color: 0xffff00,
  shininess: 100
})

export const green = new MeshPhongMaterial({
  color: 0x00ff00,
  shininess: 100
  // opacity: 0.9,
  // transparent: true
})

export const gray = new MeshPhongMaterial({
  color: 0x999999,
  shininess: 100
  // opacity: 0.9,
  // transparent: true
})

export const copper = new MeshPhongMaterial({
  color: 0xaa7755,
  shininess: 100
})

export const buttonMaterial = new MeshPhongMaterial({
  color: 0xccbbaa,
  shininess: 100
})

export const defaultMaterial = new MeshPhongMaterial({
  color: 0xaaaab4,
  shininess: 100
})
export const cubeMaterial = new MeshPhongMaterial({
  color: 0x4c4e5b,
  shininess: 100
})
export const socketMaterial = new MeshPhongMaterial({
  color: 0x4c4e5b,
  shininess: 10
})

export const clockBackground = new MeshPhongMaterial({
  color: 0x222222,
  shininess: 10
})

/*******************
LOGIC
*******************/

const LEDEmissive = new Color(0x000000)

export const LEDMaterialOFF = new MeshPhongMaterial({
  transparent: true,
  opacity: 0.9,
  emissive: LEDEmissive,
  color: LEDEmissive,
  shininess: 100
})

export const LEDMaterialON = new MeshPhongMaterial({
  transparent: true,
  opacity: 0.9,
  emissive: LEDEmissive,
  color: 0x00ff00,
  shininess: 100
})
