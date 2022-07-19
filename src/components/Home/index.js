import {Component} from 'react'
import Header from '../Header'
import UserStory from '../UserStory'
import UserPosts from '../UserPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    return (
      <div className="main-container">
        <Header />
        <UserStory />
        <UserPosts />
      </div>
    )
  }
}
export default Home
