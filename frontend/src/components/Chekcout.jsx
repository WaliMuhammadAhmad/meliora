import React from 'react'
import { Button } from '@mui/joy'
import { FaCartShopping } from "react-icons/fa6";


export default function Chekcout() {
    return (
        <>
            <div className="checkout-container">
                <div className="billing">
                    <h1>Billing Details</h1>
                    <form action="submit">
                        <div className="name">
                            <label>First Name</label>
                            <input type="text" />
                        </div>
                        <div className="street">
                            <label>Street Address</label>
                            <input type="text" />
                        </div>
                        <div className="apartment">
                            <label>Apartment, floor, etc (optional)</label>
                            <input type="text" />
                        </div>
                        <div className="city">
                            <label>Town City</label>
                            <input type="text" />
                        </div>
                        <div className="number">
                            <label>Phone Number</label>
                            <input type="number" />
                        </div>
                        <div className="email">
                            <label>Email</label>
                            <input type="email" />
                        </div>
                    </form>
                    <div className="radio" style={{ marginTop: '20px' }}>
                        <input type="checkbox" name="" id="" />
                        <label>Save this information for faster check-out next time</label>
                    </div>
                </div>
                <div className="main-checkout">
                    <div className="top-heading">
                        <h1 style={{ fontWeight: 'bold' }}>Item Details</h1>
                    </div>
                    <div className="cart-items">
                        <div className="item">
                            <div className="image-section">
                                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                            </div>
                            <div className="item-right">
                                <h5>Meliora Super Plus</h5>
                                <h5>$75 x 1</h5>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image-section">
                                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                            </div>
                            <div className="item-right">
                                <h5>Meliora Super Plus</h5>
                                <h5>$75 x 1</h5>
                            </div>
                        </div>
                        <div className="item">
                            <div className="image-section">
                                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                            </div>
                            <div className="item-right">
                                <h5>Meliora Super Plus</h5>
                                <h5>$75 x 1</h5>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="label-1" style={{ color: 'black', borderBottom: '2px solid black' }}>
                        <h3>SubTotal:</h3>
                        <h3>$175</h3>
                    </div>
                    <div className="label-2" style={{ color: 'black', borderBottom: '2px solid black' }}>
                        <h3>Shipping:</h3>
                        <h3>Free</h3>
                    </div>
                    <div className="label-3" style={{ color: 'black', borderBottom: '2px solid black' }}>
                        <h3>Total:</h3>
                        <h3>$175</h3>
                    </div>
                    <div className="radio">

                        <input type="checkbox" name="" id="" />
                        <label>Cash On Delivery</label>
                    </div>
                    <Button> Place Order </Button>
                </div>
            </div>
        </>
    )
}
