import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import Restaurant from '../Restaurant'
import Footer from '../Footer'

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
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ResturantList extends Component {
  state = {
    productsList: [],
    activeOptionId: sortByOptions[1].value,
    activePage: 1,
    limit: 9,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeOptionId, activePage, limit} = this.state
    const offset = (activePage - 1) * limit
    const sorter = activeOptionId
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${sorter}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.restaurants.length)
      /*       this.setState({})
       */ const updatedData = fetchedData.restaurants.map(restaurant => ({
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
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onChangeSortby = event => {
    this.setState({activeOptionId: event.target.value}, this.getProducts)
  }

  renderProductsLoader = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader type="TailSpin" className="loader" />
    </div>
  )

  handleLeftClick = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      const x = activePage - 1
      this.setState({activePage: x}, this.getProducts)
    }
  }

  handleRightClick = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      const x = activePage + 1
      this.setState({activePage: x}, this.getProducts)
    }
  }

  renderList = () => {
    const x = sortByOptions
    const {activeOptionId, productsList, activePage} = this.state
    return (
      <>
        <div className="popular-rest">
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
            >
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
          <div className="pagination-box">
            <button
              type="button"
              testid="pagination-left-button"
              className="home-butt-1"
              onClick={this.handleLeftClick}
            >
              <MdKeyboardArrowLeft />
            </button>
            <div className="spn-box">
              <span testid="active-page-number" className="span-rest">
                {activePage}
              </span>{' '}
              of 4{' '}
            </div>
            <button
              type="button"
              testid="pagination-right-button"
              className="home-butt-2"
              onClick={this.handleRightClick}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
          <Footer />
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

export default ResturantList
