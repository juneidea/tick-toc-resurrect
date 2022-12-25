import React from 'react'
import './styles/Main.css'
import {Link} from 'react-router-dom'

const Main = () => {
  const handleClick = (event) => {
    event.preventDefault()
    // this.props.resetGame()
    // this.props.logout()
  }
  return (
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
  )
}

// const mapDispatch = dispatch => {
//   return {
//     logout: () => dispatch(logout()),
//     resetGame: () => dispatch(resetGame())
//   }
// }

export default Main
