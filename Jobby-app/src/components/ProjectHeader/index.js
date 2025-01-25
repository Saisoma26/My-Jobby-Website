import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const ProjectHeader = props => {
  const onClicklogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="list-item">
          <Link to="/">
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
              <Link to="/">Home</Link>
            </li>
            <li className="list-item">
              <Link to="/jobs">Jobs</Link>
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
