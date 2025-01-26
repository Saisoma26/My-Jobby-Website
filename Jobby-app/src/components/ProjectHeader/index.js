import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const ProjectHeader = props => {
  const onClicklogout = () => {
    const {history} = props
    console.log('before removal:', Cookies.get('jwt_token'))
    Cookies.remove('jwt_token', {
      path: '/My-Jobby-Website/', // Matches the path used during setting
      secure: false, // Matches the secure flag used during setting
    })
    console.log('After removal:', Cookies.get('jwt_token'))
    history.replace('/My-Jobby-Website/login')
    // window.location.reload()
  }

  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="list-item">
          <Link to="/My-Jobby-Website/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
        </li>
        <li className="list-item">
          <ul className="options-container">
            <li className="list-item">
              <Link to="/My-Jobby-Website/">Home</Link>
            </li>
            <li className="list-item">
              <Link to="/My-Jobby-Website/jobs">Jobs</Link>
            </li>
          </ul>
        </li>
        <li className="list-item">
          <button className="logout-btn" type="button" onClick={onClicklogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(ProjectHeader)
