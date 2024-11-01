import React from 'react'
import { Button } from '@mui/joy'
import { FaCartShopping } from "react-icons/fa6";
import styles from './style.module.css'


export default function Chekcout() {
    return (
        <>
            <div className={styles.checkoutcontainer}>
                <div className={styles.billing}>
                    <h1>Billing Details</h1>
                    <form action="submit">
                        <div className={styles.name}>
                            <label>First Name</label>
                            <input type="text" />
                        </div>
                        <div className={styles.street}>
                            <label>Street Address</label>
                            <input type="text" />
                        </div>
                        <div className={styles.apartment}>
                            <label>Apartment, floor, etc (optional)</label>
                            <input type="text" />
                        </div>
                        <div className={styles.city}>
                            <label>Town City</label>
                            <input type="text" />
                        </div>
                        <div className={styles.number}>
                            <label>Phone Number</label>
                            <input type="number" />
                        </div>
                        <div className={styles.email}>
                            <label>Email</label>
                            <input type="email" />
                        </div>
                    </form>
                    <div className="radio" style={{ marginTop: '20px' }}>
                        <input type="checkbox" name="" id="" />
                        <label style={{marginLeft:'20px'}}>Save this information for faster check-out next time</label>
                    </div>
                </div>
                <div className={styles.maincheckout}>
                    <div className={styles.topheading}>
                        <h1 style={{ fontWeight: 'bold' }}>Item Details</h1>
                    </div>
                    <div className={styles.cartitems}>
                        <div className={styles.item}>
                            <div className={styles.imagesection}>
                                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                            </div>
                            <div className={styles.itemright}>
                                <h5>Meliora Super Plus</h5>
                                <h5>$75 x 1</h5>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.imagesection}>
                                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                            </div>
                            <div className={styles.itemright}>
                                <h5>Meliora Super Plus</h5>
                                <h5>$75 x 1</h5>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.imagesection}>
                                <img src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false" alt="" />
                            </div>
                            <div className={styles.itemright}>
                                <h5>Meliora Super Plus</h5>
                                <h5>$75 x 1</h5>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className={styles.label1} style={{ color: 'black', borderBottom: '2px solid black' }}>
                        <h3>SubTotal:</h3>
                        <h3>$175</h3>
                    </div>
                    <div className={styles.label2} style={{ color: 'black', borderBottom: '2px solid black' }}>
                        <h3>Shipping:</h3>
                        <h3>Free</h3>
                    </div>
                    <div className={styles.label3} style={{ color: 'black', borderBottom: '2px solid black' }}>
                        <h3>Total:</h3>
                        <h3>$175</h3>
                    </div>
                    <div className={styles.radio}>

                        <input type="checkbox" name="" id="" />
                        <label>Cash On Delivery</label>
                    </div>
                    <Button> Place Order </Button>
                </div>
            </div>
        </>
    )
}



// Made by: Zain Manzoor github: ZainManzoor2003