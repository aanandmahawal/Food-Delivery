import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)



// 🔹 Q1. Why is <BrowserRouter> used to wrap the App component?
// Answer:
// It enables client-side routing with React Router.
// All routes inside App will now function without page reloads.

// 🔹 Q2. What does ReactDOM.createRoot(...).render() do here?
// Answer:
// It initializes the React app using the new concurrent root API.
// This is required for React 18+ to support concurrent features.

// 🔹 Q3. Why is index.css imported at the entry point?
// Answer:
// It applies global styles to the entire app.
// Centralizing CSS here ensures consistent base styling across components.