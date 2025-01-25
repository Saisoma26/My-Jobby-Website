import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const SimilarJobsCard = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    rating,
    title,
    location,
    employmentType,
  } = jobdetails

  return (
    <div className="card-bg-container ">
      <div className="name-logo-container">
        <img className="app-logo" alt="company logo" src={companyLogoUrl} />
        <div className="name-container">
          <h1 className="company-name">{title}</h1>
          <div className="rating-container">
            <BsFillStarFill className="star-icon" />
            <p className="rating">{rating}</p>
            <p className="rating">{location}</p>
            <p className="rating">{employmentType}</p>
          </div>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
    </div>
  )
}

export default SimilarJobsCard
