import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    sliderList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStoriesFromAPI()
  }

  getStoriesFromAPI = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('accessToken')
    const apiStoriesUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiStoriesUrl, options)
    const storiesData = await response.json()
    console.log(storiesData)
    if (response.ok) {
      const updatedStoriesData = storiesData.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      this.setState({
        sliderList: updatedStoriesData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSliderSuccessView = () => {
    const {sliderList} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
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
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {sliderList.map(eachLogo => {
            const {userId, userName, storyUrl} = eachLogo
            return (
              <div className="slick-item" key={userId}>
                <img className="logo-image" src={storyUrl} alt="company logo" />
                <p className="story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  render() {
    const {apiStatus, sliderList} = this.state
    console.log(apiStatus)
    console.log(sliderList)
    return (
      <>
        <Header />
        <div className="home-container">{this.renderSliderSuccessView()}</div>
      </>
    )
  }
}
export default Home
