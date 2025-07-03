import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './context/StoreContext.jsx'
// import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
)




// 🔹 Q1. What is the purpose of main.jsx in a React app?
// Answer:
// It initializes the React app by rendering the root component into the DOM.
// It wraps App with global providers like routing and context.

// 🔹 Q2. Why is BrowserRouter used here?
// Answer:
// It enables client-side routing with React Router throughout the app.
// This allows route navigation without full page reloads.

// 🔹 Q3. What does StoreContextProvider provide in this file?
// Answer:
// It supplies global app state like cart, token, and food list to all components.
// This makes state accessible without deep prop drilling.

// 🔹 Q4. Why use ReactDOM.createRoot() instead of ReactDOM.render()?
// Answer:
// createRoot() is part of React 18’s concurrent rendering model.
// It enables features like automatic batching and improved performance.

