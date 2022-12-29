import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {
  FaRegArrowAltCircleLeft as FaArrowL,
  FaRegArrowAltCircleRight as FaArrowR
} from 'react-icons/fa'

import './styles/NewGame.css'

const NewGame = () => {
  const [startTime, setStartTime] = useState(300)
  const [strikesAllowed, setStrikesAllowed] = useState(true)

  const handleStart = () => {
    // const {startTime, strikesAllowed} = this.state
    // this.props.startGame({
    //   startTime,
    //   strikesAllowed
    // })
    // this.props.history.push('/diffusing')
  }

  const handleTime = char => {
    if (startTime > 30 && char === 'l') {
      setStartTime(startTime - 30)
    } else if (startTime < 360 && char === 'm') {
      setStartTime(startTime + 30)
    }
  }

  const handleStrikes = state => {
    if (state === 'on') setStrikesAllowed(true)
    else if (state === 'off') setStrikesAllowed(false)
  }

  const minute = Math.floor(startTime / 60)
  const seconds = startTime % 60
    return (
      <>
        <div className="new-game-container">
          <div>
            <div className="new-game--config">
              <div>
                <div className="new-game--config-options">
                  <span>TIME</span>
                  <span>STRIKES</span>
                </div>
                <div className="new-game--config-selects">
                  <span>
                    <FaArrowL
                      className="ng-action ng-icon"
                      onClick={() => handleTime('l')}
                    />
                    <span className="time" >
                      {minute}:{seconds === 0 ? '00' : seconds}
                    </span>
                    <FaArrowR
                      className="ng-action ng-icon"
                      onClick={() => handleTime('m')}
                    />
                  </span>
                  <div>
                    <span
                      className={`${
                        strikesAllowed ? 'strikes--active' : 'strikes--inactive'
                      }`}
                      onClick={() => handleStrikes('on')}
                    >
                      ON
                    </span>
                    <span
                      className={`${
                        strikesAllowed ? 'strikes--inactive' : 'strikes--active'
                      }`}
                      onClick={() => handleStrikes('off')}
                    >
                      OFF
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="new-game--select">
              <Link to="/">
                <button className="button" type="button">
                  BACK
                </button>
              </Link>
              <div className="new-game--start" onClick={handleStart}>
                START
              </div>
            </div>
          </div>
        </div>
        <div className="new-game--footer">
          *If you are playing the role of Expert, click{' '}
          <Link to="/manual">here</Link> to access the manual*
        </div>
      </>
    )
}

export default NewGame
