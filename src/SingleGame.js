import React from 'react'
import {calcSingleGameTime} from './util'
import './styles/SingleGame.css'
import './styles/Banner.css'

const SingleGame = props => {
  const {game} = props
  const status = game.gameStatus ? game.gameStatus : game.status
  const stamp = status === 'failed' ? 'failed' : 'diffused'

  return (
    <div className="single-game">
      <div className="single-game--header">
        <div>CLASSIFIED INFORMATION: Exercise Security Policy S-9</div>
        <div>DO NOT DISCLOSE</div>
      </div>
      <div className="single-game--body">
        <div className="single-game--date">
          <span className="typed">1 Date</span>
          <div className="written">
            {game.createdAt
              ? game.createdAt.slice(0, 10)
              : new Date().toDateString().slice(4)}
          </div>
        </div>
        <div className="single-game--config">
          <span className="typed">2 Bomb Configuration</span>
          <div>
            <span className="written">
              {calcSingleGameTime(game.startTime)}
            </span>
            <span className="written">{`${game.moduleTotal} Modules`}</span>
            <span className="written">{`${
              game.strikesAllowed ? game.strikesAllowed : game.strikeTotal
            } Strikes`}</span>
          </div>
        </div>
        <div className="single-game--result">
          <span className="typed">3 Result</span>
          <div className={`stamp ${stamp}--stamp single-game--status`}>
            {stamp}
          </div>
          <div className="single-game--details">
            <span className="typed">Time Remaining: </span>
            <span className="written">
              {calcSingleGameTime(game.finishTime)}
            </span>
          </div>
        </div>
      </div>
      <div className="single-game--links">{props.children}</div>
    </div>
  )
}

export default SingleGame
