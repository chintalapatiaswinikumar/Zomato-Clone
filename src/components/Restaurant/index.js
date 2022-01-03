import {Component} from 'react'
import './index.css'

class Restaurant extends Component {
  render() {
    /*     console.log('props', this.props)
     */ const {restaurant} = this.props
    const {name, menuType, userRating, imageUrl} = restaurant
    /*     const {rating, rating_color, rating_text, total_reviews} = userRating
     */ return (
      <li className="rest-container" testid="restaurant-item">
        <img src={imageUrl} alt="restaurant" className="rest-img" />
        <div className="box11">
          <h1 className="title">{name}</h1>
          <p className="brand">{menuType}</p>
          <div className="rating-container">
            <img
              src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641100478/7_Ratingstar_ejbb0z.png"
              alt="star"
              className="star"
            />
            <p className="rating">{userRating.rating}</p>
            <p className="rate">({userRating.total_reviews} ratings)</p>
          </div>
        </div>
      </li>
    )
  }
}

export default Restaurant
