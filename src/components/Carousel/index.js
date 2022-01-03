import React from 'react'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

import Slider from 'react-slick'

export default function SimpleSlider(props) {
  const {data} = props !== undefined ? props : []
  const {offers} = data !== undefined ? data : []
  const images = offers !== undefined ? offers : []
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: true,
    slidesToScroll: 1,
  }
  console.log(images)
  const renderSlides = () =>
    images.map(image => (
      <div key={image.id}>
        <img src={image.image_url} alt="offer" style={{width: '100%'}} />
      </div>
    ))

  return (
    <div className="car-box">
      <Slider {...settings}>{renderSlides()}</Slider>
    </div>
  )
}
