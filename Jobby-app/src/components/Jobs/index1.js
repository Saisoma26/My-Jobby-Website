import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import ProjectHeader from '../ProjectHeader'
import JobItemCard from '../JobItemCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    typeOfemplList: [],
    salaryoption: '0',
    searchInput: '',
    jobsList: [],
    jobstatus: apiStatusList.initial,
    profilestatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  convertData = eachItem => ({
    companyLogoUrl: eachItem.company_logo_url,
    employmentType: eachItem.employment_type,
    id: eachItem.id,
    jobDescription: eachItem.job_description,
    location: eachItem.location,
    packagePerAnnum: eachItem.package_per_annum,
    rating: eachItem.rating,
    title: eachItem.title,
  })

  getJobsDetails = async () => {
    this.setState({jobstatus: apiStatusList.loading})

    const jwtToken = Cookies.get('jwt_token')
    const {salaryoption, typeOfemplList, searchInput} = this.state
    const liststr = typeOfemplList.join(',')
    console.log(liststr)
    const url = `http://localhost:3000/api/auth/jobs?employment_type=${liststr}&minimum_package=${salaryoption}$search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => this.convertData(each))
      this.setState({
        jobsList: updatedData,
        jobstatus: apiStatusList.success,
      })
    } else {
      this.setState({jobstatus: apiStatusList.failure})
    }
  }

  updateddatafunc = profile => ({
    name: profile.name,
    profileImageUrl: profile.profile_image_url,
    shortBio: profile.description,
  })

  getProfileDetails = async () => {
    this.setState({profilestatus: apiStatusList.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://localhost:3000/api/auth/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileDetails = data.profile_details

      const updatedData = this.updateddatafunc(profileDetails)

      this.setState({
        profileDetails: updatedData,
        profilestatus: apiStatusList.success,
      })
    } else {
      this.setState({profilestatus: apiStatusList.failure})
    }
  }

  profilecard = () => {
    const {profileDetails} = this.state
    const {name, shortBio} = profileDetails
    return (
      <div className="profile-bg">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  employType = () => (
    <>
      <h1 className="Type-of-Employment">Type of Employment</h1>
      <ul className="type-list">
        {employmentTypesList.map(each => {
          const onChangeemploymentType = () => {
            const {typeOfemplList} = this.state
            console.log(typeOfemplList)
            if (!typeOfemplList.includes(each.employmentTypeId)) {
              this.setState(
                prevState => ({
                  typeOfemplList: [
                    ...prevState.typeOfemplList,
                    each.employmentTypeId,
                  ],
                }),
                this.getJobsDetails,
              )
            } else {
              this.setState(
                prevState => ({
                  typeOfemplList: prevState.typeOfemplList.filter(
                    eachitem => eachitem !== each.employmentTypeId,
                  ),
                }),
                this.getJobsDetails,
              )
            }
          }
          return (
            <div className="option-container">
              <input
                className="checkbox"
                name="employmentType"
                type="checkbox"
                id={each.employmentTypeId}
                onChange={onChangeemploymentType}
              />
              <label className="label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </div>
          )
        })}
      </ul>
    </>
  )

  salaryOptions = () => (
    <div className="salaryoptions-container">
      <h1 className="salaryrange-hd">Salary Range</h1>
      <ul className="salayranges-list">
        {salaryRangesList.map(each => {
          const onChangevalue = () => {
            this.setState(
              {salaryoption: each.salaryRangeId},
              this.getJobsDetails,
            )
          }
          return (
            <div className="option-container">
              <input
                className="radio"
                name="salaryrange"
                type="radio"
                id={each.salaryRangeId}
                onChange={onChangevalue}
              />
              <label className="label" htmlFor={each.salaryRangeId}>
                {each.label}
              </label>
            </div>
          )
        })}
      </ul>
    </div>
  )

  renderjobsList = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="noJobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="noproducts-pic"
          />
          <h1 className="noJobs-heading">No jobs Found</h1>
          <p className="noJobs-text">
            We could not find any jobs.Try other filters.
          </p>
        </div>
      )
    }
    return (
      <ul className="jobslist">
        {jobsList.map(each => (
          <JobItemCard itemDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  retryFetch = () => {
    this.getJobsDetails()
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
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFetchStatus = () => {
    const {jobstatus} = this.state
    switch (jobstatus) {
      case apiStatusList.loading:
        return this.renderloader()
      case apiStatusList.failure:
        return this.renderFailureView()
      case apiStatusList.success:
        return this.renderjobsList()
      default:
        return null
    }
  }

  retryFetchProfile = () => {
    this.getProfileDetails()
  }

  renderprofileFailure = () => (
    <button className="retrybtn" type="button" onClick={this.retryFetchProfile}>
      Retry
    </button>
  )

  profilestatus = () => {
    const {profilestatus} = this.state
    switch (profilestatus) {
      case apiStatusList.failure:
        return this.renderprofileFailure()
      case apiStatusList.success:
        return this.getProfileDetails()
      case apiStatusList.loading:
        return this.renderloader()
      default:
        return null
    }
  }

  render() {
    const {typeOfemplList} = this.state
    const liststr = typeOfemplList.join(',')
    console.log(liststr)

    return (
      <>
        <ProjectHeader />
        <div className="jobs-bg-container">
          <div className="side-container">
            {this.profilestatus()}
            <hr className="hrline" />
            {this.employType()}
            <hr className="hrline" />
            {this.salaryOptions()}
          </div>
          <div className="right-side-container">
            <div className="input-container">
              <input
                className="inputel"
                placeholder="Search"
                type="search"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.searchStart}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderFetchStatus()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
