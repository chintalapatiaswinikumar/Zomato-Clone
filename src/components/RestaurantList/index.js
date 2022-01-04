import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
import Restaurant from '../Restaurant'

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
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
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
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onChangeSortby = event => {
    this.setState({activeOptionId: event.target.value}, this.getProducts)
  }

  renderProductsLoader = () => (
    <div className="products-loader-container" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderList = () => {
    const x = sortByOptions
    const {activeOptionId, productsList} = this.state
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
          {/*             <Footer />
           */}{' '}
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
