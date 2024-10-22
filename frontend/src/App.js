import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aurora-background.tsx";
import { FlipWords } from "./ui/flip-words.tsx";
import Products from "./components/Products";
import { Reviews } from "./components/Reviews.jsx";
import { WaveAd } from "./components/WaveAd.jsx";
import Blogs from "./components/Blogs.jsx";
import logo from './assets/logoSVG.png';
import { Navbar } from "./components/Navbar.jsx"; // Import Navbar
import WholeSale from "./components/WholeSale.jsx"; // Import WholeSale
import { Route, Routes } from 'react-router-dom'
import ProductDetails from "./pages/ProductDetails.jsx";
import Home from "./components/Home.jsx";
import Chekcout from "./components/Chekcout.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Admin from "./components/dashboard/components/Admin.jsx";
import AddProducts from "./components/dashboard/components/AddProducts.jsx";
import AddBlog from "./components/dashboard/components/AddBlog.jsx";
import Account from "./components/dashboard/components/Account.jsx";

function App() {

  return (
    <>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/product-details" element={<ProductDetails />}></Route>
        <Route exact path="/checkout" element={<Chekcout />}></Route>
        <Route exact path="/admin/dashboard" element={<><Admin /><Dashboard /></>}></Route>
        <Route exact path="/admin/add-products" element={<><Admin /><AddProducts /></>}></Route>
        <Route exact path="/admin/add-blogs" element={<><Admin /><AddBlog /></>}></Route>
        <Route exact path="/admin/account" element={<><Admin /><Account /></>}></Route>
      </Routes>
    </>
  );
}

export default App;
