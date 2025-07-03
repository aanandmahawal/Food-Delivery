import logo from './logo.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'

export const assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon
}

export const url = 'https://food-delivery-backend-3q5b.onrender.com'



// 🔹 Q1. Why are image assets imported in a separate file instead of directly in components?
// Answer:
// It helps centralize and organize all assets, making components cleaner.
// This approach also simplifies updates, as assets can be managed from one place.

// 🔹 Q2. Why is the backend URL defined as a constant in this file?
// Answer:
// It avoids hardcoding API URLs across components and improves maintainability.
// For production, environment variables should be used to switch URLs easily.
