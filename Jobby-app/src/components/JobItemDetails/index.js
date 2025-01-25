import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import ProjectHeader from '../ProjectHeader'
import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {wholejobDetails: {}, loadingstatus: apiStatusList.initial}

  componentDidMount() {
    this.getitemDetails()
  }

  skillsConvertion = eachskill => ({
    imageUrl: eachskill.image_url,
    name: eachskill.name,
  })

  dataConversion = job => ({
    companyLogoUrl: job.company_logo_url,
    companyWebsiteUrl: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    title: job.title,
    jobDescription: job.job_description,
    skills: job.skills.map(each => this.skillsConvertion(each)),
    lifeAtCompany: {
      description: job.life_at_company.description,
      imageUrl: job.life_at_company.image_url,
    },
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
  })

  dataCoversionOfSimilarJobs = job => ({
    companyLogoUrl: job.company_logo_url,
    companyWebsite: job.company_website_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
  })

  getitemDetails = async () => {
    this.setState({loadingstatus: apiStatusList.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `http://localhost:3000/api/auth/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log('in jobitemdetails:', data)
    if (response.ok) {
      const updatedData = {
        jobDetails: this.dataConversion(data.job_details),
        similarJobs: data.similar_jobs.map(each =>
          this.dataCoversionOfSimilarJobs(each),
        ),
      }
      this.setState({
        wholejobDetails: updatedData,
        loadingstatus: apiStatusList.success,
      })
    } else {
      this.setState({loadingstatus: apiStatusList.failure})
    }
  }

  renderApiStatus = () => {
    const {loadingstatus} = this.state
    switch (loadingstatus) {
      case apiStatusList.loading:
        return this.renderloader()
      case apiStatusList.success:
        return this.renderJobDetails()
      case apiStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  retryFetch = () => {
    this.getitemDetails()
  }

  renderFailureView = () => (
    <div className="failureview-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retrybtn" type="button" onClick={this.retryFetch}>
        Retry
      </button>
    </div>
  )

  renderloader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="80" width="80" />
    </div>
  )

  renderJobDetails = () => {
    const {wholejobDetails} = this.state
    const {jobDetails, similarJobs} = wholejobDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      title,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
    } = jobDetails

    return (
      <div className="job-item-details">
        <div className="jobDetails-container">
          <div className="name-logo-container">
            <img
              className="app-logo"
              alt="job details company logo"
              src={companyLogoUrl}
            />
            <div className="name-container">
              <h1 className="company-name">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <hr className="hrline" />
          <div className="extra-options-container">
            <div className="location-and-type-container">
              {/* <IoLocationSharp className="location-icon" /> */}
              <p className="location">{location}</p>
              <BsBriefcaseFill className="case-icon" />
              <p className="type">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="hrline" />
          <div className="description-and-visit-container">
            <h1 className="job-details-description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="visit-url">
              Visit
            </a>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-container">
            {jobDetails.skills.map(each => (
              <div className="each-skill">
                <img
                  src={each.imageUrl}
                  alt="each.name"
                  className="skill-icon"
                  key={each.id}
                />
                <p className="skill-name">{each.name}</p>
              </div>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-description">
            <p className="description">
              {jobDetails.lifeAtCompany.description}
            </p>
            <img
              src={jobDetails.lifeAtCompany.imageUrl}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
        <hr className="hrline" />
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <SimilarJobsCard jobdetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <ProjectHeader />
        {this.renderApiStatus()}
      </div>
    )
  }
}

export default JobItemDetails
