import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {

  const [showLogin,setShowLogin]=useState(false);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<PlaceOrder/>}/>
      <Route path='/Verify' element={<Verify/>}/>
      <Route path='/myorders' element={<MyOrders/>}/>
      
      
    </Routes>
    
  </div>
  <Footer/>
  </>
    
  )
}

export default App



// 🔹 Q1. What is the role of the App component?
// Answer:
// It acts as the main container for your application, defining routes and layout structure.
// It also manages global modal visibility like the login popup.

// 🔹 Q2. How is routing handled in this project?
// Answer:
// React Router’s <Routes> and <Route> components define navigation paths.
// Each route maps to a specific page like Home, Cart, or MyOrders.

// 🔹 Q3. How is user login popup controlled across pages?
// Answer:
// The showLogin state toggles the <LoginPopup /> component conditionally.
// This state is passed to Navbar, enabling global login UI control.

// 🔹 Q4. What is the purpose of the <Navbar /> and <Footer /> in App?
// Answer:
// They wrap all routed pages, ensuring consistent navigation and footer across the site.
// This improves user experience and maintains layout structure.

// 🔹 Q5. Why is <LoginPopup /> placed outside the main .app div?
// Answer:
// Placing it outside ensures it overlays the entire UI when active.
// This positioning supports a modal-style login experience.

// 🔹 Q6. How would you handle protected routes in this app?
// Answer:
// Create a PrivateRoute wrapper that checks authentication using a token.
// Redirect unauthenticated users to login or another safe page.

