import React from 'react'
import './styles/NoGames.css'
import './styles/Banner.css'
import {Link} from 'react-router-dom'

const NoGames = () => {
  return (
    <div className="no-games">
      <div className="no-games--header">
        <div>CLASSIFIED INFORMATION: Exercise Security Policy S-9</div>
        <div>DO NOT DISCLOSE</div>
      </div>
      <div className="no-games--status">
        <div className="stamp no-games--stamp">No Games</div>
      </div>
      <div className="no-games--links">
        <Link to="/">
          <button className="button" type="button">
            BACK
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NoGames
