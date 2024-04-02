import {
    Route,
    Routes,
  } from "react-router-dom";
import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Dashboard from '../pages/Dashboard'
import Category from "../pages/Category";
import Addcategory from "../pages/Addcategory";
import Editcategory from "../pages/Editcategory";
import Tags from "../pages/Tags";
import Addtag from "../pages/Addtag";
import Edittag from "../pages/Edittag";
export default function Mainwraper() {
  return (
    <div class="container-scroller">
       <Navbar />
       <div class="container-fluid page-body-wrapper">
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/add-category" element={<Addcategory />} />
            <Route path="/edit-category/:id" element={<Editcategory/>} />
            <Route path="/tags" element={<Tags/>} />
            <Route path="/add-tag" element={<Addtag/>} />
            <Route path="/edit-tag/:id" element={<Edittag/>} />
          </Routes>
       </div>
    </div>
  )
}
