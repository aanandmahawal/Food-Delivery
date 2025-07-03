import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="add">
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here'></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desert">Desert</option>
                            <option value="Sandwich">Sandwitch</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>

                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;




// 🔹 Q1. What is the purpose of this Add component?
// Answer:
// It provides a form interface for admins to add a new food item to the database.
// It handles image uploads, input validation, and sends data to the backend via Axios.

// 🔹 Q2. Why is FormData used instead of sending JSON in this component?
// Answer:
// FormData allows uploading both file (image) and text data in a single request.
// It’s essential for multipart/form-data required when handling images.

// 🔹 Q3. How is image preview implemented before upload?
// Answer:
// URL.createObjectURL(image) is used to generate a temporary preview URL.
// It lets users see the uploaded image before submitting the form.

// 🔹 Q4. What happens after a successful form submission?
// Answer:
// Input fields are reset, the image is cleared, and a success toast is shown.
// This gives immediate feedback and prepares the form for new input.

// 🔹 Q5. Why is toast used and what library does it come from?
// Answer:
// toast from react-toastify shows success or error alerts non-intrusively.
// It improves UX by providing instant feedback without page reloads.

// 🔹 Q6. How is the state of form inputs managed?
// Answer:
// A single data object is used with dynamic onChangeHandler for scalability.
// It ensures each input updates the correct key using event.target.name.

// 🔹 Q7. Why is useState(false) used for image initially?
// Answer:
// It ensures no image is set initially and avoids rendering invalid previews.
// Once a file is selected, the image state stores the file object.

// 🔹 Q8. How does the component ensure the image input is required?
// Answer:
// The input tag for image includes the required attribute.
// It prevents form submission without an image selected.