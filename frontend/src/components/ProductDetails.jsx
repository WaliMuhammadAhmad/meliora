import { Button, Link } from '@mui/joy'
import React, { useState } from 'react'
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { GiFirstAidKit } from "react-icons/gi";
import { Routes, Route } from 'react-router-dom'

export default function ProductDetails() {
    const [limit, setLimit] = useState(1)
    return (
        <>
            <div className="main-container">
                <div className="left-section">
                    <div className="img-section">
                        <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                    </div>
                    <div className="links">
                        <ul>
                            <li><Link to='/description'><a>Description</a></Link></li>
                            <li><Link to='/review'><a>Review (150)</a></Link></li>
                            <li><Link to='/ingredients'><a>Ingredients</a></Link></li>
                            <li><Link to='/packaging'><a>Packaging</a></Link></li>
                        </ul>
                    </div>
                    <Routes>
                        <Route exact path='/description' element={<Description />} />
                        <Route exact path='/review' element={<Review />} />
                        <Route exact path='/ingredients' element={<Ingredients />} />
                        <Route exact path='/packaging' element={<Packaging />} />
                    </Routes>
                </div>
                <div className="right-section">
                    <h1 style={{ fontWeight: 'bold' }}>All-Purpose Home Cleaner Spray
                        - Refill Tablets</h1>
                    <h1>$192.00</h1>
                    <h5 style={{ fontSize: '12px', margin: '5px 0 10px 0' }}>Shipping -  Calculated at checkout</h5>
                    <Button>Use to refill your reusable spray bottles.</Button>
                    <div className="para" style={{ marginTop: '10px' }}>
                        <p>Our All-Purpose Home Cleaner is a people and planet
                            friendly all-purpose cleaner made with safer ingredients
                            and eco-friendly packaging.</p>
                    </div>
                    <div className="para" style={{ marginTop: '30px' }}>
                        <p>These solid soap refill tablets are just as effective as pre
                            mixed cleaning spray but are ultra-concentrated, plasticfree, and preservative-free.</p>
                    </div>
                    <h5 style={{ fontWeight: '500', marginTop: '10px' }}>Size</h5>
                    <div className="buttons">
                        <button>Bottle and 3-Pack Refill</button>
                        <button>Bottle Only</button>
                        <button>3 Bottle Refil</button>
                    </div>
                    <h5 style={{ fontWeight: '500', marginTop: '10px' }}>Scent</h5>
                    <button>Unscented</button>
                    <div className="deliveryDetails" style={{ marginTop: '10px' }}>
                        <div className="one">

                            <div className="logo">
                                <FiTruck />
                            </div>
                            <div className="text">
                                <h3>Fast Delivery</h3>
                                <h3>Enter your postal code for Delivery Availability</h3>
                            </div>
                        </div>
                        <div className="two">

                            <div className="logo">
                                <LiaSyncAltSolid />
                            </div>
                            <div className="text">

                                <h3>Return Delivery</h3>
                                <h3>Free 30 Days Delivery Returns. Details</h3>
                            </div>
                        </div>
                    </div>
                    <div className="cart-options">
                        <div className="increaseLimit">
                            <button onClick={() => limit !== 1 && setLimit(limit - 1)}>-</button>
                            {limit}
                            <button onClick={() => setLimit(limit + 1)}>+</button>
                        </div>
                        <Button>Add to Cart</Button>
                    </div>
                    <h5 style={{ fontWeight: "500" }}>Try It With:</h5>
                    <div className="suggestion">
                        <div className="logo">
                            <GiFirstAidKit />
                        </div>
                        <div className="text">

                            <h3>Dish Wash Soap - Plastic Free Bag</h3>
                            <h3>80%</h3>
                            <Button>Choose Options</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Description = () => <div><h2>Description of the product</h2><p>Here is the detailed description...</p></div>;
const Review = () => <div><h2>Review of the product</h2><p>Customer reviews go here...</p></div>;
const Ingredients = () => <div><h2>Ingredients</h2><p>List of ingredients goes here...</p></div>;
const Packaging = () => <div><h2>Packaging Information</h2><p>Details about the packaging...</p></div>;
