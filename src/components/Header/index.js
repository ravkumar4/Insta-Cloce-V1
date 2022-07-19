import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {FiMenu} from 'react-icons/fi'
import './index.css'

class Header extends Component {
  state = {searchInput: ''}

  handleSearchInput = event => this.setState({searchInput: event.target.value})

  renderDesktopHeader = () => {
    const {searchInput} = this.state
    return (
      <div className="desktop-items-container">
        <div className="search-container">
          <input
            type="search"
            placeholder="Search Caption"
            className="search-bar"
            value={searchInput}
            onChange={this.handleSearchInput}
          />
          <button type="button" className="search-button">
            <FaSearch className="search-icon" />
          </button>
        </div>
        <ul className="routes-list">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" testid="searchIcon">
          Logout
        </button>
      </div>
    )
  }

  renderMobileHeader = () => (
    <div className="mobile-menu-icon">
      <FiMenu />
    </div>
  )

  render() {
    return (
      <nav className="navbar-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/aneesmon/image/upload/v1648277533/Insta_Share/website-logo_yvroxv.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="insta-share-heading"> Insta Share</h1>
        </div>
        {this.renderDesktopHeader()}
        {this.renderMobileHeader()}
      </nav>
    )
  }
}
export default Header
