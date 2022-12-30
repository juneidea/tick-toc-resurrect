import React from 'react'
import {Route, Navigate} from 'react-router-dom'
import Bomb from './Bomb/Bomb'

const ProtectedBomb = ({gameStarted, startTime, strikesAllowed}) => {
  if (gameStarted) {
    return <Route element={<Bomb startTime={startTime} strikesAllowed={strikesAllowed} />} />
  } else {
    return <Navigate to="/new-game" />
  }
}

export default ProtectedBomb
