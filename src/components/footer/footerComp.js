import {BsGift, BsHouse} from 'react-icons/bs'; 
import {FiUser} from 'react-icons/fi';
import { FaFacebookSquare,FaTwitterSquare,FaInstagramSquare,FaLinkedinIn, FaHome, FaStore, FaBriefcase, FaUser } from 'react-icons/fa';
import { AiFillShop } from 'react-icons/ai';
import Logo from '../../assets/images/logo.png';
import './footer.css'

export const FooterComp = () => {

    return(

        <div className="footer-div" >

        <div className="footer-div-top" >
            <a href="/" className="footer-div-top-img" >
                    <img alt="" src={Logo} className="footer-div-top-img-img" />
            </a>
            {/* <a href="/" className="footer-div-top-link" >
                <span className="footer-div-top-link-farmy" >Farmy</span>App
            </a> */}
        </div>

        <div className="footer-div-others" >

            <div className="footer-div-others-contact" >

                <div className="footer-div-others-contact-top" >
                    Follow Us On
                </div>

                <div className="footer-div-others-contact-mid" >
                    
                    <a href="#" className="footer-div-others-contact-mid-link" >

                        <FaFacebookSquare className="footer-div-others-contact-mid-link-ic" />

                        <span className="footer-div-others-contact-mid-link-txt" > Facebook </span>
                    </a>

                    <a href="#" className="footer-div-others-contact-mid-link" >

                        <FaTwitterSquare className="footer-div-others-contact-mid-link-ic" />

                        <span className="footer-div-others-contact-mid-link-txt" > Twitter </span>
                    </a>

                    <a href="#" className="footer-div-others-contact-mid-link" >

                        <FaInstagramSquare className="footer-div-others-contact-mid-link-ic" />

                        <span className="footer-div-others-contact-mid-link-txt" > Instagram </span>
                    </a>

                    <a href="#" className="footer-div-others-contact-mid-link" >

                        <FaLinkedinIn className="footer-div-others-contact-mid-link-ic" />

                        <span className="footer-div-others-contact-mid-link-txt" > Linkedin </span>
                    </a>

                </div>

            </div>

            {/* <div className="footer-div-others-qlinks" >
                <div className="footer-div-others-contact-top footer-div-others-qlinks-top" >
                    Quick Links 
                </div>
                <div className="footer-div-others-qlinks-mid" >

                    <a href="/" className="footer-div-others-qlinks-mid-link" >
                        <BsHouse className="footer-div-others-qlinks-mid-link-ic" />
                        Home
                    </a>

                    <a href="/profile" className="footer-div-others-qlinks-mid-link" >
                        <FiUser className="footer-div-others-qlinks-mid-link-ic" />
                        Profile
                    </a>

                    <a href="/about_referral" className="footer-div-others-qlinks-mid-link" >
                        <BsGift className="footer-div-others-qlinks-mid-link-ic" />
                        Referral
                    </a>

                    <a href="/wholesale" className="footer-div-others-qlinks-mid-link" >
                        <AiFillShop className="footer-div-others-qlinks-mid-link-ic" />
                        Farmers Market
                    </a>

                </div>
            </div>

            <div className="footer-div-others-deli" >
                <div className="footer-div-others-deli-top footer-div-others-contact-top" >
                    our Delivery services  
                </div>
                <div className="footer-div-others-deli-num" >
                    Please Note That food delivery is only available in Ibadan.
                </div>
            </div>

            <div className="footer-div-others-deli" >
                <div className="footer-div-others-deli-top footer-div-others-contact-top" >
                    Contact us  
                </div>
                <div className="footer-div-others-deli-num" >
                    07042995949
                    <br/>
                    info@farmyapp.com
                </div>
            </div> */}

        </div>

    </div>

    );

}