import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route} from 'react-router-dom'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import Add from './pages/Add/Add'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url="https://food-delivery-backend-3q5b.onrender.com"
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>

        </Routes>
      </div>
    </div>
  )
}

export default App



// 🔹 Q1. What is the role of Routes and Route in this app?
// Answer:
// They define client-side routing using React Router.
// Each route loads a different page component based on the URL path.

// 🔹 Q2. Why is the url constant passed as a prop to components?
// Answer:
// It provides the backend URL for API calls within child components.
// This avoids hardcoding the URL inside each component.

// 🔹 Q3. What does <ToastContainer /> do in this file?
// Answer:
// It renders a container to show toast notifications globally.
// It’s required for react-toastify to display alerts like success or error.

// 🔹 Q4. Why is the layout split between Navbar, Sidebar, and content?
// Answer:
// It ensures a clean UI with reusable components and structured layout.
// Sidebar handles navigation while routes render main content.

// 🔹 Q5. How is the base app layout structured here?
// Answer:
// The layout includes a top Navbar, a Sidebar, and dynamic route-based content.
// This keeps navigation persistent while the main content updates.

// 🔹 Q6. How would you extend this layout to include a login page?
// Answer:
// Add a /login route and conditionally render Navbar and Sidebar only if logged in.
// Use route protection or context for authentication-based layout control.
