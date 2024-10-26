import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Chekcout';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import AddProducts from './pages/AddProducts';
import AddBlog from './pages/AddBlog';
import Account from './pages/Account';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product-details",
    element: <ProductDetails />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <>
        <Admin />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <>
        <Admin />
        <Order />
      </>
    ),
  },
  {
    path: "/admin/packages",
    element: (
      <>
        <Admin />
        
      </>
    ),
  },
  {
    path: "/admin/customers",
    element: (
      <>
        <Admin />
        
      </>
    ),
  },
  {
    path: "/admin/products",
    element: (
      <>
        <Admin />
        <AddProducts />
      </>
    ),
  },
  {
    path: "/admin/blogs",
    element: (
      <>
        <Admin />
        <AddBlog />
      </>
    ),
  },
  {
    path: "/admin/account",
    element: (
      <>
        <Admin />
        <Account />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;