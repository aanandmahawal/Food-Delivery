import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu]=useState("home");
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

    const navigate=useNavigate();

    const logout =()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo"/></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href="#explore-menu"onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href="#app-download"onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href="#footer"onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt=""/>
        <div className="navbar-search-icon">
            <Link to='/cart'>
  <img src={assets.basket_icon} alt="" style={{ height: '25px' }} />
</Link>

            <div className={getTotalCartAmount()===0?"":"dot"}></div>

        </div>

        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>

          </ul>
        </div>
          }

        
      </div>
    </div>
  )
}

export default Navbar





// 🔹 Q1. What is the primary function of the Navbar component?
// Answer:
// It renders the main site navigation with links, search, cart, and user auth control.
// It conditionally displays user options based on authentication status.

// 🔹 Q2. How is user login/logout handled in the navbar?
// Answer:
// If token exists, a dropdown with profile and logout appears; otherwise, a “Sign In” button shows.
// On logout, token is removed from localStorage and redirected to home.

// 🔹 Q3. What is the purpose of getTotalCartAmount() here?
// Answer:
// It checks if the cart has items and conditionally shows a red dot on the cart icon.
// This enhances UX by giving real-time cart status feedback.

// 🔹 Q4. How is navigation handled in this component?
// Answer:
// It uses both <Link> from React Router for full routes and <a href="#id"> for scroll-to-section.
// This mixes internal routing with anchor-based page scrolling.

// 🔹 Q5. How does the navbar highlight the active menu?
// Answer:
// By tracking a menu state and applying an "active" class to the selected item.
// This visually indicates the user’s current navigation context.

// 🔹 Q6. What does setShowLogin(true) do?
// Answer:
// It triggers the login popup to appear by updating the parent state.
// This is part of the conditional rendering of the auth flow.

// 🔹 Q7. How would you improve the responsive behavior of this navbar?
// Answer:
// Add a hamburger menu for smaller screens and use media queries for layout adjustments.
// Improve keyboard accessibility for dropdowns and focus management.


