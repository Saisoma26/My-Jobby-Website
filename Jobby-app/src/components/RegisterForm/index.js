import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import './index.css'

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    errorMsg: '',
    isRegistered: false,
    description: '',
  }

  onRegistersuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    console.log('set cookies')
    const {history} = this.props
    history.replace('/My-Jobby-Website/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password, confirmPassword, description} = this.state

    if (password !== confirmPassword) {
      this.setState({errorMsg: "Passwords don't match"})
      return
    }

    const userDetails = {username, password, description}
    const url = 'https://my-jobby-website.onrender.com/api/auth/register'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({isRegistered: true})
      this.onRegistersuccess(data)
    } else {
      this.setState({errorMsg: data.message})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  render() {
    const {
      username,
      password,
      confirmPassword,
      errorMsg,
      isRegistered,
      description,
    } = this.state

    if (isRegistered) {
      return <Redirect to="/My-Jobby-Website/login" />
    }

    return (
      <div className="back">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {/* <h1 className="form-heading">Register</h1> */}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              required
              onChange={this.onChangeUsername}
              className="inputel"
            />
            <label htmlFor="description">Descripion</label>
            <textarea
              id="shortdescription"
              value={description}
              onChange={this.onChangeDescription}
              className="inputel"
              placeholder="Write a short description about yourself (max 50 characters)..."
              rows="4"
              cols="50"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={this.onChangePassword}
              className="inputel"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              required
              onChange={this.onChangeConfirmPassword}
              className="inputel"
            />
            {errorMsg && <p className="error-message">*{errorMsg}</p>}
            <button type="submit" className="submit-btn">
              Register
            </button>
            <p>
              Already registered ?
              <Link to="/My-Jobby-Website/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterForm
