import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt=""/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, quisquam.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt=""/>
            <img src={assets.twitter_icon} alt=""/>
            <img src={assets.linkedin_icon} alt=""/>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 XXXX</li>
            <li>123@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr/>
      <p className="footer-copyright">Copyright 2024 @Tomato.com</p>
    </div>
  );
}

export default Footer;




// 🔹 Q1. What is the purpose of the Footer component?
// Answer:
// It provides company branding, navigation links, and contact details at the bottom of the page.
// It also includes social media icons and copyright info.

// 🔹 Q2. How are social media icons displayed in the footer?
// Answer:
// They are imported from the assets object and displayed as <img> elements.
// This keeps the design visually consistent with the rest of the app.

// 🔹 Q3. How is the footer layout structured?
// Answer:
// It uses three main content sections: left (branding), center (company links), and right (contact info).
// This provides a clean and organized layout.

// 🔹 Q4. What improvements would you suggest for accessibility?
// Answer:
// Add meaningful alt text to all icons and wrap links in anchor <a> tags.
// This makes the footer more screen-reader and SEO friendly.

// 🔹 Q5. How would you make the footer responsive for mobile devices?
// Answer:
// Use flex-wrap or media queries to stack sections vertically on smaller screens.
// Also ensure font sizes and spacing adjust fluidly.

