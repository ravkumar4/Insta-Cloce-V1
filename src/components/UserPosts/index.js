import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import PostItemDetails from '../PostItemDetails'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPost extends Component {
  state = {
    postList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('accessToken')
    const apiPostsUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiPostsUrl, options)
    const apiPostsData = await response.json()
    if (response.ok) {
      const updatedPostsData = apiPostsData.posts.map(eachPost => ({
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        comments: eachPost.comments.map(eachComment => ({
          userId: eachComment.user_id,
          userName: eachComment.user_name,
          comment: eachComment.comment,
        })),
        caption: eachPost.post_details.caption,
        imageUrl: eachPost.post_details.image_url,
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
      }))
      this.setState({
        postList: updatedPostsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserPostsSuccessView = () => {
    const {postList} = this.state
    return (
      <ul className="user-post-success-container">
        {postList.map(postDetails => (
          <PostItemDetails key={postDetails.postId} post={postDetails} />
        ))}
      </ul>
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
        return this.renderUserPostsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <div className="user-post-container">{this.renderApiView()}</div>
  }
}
export default UserPost
