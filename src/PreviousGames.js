import React, { useEffect, useState } from 'react'
import './styles/PreviousGames.css'
import './styles/Loader.css'
import { FaCog } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import SingleGame from './SingleGame'
import NoGames from './NoGames'

const PreviousGames = ({userName}) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('api/games/previous').then((res) => res.json()).then((data) => {
      setGames(data.games)
      setLoading(false)
    })
  }, [])

  const handlePageChange = event => {
    const {name} = event.target
    if (pageNumber < games.length - 1 && name === 'next') {
      setPageNumber(pageNumber + 1)
    } else if (pageNumber > 0 && name === 'previous') {
      setPageNumber(pageNumber - 1)
    }
  }

  const game = games[pageNumber]
  if (loading) return <FaCog className="loader" />
  if (!game) return <NoGames />
  return (
    <div>
      <div className="user">{userName}</div>
      <SingleGame game={game}>
        <Link to="/">
          <button className="button" type="button">
            MAIN MENU
          </button>
        </Link>
        {games.length > 1 && (
          <div>
            {pageNumber > 0 && (
              <button
                type="button"
                className="button"
                name="previous"
                onClick={handlePageChange}
              >
                PREVIOUS
              </button>
            )}
            <button
              type="button"
              name="next"
              className="button"
              onClick={handlePageChange}
            >
              NEXT
            </button>
          </div>
        )}
      </SingleGame>
    </div>
  )
}

export default PreviousGames
