"use client";
import React, { useContext, useState, useEffect } from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import CreateContextApi from "../ContextApi/CreateContextApi";
import { useAuth0 } from "@auth0/auth0-react";  // Import useAuth0 from Auth0 SDK

export function Navbar() {
  // eslint-disable-next-line no-unused-vars
  const { showCart, setShowCart } = useContext(CreateContextApi);
  const { isAuthenticated } = useAuth0();
  const [navItems, setNavItems] = useState([
    {
      name: "Home",
      link: "#home",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Products",
      link: "#products",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "WholeSale",
      link: "#wholeSale",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Why us",
      link: "#whyus",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Blogs",
      link: "#blogs",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
    {
      name: "Reviews",
      link: "#reviews",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    }
  ]);

  useEffect(() => {
    if (isAuthenticated) {
      setNavItems((prevItems) => [
        ...prevItems,
        {
          name: "Profile",
          link: "/profile",
          icon: (
            <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />
          ),
        },
      ]);
    }
  }, [isAuthenticated]);

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
