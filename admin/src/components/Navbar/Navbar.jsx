import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt=""/>
      <img className='profile' src={assets.profile_image}  alt=""/>
    </div>
  )
}

export default Navbar


// 🔹 Q1. What is the role of the assets object in this component?
// Answer:
// It provides centralized access to image imports like logo and profile.
// This keeps the component clean and promotes reusability of assets.

// 🔹 Q2. Why is Navbar.css imported separately instead of using inline styles?
// Answer:
// CSS files keep styling separate from logic, enhancing code readability.
// It also supports reusability and easier maintenance of UI styles.

// 🔹 Q3. Why are className used instead of class in JSX?
// Answer:
// In JSX, className is used because class is a reserved keyword in JavaScript.
// React uses className to apply CSS classes to elements.