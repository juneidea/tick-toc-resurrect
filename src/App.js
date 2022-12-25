import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import Main from './Main'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App