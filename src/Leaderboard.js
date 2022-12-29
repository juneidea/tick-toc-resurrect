import React, { useEffect, useState } from 'react'
import './styles/Leaderboard.css'
import './styles/Loader.css'
import {FaCog} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import SingleGame from './SingleGame'
import {calcSingleGameTime} from './util'

const Leaderboard = () => {
  const [selectedGame, setSelectedGame] = useState(0)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('api/games').then((res) => res.json()).then((data) => {
      setGames(data.games)
      setLoading(false)
    })
  }, [])

  const handleClick = (index) => {
    setSelectedGame(index)
  }

  if (loading) return <FaCog className="loader" />
  return (
    <div className="leaderboard">
      <div className="leaders">
        <div className="leaders--header">LEADERBOARD</div>
        <table>
          <tbody>
            <tr className="leaders-table--headers">
              <th>RANK</th>
              <th>PLAYER</th>
              <th>SOLVE TIME</th>
            </tr>
          </tbody>
          <tbody className="leaders-table">
            {games.map((game, index) => {
              const {user: {userName}, finishTime, startTime} = game
              return (
                <tr
                  className="leader-row"
                  key={game.id}
                  onClick={() => handleClick(index)}
                >
                  <td>{index + 1}</td>
                  <td>{userName}</td>
                  <td>{calcSingleGameTime(startTime - finishTime)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Link to="/" className="return">
          <button className="button" type="button">
            BACK
          </button>
        </Link>
      </div>
      <SingleGame game={games[selectedGame]} />
    </div>
  )
}

export default Leaderboard
