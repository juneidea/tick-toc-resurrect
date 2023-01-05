import React, { useRef, useState, useEffect} from 'react'
import {FaCog} from 'react-icons/fa'

import './../styles/Bomb.css'
import './../styles/Banner.css'
import './../styles/Loader.css'
import BombClass from './BombClass'

const Bomb = ({ startTime, strikesAllowed }) => {
  const strikeTotal = strikesAllowed ? 3 : 1
  const [state] = useState({
    startTime,
    count: startTime,
    strikeTotal,
    minute: 0,
    tenSecond: 0,
    singleSecond: 0,
    strikeCount: 0,
    modulesPassed: 0,
  })
  const [activated, setActivated] = useState(false)
  const [restart, setRestart] = useState(false)
  const [gameStatus, setGameStatus] = useState('activating')
  const [finishGame, setFinishGame] = useState({})
  const mount = useRef(null)

  useEffect(() => {
    const canvas = new BombClass(mount.current, state, setActivated, setRestart, setGameStatus, setFinishGame)
    canvas.initialize()
    canvas.animate()
    setTimeout(() => {
      canvas.handleCountStart()
      setActivated(true)
    }, 2000)

    return () => {
      canvas.stop()
    }
  }, [state])

  useEffect(() => {
    const {url, ...game} = finishGame
    if (url) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...game})
      }).then((res) => res.json()).then((data) => {})
    }
  }, [finishGame])

  return (
    <>


      {!restart && !activated && (
        <div className="stamp activating--banner">
          <div>Bomb activating. Get ready.</div>
          <FaCog className="loader" />
        </div>
      )}
      {restart && (
        <div className="banner-container">
          <div className="stamp activating--banner">
            <div className={`banner ${gameStatus}--banner`}>{gameStatus}</div>
            <a id={gameStatus} href='/new-game'>new game</a>
          </div>
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
