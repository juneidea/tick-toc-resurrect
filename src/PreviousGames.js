import React from 'react'
import './styles/PreviousGames.css'
import './styles/Loader.css'
// import {FaCog} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import SingleGame from './SingleGame'
import NoGames from './NoGames'

const initialGame = {
  startTime: 180,
  minTime: 30,
  maxTime: 360,
  finishTime: 0,
  moduleTotal: 5,
  modulesPassed: 0,
  strikesAllowed: true,
  strikeTotal: 3,
  strikeCount: 0,
  modules: [
    {
      name: 'Wires',
      passed: false
    },
    {
      name: 'BigButton',
      passed: false
    },
    {
      name: 'Maze',
      passed: false
    },
    {
      name: 'Letters',
      passed: false
    },
    {
      name: 'Keys',
      passed: false
    }
  ],
  gameStarted: false,
  gameStatus: 'pending',
  previousGames: {
    games: [],
    offset: 0,
    isDoneFetching: false
  },
  leaders: {
    games: [],
    isDoneFetching: false
  }
}

const PreviousGames = () => {
  const [pageNumber] = React.useState(0)

  // componentDidMount() {
  //   const {offset, games} = this.props.previousGames
  //   if (games.length === 0) {
  //     this.props.fetchUserGames(offset)
  //   }
  // }

  // componentDidUpdate() {
  //   const {offset, games} = this.props.previousGames
  //   if (
  //     this.state.pageNumber > Math.round(games.length * 0.75) &&
  //     games.length % offset === 0
  //   ) {
  //     this.props.fetchUserGames(offset)
  //   }
  // }

  const handlePageChange = event => {
    // const {name} = event.target
    // const {pageNumber} = this.state
    // const {games} = this.props.previousGames
    // if (pageNumber < games.length - 1 && name === 'previous') {
    //   this.setState(prevState => ({
    //     pageNumber: prevState.pageNumber + 1
    //   }))
    // } else if (pageNumber > 0 && name === 'last') {
    //   this.setState(prevState => ({
    //     pageNumber: prevState.pageNumber - 1
    //   }))
    // }
  }

  const {games} = initialGame.previousGames
  const game = initialGame
  // if (!isDoneFetching) return <FaCog className="loader" />
  if (!game) return <NoGames />
    return (
      <div>
        <SingleGame game={initialGame}>
          <Link to="/">
            <button className="button" type="button">
              BACK
            </button>
          </Link>
          {games.length > 1 && (
            <div>
              {pageNumber > 0 && (
                <button
                  type="button"
                  className="button"
                  name="last"
                  onClick={handlePageChange}
                >
                  PREVIOUS
                </button>
              )}
              <button
                type="button"
                name="previous"
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

// const mapState = ({game: {previousGames, isDoneFetching}}) => ({
//   previousGames,
//   isDoneFetching
// })

// const mapDispatch = dispatch => ({
//   fetchUserGames: offset => dispatch(fetchUserGames(offset))
// })

export default PreviousGames
