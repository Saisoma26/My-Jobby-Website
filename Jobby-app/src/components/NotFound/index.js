import './index.css'
import ProjectHeader from '../ProjectHeader'

const NotFound = () => (
  <>
    <ProjectHeader />
    <div className="notfound-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-image"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="notfound-text">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
