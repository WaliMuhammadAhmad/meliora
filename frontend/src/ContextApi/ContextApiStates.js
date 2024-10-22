import CreateContextApi from "./CreateContextApi";
import React, { useState } from 'react'

export default function ContextApiStates(props) {
  const [showCart, setShowCart] = useState(false)
  const [cartData, setCartData] = useState([
    {
      id:1,
      img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false',
      name: 'Meliora Super Plus',
      price: 75,
      items: 1
    },
    {
      id:2,
      img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false',
      name: 'Meliora Super Plus',
      price: 75,
      items: 2
    },
    {
      id:3,
      img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false',
      name: 'Meliora Super Plus',
      price: 175,
      items: 3
    }
  ])

  return (
    <>
      <CreateContextApi.Provider value={{ showCart, setShowCart, cartData, setCartData }}>
        {props.children}
      </CreateContextApi.Provider>
    </>
  )
}
