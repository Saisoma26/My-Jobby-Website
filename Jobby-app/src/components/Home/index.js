import {Link} from 'react-router-dom'
import ProjectHeaader from '../ProjectHeader'
import './index.css'

const Home = props => {
  const onClickjobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <ProjectHeaader />
      <div className="home-bg-container">
        <div className="text-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of people are searching for jobs,salary information,company
            reviews.Find the job that fits your abilities and potential
          </p>
          <button className="findJobs-btn" type="button" onClick={onClickjobs}>
            <Link to="/jobs">Find Jobs</Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
