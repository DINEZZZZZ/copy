import React from 'react'
import './Footer.css'
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <span className='logo' >LOGO</span>
                <p>Stand tall, dream big, and never stop chasing your passions.!</p>
                <div className="footer-social-icon">
                <FontAwesomeIcon icon={faFacebook} />
                <FontAwesomeIcon icon={faTwitter} />
                <FontAwesomeIcon icon={faLinkedin} />
                </div>

            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Contact us</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 7358473059</li>
                    <li>contact@my.com</li>
                </ul>
                
            </div>

        </div>
        <hr />
        <p className='footer-copy'>&copy; 2024 Logo.com. All Rights Reserved.</p>
    </div>
  )
}

export default Footer