import React, { useRef, useState, useEffect} from 'react'
import {FaCog} from 'react-icons/fa'
import * as THREE from 'three'

import './../styles/Bomb.css'
import './../styles/Banner.css'
import './../styles/Loader.css'
import BombClass from './BombClass'

const Bomb = ({ startTime, strikesAllowed }) => {
  const strikeTotal = strikesAllowed ? 3 : 1
  const [state] = useState({
    count: startTime,
    strikeTotal,
    minute: 0,
    tenSecond: 0,
    singleSecond: 0,
    activated: true
  })

  const mount = useRef(null)

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    
    const canvas = new BombClass(mount.current)
    canvas.initialize(renderer)
    canvas.animate()

    return () => {
      canvas.stop()
    }
  }, [])

  const gameStatus = 'pending'
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
        ref={mount}
      />
    </>
  )
}

export default Bomb