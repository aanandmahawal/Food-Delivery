import React, { useState } from 'react'
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {

  const [category,setCategory] =useState("All");
  return (
    <div>
     <Header/>
     <ExploreMenu category={category} setCategory={setCategory}/>
     <FoodDisplay category={category}/>
     <AppDownload/>
    </div>
  )
}

export default Home




// 🔹 Q1. What is the purpose of the Home component?
// Answer:
// It serves as the main landing page that combines all core sections: header, menu, food list, and app download.
// It manages the selected food category using React state.

// 🔹 Q2. How is category filtering handled in this page?
// Answer:
// The category state is passed to ExploreMenu and FoodDisplay.
// User interaction updates the state, which filters the food list accordingly.

// 🔹 Q3. Why are these components modularized?
// Answer:
// Modular components (Header, ExploreMenu, etc.) enhance code reusability and readability.
// Each handles its own logic and styling independently.

// 🔹 Q4. How would you improve performance on this page?
// Answer:
// Use React.memo or lazy loading for large components and image-heavy content.
// Also consider debouncing category updates if tied to API calls.
