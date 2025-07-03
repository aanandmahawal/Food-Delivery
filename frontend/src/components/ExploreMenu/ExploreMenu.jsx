import React from 'react'
import './ExploreMenu.css';
import {menu_list}  from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {


  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam, expedita?</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=""/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
      
    </div>
  )
}

export default ExploreMenu



// 🔹 Q1. What does the ExploreMenu component do?
// Answer:
// It displays a list of food categories the user can explore.
// Clicking a category updates the selected state via setCategory.

// 🔹 Q2. How does category selection toggle work?
// Answer:
// If a user clicks the same category again, it resets to "All".
// This logic is handled via a conditional inside the onClick.

// 🔹 Q3. How is dynamic styling applied to images?
// Answer:
// An "active" class is conditionally applied based on selected category.
// This visually highlights the currently selected category.

// 🔹 Q4. Why is key={index} used in the map function?
// Answer:
// It uniquely identifies each element in the list for React's reconciliation.
// Using index avoids warnings but may be improved with a stable ID.

// 🔹 Q5. How would you make this component more responsive?
// Answer:
// Use media queries or a CSS grid/flexbox layout to adjust item flow.
// Also ensure image and text scale properly on smaller screens.

