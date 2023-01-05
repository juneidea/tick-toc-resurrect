import React, { useState } from 'react'
import './styles/Login.css'
import Footer from './Footer'

const Login = ({ setUserName }) => {
  const [playerName, setPlayerName] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    fetch('auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName: playerName})
    }).then((res) => res.json()).then((data) => {
      sessionStorage.setItem("playername", data.userName);
      setUserName(data.userName)
    })
  }

  const handleChange = event => {
    setPlayerName(event.target.value)
  }

  return (
    <>
        <div className="title">TICK-TOC</div>
        <div className="login-form-container">
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-fields-container">
                <div className="login-field-labels">
                  <div>playername</div>
                </div>
                <div className="login-fields">
                  <input
                    required
                    name="username"
                    onChange={handleChange}
                    value={playerName}
                    spellCheck={false}
                  />
                </div>
              </div>
              <button className="button2 login-signup--button" type="submit">
                Start
              </button>
            </form>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default Login
