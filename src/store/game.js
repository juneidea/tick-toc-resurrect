/* eslint-disable no-case-declarations */
/* eslint-disable complexity */

import axios from 'axios'

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

//ACTION TYPES
export const START_GAME = 'START_GAME'
export const SET_STRIKE = 'SET_STRIKE'
export const PASS_MODULE = 'PASS_MODULE'
export const DIFFUSED = 'DIFFUSED'
export const END_GAME = 'END_GAME'
export const RESET_GAME = 'RESET_GAME'
export const REPLAY_GAME = 'REPLAY_GAME'
export const GET_USER_GAMES = 'GET_USER_GAMES'
export const GET_LEADERS = 'GET_LEADERS'
export const IS_DONE_FETCHING = 'IS_DONE_FETCHING'

//ACTION CREATORS
export const startGame = settings => ({type: START_GAME, settings})
export const setStrike = () => ({type: SET_STRIKE})
export const passModule = moduleName => ({type: PASS_MODULE, moduleName})
export const diffused = () => ({type: DIFFUSED})
export const endGame = (status, finishTime) => ({
  type: END_GAME,
  status,
  finishTime
})
export const resetGame = () => ({type: RESET_GAME})
export const replayGame = () => ({type: REPLAY_GAME})
export const getUserGames = data => ({type: GET_USER_GAMES, data})
export const getLeaders = data => ({type: GET_LEADERS, data})
export const isDoneFetching = view => ({type: IS_DONE_FETCHING, view})

// THUNK CREATORS

export const saveGame = game => async () => {
  try {
    // const result = await axios.post('/api/games', game)
  } catch (err) {
    console.error(err)
  }
}

export const fetchLeaders = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/games/`)
    dispatch(getLeaders(data))
    dispatch(isDoneFetching('leaders'))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserGames = offset => async dispatch => {
  try {
    const {data} = await axios.get(`/api/games/previous/${offset}`)
    dispatch(getUserGames(data))
    dispatch(isDoneFetching('previousGames'))
  } catch (err) {
    console.error(err)
  }
}

export default function reducer(state = initialGame, action) {
  switch (action.type) {
    case START_GAME:
      const {startTime, strikesAllowed} = action.settings
      const strikeTotal = strikesAllowed ? 3 : 1
      return {
        ...state,
        startTime,
        strikeTotal,
        strikesAllowed,
        gameStarted: true
      }
    case PASS_MODULE:
      return {
        ...state,
        modules: state.modules.map(module => {
          if (module.name === action.moduleName) module.passed = true
          return module
        }),
        modulesPassed: state.modulesPassed + 1
      }
    case SET_STRIKE:
      return {
        ...state,
        strikeCount: state.strikeCount + 1
      }
    case END_GAME:
      return {
        ...state,
        gameStatus: action.status,
        finishTime: action.finishTime
      }
    case RESET_GAME:
      return initialGame
    case REPLAY_GAME:
      return {
        ...initialGame,
        startTime: state.startTime,
        gameStarted: state.gameStarted,
        strikesAllowed: state.strikesAllowed,
        strikeTotal: state.strikeTotal
      }
    case GET_USER_GAMES:
      return {
        ...state,
        previousGames: {
          ...state.previousGames,
          games: [...state.previousGames.games, ...action.data.games],
          offset: state.previousGames.offset + action.data.limit
        }
      }
    case GET_LEADERS:
      return {
        ...state,
        leaders: {
          games: [...action.data.games]
        }
      }
    case IS_DONE_FETCHING:
      return {
        ...state,
        [action.view]: {...state[action.view], isDoneFetching: true}
      }
    default:
      return state
  }
}
