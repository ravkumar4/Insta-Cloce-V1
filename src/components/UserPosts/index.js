import {Component} from 'react'
import Cookies from 'js-cookie'
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
          commentUserId: eachComment.user_id,
          commentUserName: eachComment.user_name,
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

  renderApiView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSliderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    // const {postList} = this.state
    // console.log(postList)
    return (
      <div className="user-post-container">
        {this.renderUserPostsSuccessView()}
      </div>
    )
  }
}
export default UserPost
