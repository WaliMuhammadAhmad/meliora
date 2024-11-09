import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Chekcout';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Order from './pages/Order';
import AddProducts from './pages/Product';
import Blog from './pages/Blog';
import Account from './pages/Account';
import Packages from './pages/Packages';
import OrderDetails from './pages/OrderDetails';
import { Navbar } from './components/Navbar';

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
        <Packages />
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
        <Blog />
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
  {
    path: "/orderDetails",
    element: (
      <>
        <Navbar />
        <OrderDetails />
      </>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;