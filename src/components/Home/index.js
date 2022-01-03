import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'
import Restaurant from '../Restaurant'
import Footer from '../Footer'
import SimpleSlider from '../Carousel/index'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId: sortByOptions[1].value,
    imagesList: [],
    open: true,
  }

  componentDidMount() {
    this.getProducts()
    this.getImages()
  }

  getProducts = async () => {
    this.setState({
      isLoading: true,
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
      /*       console.log('data', updatedData)
       */
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  getImages = async () => {
    this.setState({
      isLoading: true,
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
    /*     console.log('fetch', response)
     */
    if (response.ok) {
      const fetchedData = await response.json()
      /*       console.log('fetch', fetchedData)
       */ this.setState({isLoading: false, imagesList: fetchedData})
    }
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onChangeSortby = event => {
    this.setState({activeOptionId: event.target.value}, this.getProducts)
  }

  renderLoader = () => (
    <div
      className="products-loader-container"
      testid="restaurants-offers-loader"
    >
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderList = () => {
    const x = sortByOptions
    const {activeOptionId, productsList, imagesList, open} = this.state
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
              <Link to="/products">
                <li className="nav-menu-item-mobile">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                    alt="nav products"
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
          <div className="popular-rest">
            <h1 className="heading-home1">Popular Restaurant</h1>
            <p className="para-home1">
              Select Your favorite restaurant special dish and make your day
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
            {/*             <Footer />
             */}{' '}
          </div>
        </div>
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderList()
  }
}

export default Home
