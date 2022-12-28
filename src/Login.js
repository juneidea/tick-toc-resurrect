import React, { useState } from 'react'
import './styles/Login.css'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState()

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
      body: JSON.stringify({userName})
    }).then((res) => res.json()).then((data) => {
      setUserId(data)
    })
  }

  const handleChange = event => {
    setUserName(event.target.value)
  }

  // const {user} = this.props
  // let error = user.error ? user.error.response.data : ''
  // let errorMessage = user.error
  //   ? user.error.response.data.split('-').join(' ')
  //   : ''
  return (
    <>
        <div className="login-form-container">
          <div>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-fields-container">
                <div className="login-field-labels">
                  <div>playername</div>
                  <div>{userId}</div>
                </div>
                <div className="login-fields">
                  <input
                    required
                    name="username"
                    // className={
                    //   error.includes('username') ? `${error}--error` : ''
                    // }
                    onChange={handleChange}
                    value={userName}
                  />
                  {/* {error && (
                    <div className={`${error}--message`}>{errorMessage}</div>
                  )} */}
                </div>
              </div>
              <button className="button2 login-signup--button" type="submit">
                Start
              </button>
            </form>
          </div>
        </div>
    </>
  )
}

export default Login
