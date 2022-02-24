import React from 'react'
import appStore from '../../layout/appstore.png';
import playStore from '../../layout/playstore.png';
import './Footer.css'

function Footer() {
    return (
        <footer id="footer">
            <div className='leftFooter'>
                <h4>Download Our App</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playstore"></img>
                <img src={appStore} alt="appstore"></img>
            </div>
            <div className='midFooter'>
                <h4>ECOMMERCE</h4>
                <p>High quality is our first priority</p>
                <p>CopyRights 2022 &copy; Ecommerce App </p>
            </div>
            <div className='rightFooter'>
                <h4>Follow Us</h4>
                <a href='http://instagram.com'>Instagram</a>
                <a href='http://facebook.com'>Facebook</a>
                <a href='http://youtube.com'>Youtube</a>
                <a href="http://linkedin.com">LinkedIn</a>
            </div>
        </footer>
    )
}

export default Footer