import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Main from './Main'
import PreviousGames from './PreviousGames'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/previous-games" element={<PreviousGames />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App