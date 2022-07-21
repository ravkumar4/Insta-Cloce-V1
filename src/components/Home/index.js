import {Component} from 'react'

import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserStories from '../UserStories'
import InstaPosts from '../InstaPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Home extends Component {
  state = {
    homePosts: [],
    userStories: [],
    searchInput: '',
    userStoriesLoadingStatus: apiStatusConstants.initial,
    homePagePostsLoadingStatus: apiStatusConstants.initial,
    searchApiStatus: apiStatusConstants.initial,
    searchRequest: false,
  }

  componentDidMount() {
    this.gettingUserHomeDetails()
    this.gettingUserStories()
  }

  onClickingSearchIcon = async () => {
    const token = Cookies.get('jwt_token')
    const {searchInput} = this.state
    if (searchInput !== '') {
      this.setState({
        searchApiStatus: apiStatusConstants.loading,
        searchRequest: true,
      })
      const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        const formattedData = data.posts.map(eachPost => ({
          comments: eachPost.comments.map(eachComment => ({
            username: eachComment.user_name,
            comment: eachComment.comment,
            userId: eachComment.user_id,
          })),
          createdAt: eachPost.created_at,
          likesCount: eachPost.likes_count,
          postDetails: {
            caption: eachPost.post_details.caption,
            imageUrl: eachPost.post_details.image_url,
          },
          postId: eachPost.post_id,
          profilePic: eachPost.profile_pic,
          userId: eachPost.user_id,
          userName: eachPost.user_name,
          likeStatus: false,
        }))
        this.setState({
          homePosts: formattedData,
          searchApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({searchApiStatus: apiStatusConstants.failure})
      }
    }
  }

  searchingInput = input => {
    this.setState({searchInput: input})
  }

  gettingUserHomeDetails = async () => {
    this.setState({
      homePagePostsLoadingStatus: apiStatusConstants.loading,
      searchRequest: false,
    })
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = data.posts.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          username: eachComment.user_name,
          comment: eachComment.comment,
          userId: eachComment.user_id,
        })),
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        likeStatus: false,
      }))
      // console.log(formattedData)
      this.setState({
        homePosts: formattedData,
        homePagePostsLoadingStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({homePagePostsLoadingStatus: apiStatusConstants.failure})
    }
  }

  gettingUserStories = async () => {
    this.setState({userStoriesLoadingStatus: apiStatusConstants.loading})
    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const formattedData = data.users_stories.map(eachStory => ({
        storyUrl: eachStory.story_url,
        userId: eachStory.user_id,
        userName: eachStory.user_name,
      }))
      // console.log(formattedData)
      this.setState({
        userStories: formattedData,
        userStoriesLoadingStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({userStoriesLoadingStatus: apiStatusConstants.failure})
    }
  }

  updatingLikeButton = async id => {
    const {homePosts} = this.state
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const requestDetails = {like_status: true}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(requestDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedHomePosts = homePosts.map(eachPost => {
      if (eachPost.postId === id) {
        return {
          ...eachPost,
          likeStatus: true,
          likesCount: eachPost.likesCount + 1,
        }
      }
      return eachPost
    })
    this.setState({homePosts: updatedHomePosts})
  }

  updatingUnLikeButton = async id => {
    const {homePosts} = this.state

    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${id}/like`
    const requestDetails = {like_status: false}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(requestDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    const updatedHomePosts = homePosts.map(eachPost => {
      if (eachPost.postId === id) {
        return {
          ...eachPost,
          likeStatus: false,
          likesCount: eachPost.likesCount - 1,
        }
      }
      return eachPost
    })
    this.setState({homePosts: updatedHomePosts})
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderingHomePosts = () => {
    const {homePagePostsLoadingStatus, homePosts} = this.state
    switch (homePagePostsLoadingStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container-home-posts" testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderingHomeFailureView()
      case apiStatusConstants.success:
        return homePosts.map(eachPost => (
          <InstaPosts
            updatingLikeButton={this.updatingLikeButton}
            updatingUnLikeButton={this.updatingUnLikeButton}
            key={eachPost.postId}
            eachPost={eachPost}
          />
        ))
      default:
        return null
    }
  }

  renderingHomePageStory = () => {
    const {userStoriesLoadingStatus, userStories} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }
    switch (userStoriesLoadingStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderUserStoriesFailureView()
      case apiStatusConstants.success:
        return (
          <ul className="user-stories-container">
            <Slider {...settings}>
              {userStories.map(eachStory => (
                <UserStories key={eachStory.userId} story={eachStory} />
              ))}
            </Slider>
          </ul>
        )
      default:
        return null
    }
  }

  renderingSearchResults = () => {
    const {searchApiStatus, homePosts} = this.state
    switch (searchApiStatus) {
      case apiStatusConstants.loading:
        return (
          <div className="loader-container-search-home-posts" testid="loader">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      case apiStatusConstants.success:
        if (homePosts.length === 0) {
          return this.renderSearchNotFound()
        }
        return (
          <>
            <h1 className="search-results-heading">Search Results</h1>
            {homePosts.map(eachPost => (
              <InstaPosts
                updatingLikeButton={this.updatingLikeButton}
                updatingUnLikeButton={this.updatingUnLikeButton}
                key={eachPost.postId}
                eachPost={eachPost}
              />
            ))}
          </>
        )

      default:
        return null
    }
  }

  renderingHomeFailureView = () => (
    <div className="loader-container-home-posts">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643991735/alert-triangle_wwsh5r.jpg"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-view-button"
        onClick={this.gettingUserHomeDetails}
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderUserStoriesFailureView = () => (
    <div className="loader-container-home-posts">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643991735/alert-triangle_wwsh5r.jpg"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-view-button"
        onClick={this.gettingUserStories}
        type="button"
      >
        Try again
      </button>
    </div>
  )

  renderSearchNotFound = () => (
    <div className="search-not-found-container">
      <img
        className="search-not-found-image"
        alt="search not found"
        src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1644080071/Group_zk7ytr.jpg"
      />
      <h1 className="search-not-found-heading">Search Not Found</h1>
      <p className="search-not-found-description">
        Try different keyword or search again
      </p>
    </div>
  )

  renderSearchFailureView = () => (
    <div className="my-profile-failure-view">
      <img
        className="failure-view-image-my-profile"
        src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643995483/Group_7522_rbojul.jpg"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        className="failure-view-button"
        onClick={this.onClickingSearchIcon}
        type="button"
      >
        Try again
      </button>
    </div>
  )

  onRefreshingHome = () => {
    this.gettingUserHomeDetails()
    this.gettingUserStories()
  }

  render() {
    const {searchRequest, searchInput} = this.state
    return (
      <div>
        <Header
          onRefreshingHome={this.onRefreshingHome}
          searchingInput={this.searchingInput}
          onClickingSearchIcon={this.onClickingSearchIcon}
          searchInput={searchInput}
        />
        <div className="HomeBackground">
          {!searchRequest && (
            <>
              {this.renderingHomePageStory()}
              <ul className="home-page-post-container">
                {this.renderingHomePosts()}
              </ul>
            </>
          )}
          {searchRequest && <>{this.renderingSearchResults()}</>}
        </div>
      </div>
    )
  }
}
export default Home
