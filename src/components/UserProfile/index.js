import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    userProfile: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserProfileDetails()
  }

  getUserProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('accessToken')
    const apiUserProfileUrl = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUserProfileUrl, options)
    const apiUserProfileData = await response.json()
    console.log(apiUserProfileData)
    if (response.ok) {
      const updatedUserProfileData = {
        id: apiUserProfileData.user_details.id,
        userId: apiUserProfileData.user_details.user_id,
        userName: apiUserProfileData.user_details.user_name,
        userBio: apiUserProfileData.user_details.user_bio,
        followersCount: apiUserProfileData.user_details.followers_count,
        followingCount: apiUserProfileData.user_details.following_count,
        postsCount: apiUserProfileData.user_details.posts_count,
        profilePic: apiUserProfileData.user_details.profile_pic,
        posts: apiUserProfileData.user_details.posts.map(eachPost => ({
          id: eachPost.id,
          image: eachPost.image,
        })),
        stories: apiUserProfileData.user_details.stories.map(eachStory => ({
          id: eachStory.id,
          image: eachStory.image,
        })),
      }
      this.setState({
        userProfile: updatedUserProfileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleTryAgain = () => this.getUserProfileDetails()

  renderUserProfileSuccessView = () => {
    const {userProfile} = this.state
    const {
      id,
      userId,
      userName,
      userBio,
      profilePic,
      followersCount,
      followingCount,
      postsCount,
      posts,
    } = userProfile
    console.log(userProfile.stories)
    // console.log(userProfile.stories.id)
    return (
      <div className="user-profile-success-container">
        <div className="user-profile-details-container">
          <img src={profilePic} alt="user profile" className="profile-user" />
          <div className="user-details">
            <h1 className="username">{userName}</h1>
            <div className="user-following-details">
              <p className="user-posts-count">{postsCount} Posts</p>
              <p className="user-followers-count">{followersCount} Followers</p>
              <p className="user-following-count">{followingCount} Following</p>
            </div>
            <p className="profile-user-id">{userId}</p>
            <p className="user-bio">{userBio}</p>
          </div>
        </div>
        {/* <div className="user-stories-container">
          {userProfile.stories.map(story => (
            <img src={story.image} alt="user story" className="story-image" />
          ))}
        </div> */}
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/aneesmon/image/upload/v1648988122/Insta_Share/home-failure-image_twfusi.png"
        alt="failure view"
        className="failure-view"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.handleTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderApiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="user-profile-container">
          {this.renderUserProfileSuccessView()}
        </div>
      </>
    )
  }
}
export default UserProfile
