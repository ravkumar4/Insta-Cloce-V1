import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    showErrorMessage: false,
  }

  handleUsername = event => this.setState({username: event.target.value})

  handlePassword = event => this.setState({password: event.target.value})

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 1})
    history.replace('/')
  }

  onSubmitFailure = errMsg =>
    this.setState({showErrorMessage: true, errorMessage: errMsg})

  submitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const apiData = await response.json()
    if (response.ok) {
      return this.onSubmitSuccess(apiData.jwt_token)
    }
    return this.onSubmitFailure(apiData.error_msg)
  }

  render() {
    const {username, password, errorMessage, showErrorMessage} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/aneesmon/image/upload/v1648363086/Insta_Share/login-image_q0hj2s.png"
          alt="website login"
          className="landing-image"
        />

        <form className="login-form-container" onSubmit={this.submitLoginForm}>
          <img
            src="https://res.cloudinary.com/aneesmon/image/upload/v1648277533/Insta_Share/website-logo_yvroxv.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="insta-share-heading"> Insta Share</h1>
          <label htmlFor="username" className="username-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-username"
            placeholder="Username"
            value={username}
            onChange={this.handleUsername}
          />
          <label htmlFor="password" className="password-label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-password"
            placeholder="Password"
            value={password}
            onChange={this.handlePassword}
          />
          {showErrorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default Login
