import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
/* import Header from '../Header'
 */ import './index.css'
import RestaurantList from '../RestaurantList'
/* import Footer from '../Footer'
 */ import SimpleSlider from '../Carousel/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    /* 
    productsList: [],
    activeOptionId: sortByOptions[1].value, */
    imagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    /*     this.getProducts()
     */ this.getImages()
  }

  /*  getProducts = async () => {
    this.setState({
      apiStatusProducts: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId} = this.state
    const offset = ''
    const LIMIT = ''
    const sorter = activeOptionId
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${21}&limit=${9}&sort_by_rating=${sorter}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        hasTableBooking: restaurant.has_table_booking,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        isDeliveringNow: restaurant.is_delivering_now,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        userRating: restaurant.user_rating,
      }))

      this.setState({
        productsList: updatedData,
        apiStatusProducts: apiStatusConstants.success,
      })
    }
  }
 */
  getImages = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/offers`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        imagesList: fetchedData,
      })
    }
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  /*  onChangeSortby = event => {
    this.setState({activeOptionId: event.target.value}, this.getProducts)
  } */

  renderProductsLoader = () => (
    <div
      className="products-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderImagesLoader = () => (
    <div
      className="products-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" className="loader" />
    </div>
  )

  renderList = () => {
    console.log('in home')
    const {imagesList} = this.state
    return (
      <>
        <nav className="nav-header">
          <div className="nav-content">
            <Link to="/" className="header-heading">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1640957000/Frame_274logo_qzx5p5.png"
                alt="website logo"
              />
            </Link>
            <ul className="nav-menu">
              <Link to="/" className="nav-link-text">
                <li>Tasty Kitchens</li>
              </Link>

              <Link to="/" className="nav-link-home">
                <li>Home</li>
              </Link>

              <Link to="/cart" className="nav-link-cart">
                <li>Cart</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="logout-mobile-btn"
              onClick={this.onClickLogout}
            >
              {/* <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="logout icon"
                className="logout-icon"
              /> */}
            </button>
          </div>
          <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
              <Link to="/">
                <li className="nav-menu-item-mobile">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                    alt="nav home"
                    className="nav-bar-image"
                  />
                </li>
              </Link>
              <Link to="/cart">
                <li className="nav-menu-item-mobile">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                    alt="nav cart"
                    className="nav-bar-image"
                  />
                </li>
              </Link>
            </ul>
          </div>
        </nav>
        <div className="home-container">
          <div className="home-content">
            <SimpleSlider data={imagesList} />
          </div>
          {/* <div className="popular-rest">
            <h1 className="heading-home1">Popular Restaurants</h1>
            <p className="para-home1">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <img
              src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641032052/sortsort_uwspna.png"
              alt="sort"
              className="sort-img"
            />
            <div className="sort-box sort-by-container">
              <p className="sort-by"> Sort by</p>
              <select
                className="sort-by-select"
                value={activeOptionId}
                onChange={this.onChangeSortby}
                menuIsOpen={open}
              >
                <img
                  src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641032052/sortsort_uwspna.png"
                  alt="sort"
                  className="sort-img"
                />
                {x.map(eachOption => (
                  <option
                    key={eachOption.value}
                    value={eachOption.value}
                    className="select-option"
                  >
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
            </div>
            <hr className="horizontal" />
            <div className="un-order">
              <ul className="u-list">
                {productsList.map(restaurant => (
                  <Restaurant restaurant={restaurant} key={restaurant.id} />
                ))}
              </ul>
            </div>
          </div> */}
          <RestaurantList />
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderList()
      case apiStatusConstants.inProgress:
        return this.renderProductsLoader()
      default:
        return null
    }
  }
}

export default Home
