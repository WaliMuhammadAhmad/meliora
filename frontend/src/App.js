import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
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
import ProfileComponent from './components/Profile';

// Create the Auth0Provider configuration
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
  {
    path: "/profile",
    element: <ProfileComponent />,
  },
]);

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  );
}

export default App;