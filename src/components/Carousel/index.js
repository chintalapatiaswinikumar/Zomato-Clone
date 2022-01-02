import Carousel from 'flat-carousel'

/* const images = [{src: 'some image'}]
 */
const MyCarousel = props => {
  const {data} = props !== undefined ? props : []
  const {offers} = data !== undefined ? data : []
  const images = offers !== undefined ? offers : []
  console.log('offers', images)

  return (
    <Carousel>
      {images.map(image => (
        <div className="each-slide" key={image.id}>
          <img src={image.image_url} alt={image.id} />
        </div>
      ))}
    </Carousel>
  )
}

export default MyCarousel
