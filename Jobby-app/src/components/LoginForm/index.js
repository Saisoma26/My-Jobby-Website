import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onLoginsuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
      secure: false,
      sameSite: 'Strict',
    })
    console.log('set cookies')
    const {history} = this.props
    history.replace('/')
  }

  onSubmitform = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://my-jobby-website.onrender.com/api/auth/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Add this header
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('responsedata:', data)
    if (response.ok) {
      console.log('goint to onLoginsuccess')
      this.onLoginsuccess(data)
    } else {
      console.log(data.error_msg)
      this.setState({errorMsg: data.message})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangepassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state

    const accessToken = Cookies.get('jwt_token')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="back">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitform}>
            <label htmlFor="username" className="inputel-label">
              USERNAME
            </label>
            <input
              className="inputel"
              id="username"
              type="text"
              onChange={this.onChangeUsername}
              value={username}
              placeholder="Username"
            />
            <label htmlFor="password" className="inputel-label">
              PASSWORD
            </label>
            <input
              className="inputel"
              type="password"
              id="password"
              onChange={this.onChangepassword}
              value={password}
              placeholder="Password"
            />
            <button className="submit-btn" type="submit">
              Login
            </button>
            <p>
              Do not have account ? <Link to="/register">Register</Link>
            </p>
          </form>
          {errorMsg && <p className="errmsg">{errorMsg}</p>}
        </div>
      </div>
    )
  }
}

export default LoginForm
