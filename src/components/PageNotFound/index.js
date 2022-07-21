import './index.css'

const PageNotFound = props => {
  const handleHomeButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="page-not-found-container">
      <img
        src="https://res.cloudinary.com/aneesmon/image/upload/v1648988139/Insta_Share/page-not-found-image_wqlqmz.png"
        alt="page not found"
        className="page-not-found-image"
      />
      <h1 className="page-not-found-heading">Page Not Found</h1>
      <p className="page-not-found-desc">
        we are sorry, the page you requested could not be found. <br />
        Please go back to the home page
      </p>
      <button
        className="page-not-found-button"
        type="button"
        onClick={handleHomeButton}
      >
        Home Page
      </button>
    </div>
  )
}
export default PageNotFound
