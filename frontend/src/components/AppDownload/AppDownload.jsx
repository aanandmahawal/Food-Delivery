import React from 'react'
import './AppDownload.css';
import { assets } from '../../assets/assets';
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br/> Tomato App</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt=""/>
        <img src={assets.app_store} alt=""/>
      </div>
    </div>
  )
}

export default AppDownload




// 🔹 Q1. What is the purpose of the AppDownload component?
// Answer:
// It promotes the mobile version of the app by displaying download options.
// It encourages users to install the app for a better experience.

// 🔹 Q2. How are the store icons dynamically loaded?
// Answer:
// They are imported from the assets object using assets.play_store and assets.app_store.
// This keeps asset management centralized and maintainable.

// 🔹 Q3. Why is an id assigned to the container div?
// Answer:
// The id='app-download' enables anchor link navigation from other components.
// It's commonly used for smooth scrolling or section highlighting.

// 🔹 Q4. How would you improve accessibility in this component?
// Answer:
// Add descriptive alt text to images and use semantic HTML like <section>.
// This ensures screen readers and SEO can interpret the content properly.



