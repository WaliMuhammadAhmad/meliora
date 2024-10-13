import React, { useContext, useEffect, useState } from 'react'
import { FaArrowRight } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import CreateContextApi from '../ContextApi/CreateContextApi';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";



export default function Cart() {
    const { showCart, setShowCart } = useContext(CreateContextApi)
    const [bgColor, setBgColor] = useState("transparent");
    const navigate = useNavigate();
    useEffect(() => {
        let timeout;
        if (showCart) {
            timeout = setTimeout(() => {
                document.body.classList.add('no-scroll')
                setBgColor("rgba(0, 0, 0, 0.5)"); // light black background
            }, 1000); // 1 second delay
        } else {
            document.body.classList.remove('no-scroll')
            setBgColor("transparent"); // reset background when modal is hidden
        }
        return () => clearTimeout(timeout); // cleanup on unmount or when showCart changes
    }, [showCart]);
    return (
        <>
            <motion.div className="cart-container" initial={{ x: '100vw' }} animate={{ x: showCart ? 0 : '100vw' }} transition={{ duration: 1, ease: "easeInOut" }}>
                <div className="left-section" style={{ backgroundColor: bgColor }}>
                </div>
                <div className="right-section">
                    <div className="cross-icon">
                        <RxCross1 onClick={() => setShowCart(!showCart)} />
                    </div>
                    <div className="top-heading">
                        <h1>CART</h1>
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
                    <div className="label-1">
                        <h3>SubTotal:</h3>
                        <h3>$175</h3>
                    </div>
                    <div className="label-2">
                        <h3>Shipping:</h3>
                        <h3>Free</h3>
                    </div>
                    <div className="label-3">
                        <h3>Total:</h3>
                        <h3>$175</h3>
                    </div>
                    <div className="checkout">
                        <h3 onClick={() => navigate('/checkout')}>Proceed to Checkout</h3>
                        <span onClick={() => navigate('/checkout')}><FaArrowRight /></span>
                    </div>
                </div>
            </motion.div>
        </>
    )
}



// Made by: Zain Manzoor github: ZainManzoor2003