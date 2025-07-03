import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

    // const[itemCount,setItemCount]=useState(0)
    const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt=''/>
            {
                !cartItems[id]?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className='food-item-counter'>
                    <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
                    <p>{cartItems[id]}</p>
                    <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                </div>
            }
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt=""/>
            </div>

            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>
      
    </div>
  )
}

export default FoodItem




// 🔹 Q1. What does the FoodItem component represent?
// Answer:
// It renders a single food item with image, name, description, and price.
// It also includes cart interaction buttons for adding or removing items.

// 🔹 Q2. How is the cart functionality implemented here?
// Answer:
// Using useContext, it accesses global cartItems, addToCart, and removeFromCart functions.
// It conditionally renders a quantity counter if the item is already in the cart.

// 🔹 Q3. Why is the image URL built using url + /images/ + image?
// Answer:
// The backend serves uploaded images under the /images path.
// This allows correct rendering of dynamic food item images.

// 🔹 Q4. What happens when the add icon is clicked?
// Answer:
// The addToCart(id) function is triggered to increment the item count in global state.
// If the item wasn’t previously in the cart, it’s initialized to 1.

// 🔹 Q5. Why is !cartItems[id] used in the condition?
// Answer:
// It checks whether the current item exists in the cart.
// If not, it displays a single "Add" icon instead of the quantity counter.

// 🔹 Q6. How can this component be optimized for accessibility?
// Answer:
// Add alt text for all images and use semantic buttons instead of <img> for actions.
// Also include ARIA labels for better screen reader support.
