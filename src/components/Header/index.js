import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {FaSearch} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  state = {
    hamburgerDisplay: false,
    searchbar: false,
  }

  onClickMenu = () => {
    this.setState({hamburgerDisplay: true})
  }

  onCLosingMenu = () => {
    this.setState({hamburgerDisplay: false})
  }

  showingSearchBar = () => {
    this.setState(prevState => ({searchbar: !prevState.searchbar}))
  }

  loggingOut = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onSearching = event => {
    const {searchingInput} = this.props
    searchingInput(event.target.value)
  }

  searching = () => {
    const {onClickingSearchIcon} = this.props
    const {match} = this.props
    const {path} = match
    if (path === '/') {
      onClickingSearchIcon()
    }
  }

  refreshingHome = () => {
    const {onRefreshingHome} = this.props
    onRefreshingHome()
  }

  render() {
    const {hamburgerDisplay, searchbar} = this.state
    const {match, searchInput} = this.props
    const {path} = match

    return (
      <nav className="header-style">
        <ul className="top-header-section">
          <div className="logo-heading-container">
            <Link className="Link-cont" to="/">
              <img
                alt="website logo"
                className="header-website-logo"
                src="https://res.cloudinary.com/tejeshreddy17/image/upload/v1643731640/Standard_Collection_8_dwi8fj.jpg"
              />
            </Link>
            <h1 className="header-heading">Insta Share</h1>
          </div>
          <button
            type="button"
            onClick={this.onClickMenu}
            className="hamburger-menu"
          >
            <GiHamburgerMenu />
          </button>
          <ul className="menu-section-large-view">
            <div className="menu-section-top">
              <div className="search-bar">
                <input
                  placeholder="Search Caption"
                  onChange={this.onSearching}
                  className="input-search-style"
                  type="search"
                  value={searchInput}
                />
                <button
                  testid="searchIcon"
                  type="button"
                  className="search-icon-search-bar"
                  onClick={this.searching}
                >
                  <FaSearch />
                </button>
              </div>
              <Link className="link-cont" to="/">
                <button
                  type="button"
                  className={
                    path === '/'
                      ? 'home-profile selected-button'
                      : 'home-profile'
                  }
                >
                  Home
                </button>
              </Link>
              <Link className="link-cont" to="/my-profile">
                <button
                  type="button"
                  className={
                    path === '/my-profile'
                      ? 'home-profile selected-button'
                      : 'home-profile'
                  }
                >
                  Profile
                </button>
              </Link>
              <button
                className="logout-button"
                onClick={this.loggingOut}
                type="button"
              >
                Logout
              </button>
            </div>
          </ul>
        </ul>
        {hamburgerDisplay && window.innerWidth < 576 && (
          <ul className="menu-section">
            <div className="menu-section-top">
              <Link className="link-cont" to="/">
                <button
                  type="button"
                  className={`home-profile ${
                    path === '/' ? 'selected-button' : ''
                  }`}
                >
                  Home
                </button>
              </Link>
              <button
                onClick={this.showingSearchBar}
                type="button"
                className={`search-button ${
                  searchbar === true ? 'selected-button' : ''
                }`}
              >
                Search
              </button>
              <Link className="link-cont" to="/my-profile">
                <button type="button" className="home-profile ">
                  Profile
                </button>
              </Link>
              <button
                className="logout-button"
                onClick={this.loggingOut}
                type="button"
              >
                Logout
              </button>
              <button
                type="button"
                className="close-button"
                onClick={this.onCLosingMenu}
              >
                <AiFillCloseCircle />
              </button>
            </div>
            {searchbar && (
              <div className="search-bar">
                <input
                  placeholder="Search Caption"
                  onChange={this.onSearching}
                  className="input-search-style"
                  type="search"
                  value={searchInput}
                />
                <button
                  testid="searchIcon"
                  type="button"
                  className="search-icon-search-bar"
                  onClick={this.searching}
                >
                  <FaSearch />
                </button>
              </div>
            )}
          </ul>
        )}
        {window.addEventListener('resize', this.checking)}
      </nav>
    )
  }
}
export default withRouter(Header)
