import React from 'react'
import './Header.css';
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your food here</h2>
        <p> Choose from a diverse menu featuring a deletable array of dishes crafted</p>
        <button>View Menu</button>
      </div>
    </div>
  )
}

export default Header



// 🔹 Q1. What is the role of the Header component?
// Answer:
// It serves as a landing section with a promotional message and call-to-action.
// This sets the tone for the app and encourages users to view the menu.

// 🔹 Q2. How is the call-to-action implemented?
// Answer:
// A simple <button> labeled "View Menu" is used to prompt user interaction.
// It can later be linked to smooth scroll or navigation logic.

// 🔹 Q3. How can this header be made more engaging?
// Answer:
// Add a background image, animation, or dynamic tagline using CSS or JS.
// You could also use React Router to link the button to the menu section.

// 🔹 Q4. What improvements would enhance accessibility here?
// Answer:
// Add ARIA labels to the button and ensure proper heading hierarchy.
// Also, increase contrast ratio between text and background.



