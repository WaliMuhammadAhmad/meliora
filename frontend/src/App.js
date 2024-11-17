import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Chekcout';
import Admin from './dashboard/pages/Admin';
import Dashboard from './dashboard/pages/Dashboard';
import Order from './dashboard/pages/Order';
import AddProducts from './dashboard/pages/Product';
import Blog from './dashboard/pages/Blog';
import Account from './dashboard/pages/Account';
import Packages from './dashboard/pages/Packages';
import OrderDetails from './pages/OrderDetails';
import { Navbar } from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: "/product-details/:id",
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