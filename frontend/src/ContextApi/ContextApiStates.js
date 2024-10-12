import CreateContextApi from "./CreateContextApi";
import React, { useState } from 'react'

export default function ContextApiStates(props) {
  const [showCart, setShowCart] = useState(false)

  return (
    <>
      <CreateContextApi.Provider value={{ showCart, setShowCart }}>
        {props.children}
      </CreateContextApi.Provider>
    </>
  )
}
