import {BsGift, BsHouse} from 'react-icons/bs'; 
import {FiUser} from 'react-icons/fi';
import { FaFacebookSquare,FaTwitterSquare,FaInstagramSquare,FaLinkedinIn, FaHome, FaStore, FaBriefcase, FaUser } from 'react-icons/fa';
import { AiFillShop } from 'react-icons/ai';
import Logo from '../../assets/images/logo.png';
import './footer.css'

export const FooterComp = () => {

    return(
        <footer className="site-footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <h6>About</h6>
                <p className="text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna 
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis 
                    aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                </p>
              </div>
    
              <div className="col-xs-6 col-md-3">
                <h6>Categories</h6>
                <ul className="footer-links">
                  <li>Shoes</li>
                  <li>Bags</li>
                  <li>Trousers</li>
                  {/* <li>Shirts</li>
                  <li>Hats</li>
                  <li>Track Pants</li> */}
                </ul>
              </div>
    
              <div className="col-xs-6 col-md-3">
                <h6>Quick Links</h6>
                <ul className="footer-links">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
              
            </div>
            <p className="text-justify" style={{
              textAlign:"center"
            }} >
                    This is only a sample site to demonstrate the Authentication capabilities of <a href='https://autharmor.com/' >Auth Armor</a> - This is not a real eCommerce site
                </p>
          </div>
    </footer>

    );

}
