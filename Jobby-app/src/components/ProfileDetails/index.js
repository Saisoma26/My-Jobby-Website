import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileDetails extends Component {
  state = {profilestatus: apiStatusList.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profilestatus: apiStatusList.loading})

    const jwtToken = Cookies.get('jwt_token')
    console.log('JWT Token front:', jwtToken)
    const url = 'http://localhost:3000/api/auth/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      credentials: 'include',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.updateddatafunc(data)

      this.setState({
        profileDetails: updatedData,
        profilestatus: apiStatusList.success,
      })
    } else {
      this.setState({profilestatus: apiStatusList.failure})
    }
  }

  updateddatafunc = profile => ({
    name: profile.name,
    profileImageUrl: profile.profile_image_url,
    description: profile.description,
  })

  renderprofilecard = () => {
    const {profileDetails} = this.state
    const {name, description} = profileDetails
    return (
      <div className="profile-bg">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{description}</p>
      </div>
    )
  }

  retryFetchProfile = () => {
    this.getProfileDetails()
  }

  renderprofileFailure = () => (
    <button className="retrybtn" type="button" onClick={this.retryFetchProfile}>
      Retry
    </button>
  )

  renderloader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profilestatus = () => {
    const {profilestatus} = this.state
    switch (profilestatus) {
      case apiStatusList.failure:
        return this.renderprofileFailure()
      case apiStatusList.success:
        return this.renderprofilecard()
      case apiStatusList.loading:
        return this.renderloader()
      default:
        return null
    }
  }

  render() {
    return this.profilestatus()
  }
}

export default ProfileDetails
