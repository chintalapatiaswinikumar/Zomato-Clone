import {Link, withRouter} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641303954/erroring_1not_found_akmf1x.png"
      alt="not found"
      className="notfound-img"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found.Please go back to
      homepage
    </p>
    <Link to="/">
      <button type="button" className="butt-not-found">
        Home Page
      </button>
    </Link>
  </div>
)

export default withRouter(NotFound)
