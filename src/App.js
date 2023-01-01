import React, { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import './styles/App.css'
import './styles/Loader.css'
import Login from './Login'
import Main from './Main'
import NewGame from './NewGame'
import PreviousGames from './PreviousGames'
import Leaderboard from './Leaderboard'
import Manual from './Manual'
import Footer from './Footer'
import Bomb from './Bomb/Bomb'

const App = () => {
  const pathname = window.location.pathname
  const [userName, setUserName] = useState(sessionStorage.getItem("playername"))
  const [gameProps, setGameProps] = useState({ gameStarted: false })
  return (
    <>
      {pathname !== '/diffusing' &&
          pathname !== '/manual' && <div className="title">TICK-TOC</div>}
      {/* {userName && <button>USER: {userName}</button>} */}
      {userName ? (      
      <Routes>
        <Route exact path="/" element={<Main setUserName={setUserName} />} />
        <Route exact path="/new-game" element={<NewGame setGameProps={setGameProps} />} />
        <Route exact path="/previous-games" element={<PreviousGames />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/diffusing" element={gameProps.gameStarted ? <Bomb {...gameProps} /> : <NewGame setGameProps={setGameProps} />} />
        <Route exact path="/manual" element={<Manual />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>) : (
      <Routes>
        <Route exact path="/" element={<Login setUserName={setUserName} />} />
        <Route exact path="/manual" element={<Manual />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
      )}
      {pathname !== '/diffusing' &&
          pathname !== '/manual' &&
          pathname !== '/new-game' && <Footer />}
    </>
  )
}

export default App