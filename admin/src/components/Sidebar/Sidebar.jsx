import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt=""/>
                <p>ADD ITEMS</p>
            </NavLink>

            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt=""/>
                <p>List Items</p>
            </NavLink>

            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt=""/>
                <p>Orders</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar




// 🔹 Q1. What is the use of NavLink in this component?
// Answer:
// NavLink enables navigation and automatically applies an active class.
// It helps users identify the currently active route visually.

// 🔹 Q2. How is routing handled in this Sidebar?
// Answer:
// Each sidebar option uses to='/route' for route-based navigation.
// React Router matches the URL and renders the corresponding component.

// 🔹 Q3. Why are icons added beside each navigation label?
// Answer:
// Icons improve UX by making navigation visually intuitive.
// They also enhance the UI's look and feel for better engagement.

// 🔹 Q4. Why is the Sidebar.css file imported separately?
// Answer:
// It separates styling concerns from JSX logic for maintainability.
// Modular CSS helps apply styles scoped to the Sidebar only.

