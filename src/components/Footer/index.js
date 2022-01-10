import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer">
      <img
        src="https://res.cloudinary.com/dx3zbikpn/image/upload/v1641788806/Frame_275tasty_fotter_icon_zxdjov.png"
        alt="website-footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-head">Tasty Kitchens </h1>
      <p className="footer-para">
        The only thing we are serious about is food. Contact us on
      </p>
      <div>
        <FaPinterestSquare
          className="footer-imgs"
          testid="pintrest-social-icon"
        />
        <FaInstagram testid="instagram-social-icon" className="footer-imgs-1" />
        <FaTwitter testid="twitter-social-icon" className="footer-imgs-2" />
        <FaFacebookSquare
          className="footer-imgs-3"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
