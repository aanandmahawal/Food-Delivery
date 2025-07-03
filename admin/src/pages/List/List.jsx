import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify";
const List = ({url}) => {

  
  const [list,setList]=useState([]);


  const fetchList=async ()=>{
    const response=await axios.get(`${url}/api/food/list`);
    

    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error");
    }

  }

  const removeFood=async(foodId)=>{
    const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error");
    }
  }
  

  useEffect(()=>{
    fetchList();
  },[])
  
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">

            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>

        </div>

        {list.map((item,index)=>{
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt=""/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)}className='cursor'>X</p>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List





// 🔹 Q1. What is the main purpose of the List component?
// Answer:
// It displays a list of all food items with options to view and delete them.
// It fetches data from the backend and renders it dynamically.

// 🔹 Q2. Why is useEffect used in this component?
// Answer:
// useEffect ensures fetchList() runs once when the component mounts.
// This loads the food list automatically on initial render.

// 🔹 Q3. What does fetchList() function do?
// Answer:
// It sends a GET request to fetch all food items from the backend.
// If successful, it updates the list state; else, it shows an error toast.

// 🔹 Q4. How is item deletion handled in this component?
// Answer:
// removeFood() sends a POST request with the item's ID to delete it.
// After deletion, fetchList() is called again to refresh the UI.

// 🔹 Q5. Why is toast used in both success and error cases?
// Answer:
// toast provides user feedback on actions like successful deletion or failure.
// This improves UX by confirming outcomes without page reloads.

// 🔹 Q6. Why is key={index} used in the map function?
// Answer:
// It uniquely identifies each row for React’s reconciliation process.
// However, using item._id would be a more reliable unique key.

// 🔹 Q7. How is dynamic image rendering handled?
// Answer:
// Images are displayed using src={${url}/images/ + item.image}.
// This builds the full image path from the server dynamically.