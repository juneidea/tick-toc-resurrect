import React from 'react'
import {Link} from 'react-router-dom'

import './styles/Main.css'
import Footer from './Footer'

const Main = ({ userName, setUserName }) => {
  const handleClick = (event) => {
    event.preventDefault()
    sessionStorage.removeItem("playername")
    setUserName(undefined)
  }
  return (
    <>
      <div className="title">TICK-TOC</div>
      <div className="user">{userName}</div>
      <div className="main-container">
        <div>
          <div className="main-options">
            <Link className="main-option" to="new-game">
              Start Game
            </Link>
            <Link className="main-option" to="previous-games">
              Previous Games
            </Link>
            <Link className="main-option" to="leaderboard">
              Leaderboard
            </Link>
          </div>
          <Link to="/">
            <button
              className="button2 logout-button"
              onClick={handleClick}
              type="button"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Main
