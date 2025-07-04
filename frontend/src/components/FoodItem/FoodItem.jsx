import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems = {}, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Gracefully handle quantity
  const quantity = id && cartItems[id] ? cartItems[id] : 0;

  const handleAdd = () => {
    if (typeof addToCart === 'function' && id) {
      addToCart(id);
    } else {
      console.warn("addToCart function or valid id is not available.");
    }
  };

  const handleRemove = () => {
    if (typeof removeFromCart === 'function' && id && cartItems[id] > 0) {
      removeFromCart(id);
    } else {
      console.warn("removeFromCart function or valid id is not available or item not in cart.");
    }
  };

  const imageUrl = image ? `${url}/images/${image}` : assets?.fallback_image || "";

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={imageUrl} alt={name || 'food item'} loading="lazy" />

        {quantity > 0 ? (
          <div className='food-item-counter'>
            <img onClick={handleRemove} src={assets.remove_icon_red} alt="Remove item" />
            <p>{quantity}</p>
            <img onClick={handleAdd} src={assets.add_icon_green} alt="Add item" />
          </div>
        ) : (
          <img className='add' onClick={handleAdd} src={assets.add_icon_white} alt="Add item" />
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name || 'Unnamed Dish'}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description || 'No description available.'}</p>
        <p className="food-item-price">${price !== undefined ? price.toFixed(2) : '--'}</p>
      </div>
    </div>
  );
};

export default FoodItem;




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
