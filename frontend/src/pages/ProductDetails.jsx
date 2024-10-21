import { Button, Link } from '@mui/joy'
import React, { useContext, useState } from 'react'
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { GiFirstAidKit } from "react-icons/gi";
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '../components/Navbar';
import Cart from '../components/Cart';
import CreateContextApi from '../ContextApi/CreateContextApi';


export default function ProductDetails() {
    const [limit, setLimit] = useState(1)
    const { showCart, setShowCart } = useContext(CreateContextApi)
    return (
        <>
            <Navbar />
            <Cart />
            <div className="main-container">
                <div className="left-section">
                    <div className="img-section">
                        <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                    </div>

                    <li><a>Description</a></li>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, fugiat excepturi ipsum consequuntur quaerat eveniet error omnis voluptates harum dolores voluptatibus laboriosam, neque, autem molestiae. Natus provident obcaecati culpa praesentium.
                        Cumque ex quos ad sapiente quae placeat optio minima pariatur tenetur amet cum excepturi est, quisquam quaerat omnis eaque voluptates dolor voluptatem delectus porro ipsum ea nemo. Iusto, provident incidunt.
                        Magni eius, sequi doloribus, exercitationem incidunt facilis impedit labore quisquam nobis eligendi nemo, quibusdam cumque eum porro omnis itaque? Aperiam corrupti culpa eligendi aliquam, enim repudiandae cum impedit. Ipsa, iusto!
                        Temporibus voluptates praesentium recusandae aliquid quaerat nihil, velit voluptate sint commodi excepturi. Eligendi cumque fuga aspernatur sint assumenda ducimus natus accusamus vel est amet neque facere, quod delectus temporibus quae?
                        Magnam sed rerum facere repudiandae tempore adipisci tempora, numquam debitis obcaecati eligendi autem qui repellat ullam iure aspernatur repellendus dolore possimus vero optio amet esse exercitationem dolorem culpa hic! Atque.</p>
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
                        <Button onClick={() => setShowCart(!showCart)}>Add to Cart</Button>
                    </div>
                    <span onClick={() => setShowCart(!showCart)} style={{ fontSize: '13px', marginTop: 'auto', marginBottom: 'auto', textDecoration: 'underline', cursor: 'pointer' }}>Go To Cart</span>
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
            <div class="product-cards-container">
                <h1>How to use All-Purpose Home Cleaner</h1>
                <div className="cards">
                    <div class="card">
                        <img src="/cards.webp" alt="Step 1" />
                        <h3>Add a refill tablet to the bottle</h3>
                        <p>Our bottles come with a tablet inside. To refill the bottle, remove the sprayer attachment and add one refill tablet. Each tablet makes about 16 fl. oz. of liquid cleaner.</p>
                    </div>

                    <div class="card">
                        <img src="/cards.webp" alt="Step 2" />
                        <h3>Fill with warm water and let tablet dissolve</h3>
                        <p>Warm water dissolves the soap more quickly, but do not use hot water. Reattach the sprayer and shake gently to dissolve the tablet.</p>
                    </div>

                    <div class="card">
                        <img src="/cards.webp" alt="Step 3" />
                        <h3>Spray hard surfaces and wipe until dry</h3>
                        <p>Spray on hard surfaces, including wood, stone, metal, and glass. Wipe with a clean cloth for a streak-free finish. Test on a hidden spot with delicate surfaces.</p>
                    </div>
                </div>
            </div>
            <div class="review-section">
                <h2>Customer Reviews</h2>
                <div class="header">
                    <div class="rating-summary">
                        <span class="stars">★★★★☆</span>
                        <span>4.5 out of 5</span>
                        <p>Based on 109 Reviews</p>
                    </div>
                    <div class="rating-breakdown">
                        <div class="rating-bar">
                            <span class="stars">★★★★★</span>
                            <div class="bar"><div class="fill" style={{ width: "90%" }}></div></div>
                            <span>98</span>
                        </div>
                        <div class="rating-bar">
                            <span class="stars">★★★★</span>
                            <div class="bar"><div class="fill" style={{ width: " 8%" }}></div></div>
                            <span>5</span>
                        </div>
                        <div class="rating-bar">
                            <span class="stars">★★★</span>
                            <div class="bar"><div class="fill" style={{ width: "4%" }}></div></div>
                            <span>4</span>
                        </div>
                        <div class="rating-bar">
                            <span class="stars">★★</span>
                            <div class="bar"><div class="fill" style={{ width: "1%;" }}></div></div>
                            <span>1</span>
                        </div>
                        <div class="rating-bar">
                            <span class="stars">★</span>
                            <div class="bar"><div class="fill" style={{ width: "1%;" }}></div></div>
                            <span>1</span>
                        </div>
                    </div>
                    <button class="write-review">Write a Review</button>
                </div>

                <div class="search-review">
                    <input type="text" placeholder="Search Review" />
                    <button class="search-btn">🔍</button>
                </div>

                <div class="review">
                    <div class="review-header">
                        <div className="top-heading">

                        <h4>Melanie Morningstar</h4>
                        <span class="verified">Verified</span>
                        </div>
                        <p>McLean, US</p>
                    </div>
                    <div class="review-content">
                        <h5>Best spray cleaner I've ever used</h5>
                        <p>This spray cleaner is wonderful. It cuts grease and grime and makes cleaning so easy...</p>
                    </div>
                    <div class="review-header">
                        <div className="top-heading">

                        <h4>Melanie Morningstar</h4>
                        <span class="verified">Verified</span>
                        </div>
                        <p>McLean, US</p>
                    </div>
                    <div class="review-content">
                        <h5>Best spray cleaner I've ever used</h5>
                        <p>This spray cleaner is wonderful. It cuts grease and grime and makes cleaning so easy...</p>
                    </div>
                    <div class="review-header">
                        <div className="top-heading">

                        <h4>Melanie Morningstar</h4>
                        <span class="verified">Verified</span>
                        </div>
                        <p>McLean, US</p>
                    </div>
                    <div class="review-content">
                        <h5>Best spray cleaner I've ever used</h5>
                        <p>This spray cleaner is wonderful. It cuts grease and grime and makes cleaning so easy...</p>
                    </div>
                </div>
            </div>
        </>
    )
}

// Made by: Zain Manzoor github: ZainManzoor2003