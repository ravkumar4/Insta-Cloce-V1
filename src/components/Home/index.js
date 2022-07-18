import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {
    isShow: false,
  }

  render() {
    const {isShow} = this.state
    console.log(isShow)
    return (
      <>
        <Header />
        <div className="home-container">
          <h1>Home Container</h1>
        </div>
      </>
    )
  }
}
export default Home
