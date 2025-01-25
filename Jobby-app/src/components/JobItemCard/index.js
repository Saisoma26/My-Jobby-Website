import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {AiFillEnvironment} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

const JobItemCard = props => {
  const {itemDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = itemDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`}>
        <div className="cardbg-container">
          <div className="name-logo-container">
            <img className="applogo" alt="company logo" src={companyLogoUrl} />
            <div className="name-container">
              <h1 className="company-name">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="extra-options-container">
            <div className="location-and-type-container">
              <AiFillEnvironment className="location-icon" />
              <p className="location">{location}</p>
              <BsBriefcaseFill className="case-icon" />
              <p className="type">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="hrline" />
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItemCard
