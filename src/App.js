import React, { createContext, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import './styles/App.css'
import './styles/Loader.css'
import Login from './Login'
import Main from './Main'
import PreviousGames from './PreviousGames'
import Footer from './Footer'

const UserContext = createContext(null)

const App = () => {
  const pathname = window.location.pathname
  const [userId, setUserId] = useState(false)
  return (
    <UserContext.Provider value={userId}>
      {pathname !== '/diffusing' &&
          pathname !== '/manual' && <div className="title">TICK-TOC</div>}
      <button onClick={() => setUserId(!userId)} >USER ID</button>
      {userId ? (      
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/previous-games" element={<PreviousGames />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>) : (
      <Routes>
        {/* <Route exact path="/manual" component={Manual} /> */}
        <Route exact path="/" element={<Login />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
      )}
      {pathname !== '/diffusing' &&
          pathname !== '/manual' &&
          pathname !== '/new-game' && <Footer />}
    </UserContext.Provider>
  )
}

export default App