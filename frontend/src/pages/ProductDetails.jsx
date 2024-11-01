import { Button } from '@mui/joy'
import React, { useContext, useState } from 'react'
import { FiTruck } from "react-icons/fi";
import { LiaSyncAltSolid } from "react-icons/lia";
import { GiFirstAidKit } from "react-icons/gi";
import { Navbar } from '../components/Navbar';
import Cart from '../components/Cart';
import CreateContextApi from '../ContextApi/CreateContextApi';
import ProductUsage from '../components/ProductUsage';
import ReviewSection from '../components/ReviewSection';
import styles from './style.module.css'


export default function ProductDetails() {
    const [limit, setLimit] = useState(1)
    const { showCart, setShowCart, setCartData } = useContext(CreateContextApi)
    const id=4;
    const modifyCartData = () => {
        setCartData(prevCartData => {
            const productIndex = prevCartData.findIndex(item => item.id === id);

            // If the product exists in the cart, update its 'items' value
            if (productIndex !== -1) {
                const updatedCartData = [...prevCartData];
                updatedCartData[productIndex] = {
                    ...updatedCartData[productIndex],
                    items: limit // Update the 'items' with the new 'limit' value
                };
                return updatedCartData;
            }

            // If the product doesn't exist, add a new one to the cart
            return [
                ...prevCartData,
                {
                    id: 4, // New product with the specified id
                    img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false', // Example image
                    name: 'New Product', // You can customize the name as needed
                    price: 100, // Example price
                    items: limit // New item count from the current limit
                }
            ];
        })
    }
    return (
        <>
            <Navbar />
            <Cart />
            <div className={styles.maincontainer}>
                <div className={styles.leftsection}>
                    <div className={styles.imgsection}>
                        <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                    </div>

                    <li><a>Description</a></li>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, fugiat excepturi ipsum consequuntur quaerat eveniet error omnis voluptates harum dolores voluptatibus laboriosam, neque, autem molestiae. Natus provident obcaecati culpa praesentium.
                        Cumque ex quos ad sapiente quae placeat optio minima pariatur tenetur amet cum excepturi est, quisquam quaerat omnis eaque voluptates dolor voluptatem delectus porro ipsum ea nemo. Iusto, provident incidunt.
                        Magni eius, sequi doloribus, exercitationem incidunt facilis impedit labore quisquam nobis eligendi nemo, quibusdam cumque eum porro omnis itaque? Aperiam corrupti culpa eligendi aliquam, enim repudiandae cum impedit. Ipsa, iusto!
                        Temporibus voluptates praesentium recusandae aliquid quaerat nihil, velit voluptate sint commodi excepturi. Eligendi cumque fuga aspernatur sint assumenda ducimus natus accusamus vel est amet neque facere, quod delectus temporibus quae?
                        Magnam sed rerum facere repudiandae tempore adipisci tempora, numquam debitis obcaecati eligendi autem qui repellat ullam iure aspernatur repellendus dolore possimus vero optio amet esse exercitationem dolorem culpa hic! Atque.</p>
                </div>
                <div className={styles.rightsection}>
                    <h1 style={{ fontWeight: 'bold' }}>All-Purpose Home Cleaner Spray
                        - Refill Tablets</h1>
                    <h1>$192.00</h1>
                    <h5 style={{ fontSize: '12px', margin: '5px 0 10px 0' }}>Shipping -  Calculated at checkout</h5>
                    <Button>Use to refill your reusable spray bottles.</Button>
                    <div className={styles.para} style={{ marginTop: '10px' }}>
                        <p>Our All-Purpose Home Cleaner is a people and planet
                            friendly all-purpose cleaner made with safer ingredients
                            and eco-friendly packaging.</p>
                    </div>
                    <div className={styles.para} style={{ marginTop: '30px' }}>
                        <p>These solid soap refill tablets are just as effective as pre
                            mixed cleaning spray but are ultra-concentrated, plasticfree, and preservative-free.</p>
                    </div>
                    <h5 style={{ fontWeight: '500', marginTop: '10px' }}>Size</h5>
                    <div className={styles.buttons}>
                        <button>Bottle and 3-Pack Refill</button>
                        <button>Bottle Only</button>
                        <button>3 Bottle Refil</button>
                    </div>
                    <h5 style={{ fontWeight: '500', marginTop: '10px' }}>Scent</h5>
                    <button>Unscented</button>
                    <div className={styles.deliveryDetails} style={{ marginTop: '10px' }}>
                        <div className={styles.one}>

                            <div className={styles.logo}>
                                <FiTruck />
                            </div>
                            <div className="text">
                                <h3>Fast Delivery</h3>
                                <h3>Enter your postal code for Delivery Availability</h3>
                            </div>
                        </div>
                        <div className={styles.two}>

                            <div className={styles.logo}>
                                <LiaSyncAltSolid />
                            </div>
                            <div className={styles.text}>

                                <h3>Return Delivery</h3>
                                <h3>Free 30 Days Delivery Returns. Details</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cartoptions}>
                        <div className={styles.increaseLimit}>
                            <button onClick={() => limit !== 1 && setLimit(limit - 1)}>-</button>
                            {limit}
                            <button onClick={() => setLimit(limit + 1)}>+</button>
                        </div>
                        <Button onClick={() => { setShowCart(!showCart); modifyCartData() }}>Add to Cart</Button>
                    </div>
                    <span onClick={() => setShowCart(!showCart)} style={{ fontSize: '13px', marginTop: 'auto', marginBottom: 'auto', textDecoration: 'underline', cursor: 'pointer' }}>Go To Cart</span>
                    <h5 style={{ fontWeight: "500" }}>Try It With:</h5>
                    <div className={styles.suggestion}>
                        <div className={styles.logo}>
                            <GiFirstAidKit />
                        </div>
                        <div className={styles.text}>

                            <h3>Dish Wash Soap - Plastic Free Bag</h3>
                            <h3>80%</h3>
                            <Button>Choose Options</Button>
                        </div>
                    </div>
                </div>
            </div>
            <ProductUsage />
            <ReviewSection />
        </>
    )
}

// Made by: Zain Manzoor github: ZainManzoor2003