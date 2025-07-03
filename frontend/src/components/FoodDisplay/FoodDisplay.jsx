import React,{useContext} from 'react'
import './FoodDisplay.css'
// import { food_list } from '../../assets/assets'
import {StoreContext} from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {

    const {food_list}=useContext(StoreContext)
  return (

    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          if(category==="All" || category===item.category){
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay




// 🔹 Q1. What is the main purpose of the FoodDisplay component?
// Answer:
// It shows a list of food items filtered by the selected category.
// The data is dynamically rendered using the food_list from global context.

// 🔹 Q2. How is global state accessed in this component?
// Answer:
// useContext(StoreContext) is used to access shared data like food_list.
// This avoids prop drilling and maintains centralized state.

// 🔹 Q3. What filtering logic is used to display food items?
// Answer:
// Items are shown if their category matches the selected one or if All is selected.
// This is handled within the map function's condition.

// 🔹 Q4. Why is the FoodItem component used here?
// Answer:
// It encapsulates the UI logic for rendering each individual food item.
// This keeps FoodDisplay clean and promotes reusability.

// 🔹 Q5. How would you handle empty or loading food_list states?
// Answer:
// Use conditional rendering to show a loading spinner or fallback message.
// This improves UX when data is unavailable or still fetching.

