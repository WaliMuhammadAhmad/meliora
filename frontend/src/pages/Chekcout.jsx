import React, { useState } from "react";
import { Button } from "@mui/joy";
import styles from "./style.module.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
    saveInfo: false,
    cashOnDelivery: true,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Function to send customer data to server
  const addCustomer = async (customerData) => {
    try {
      const response = await axios.post("/customers", customerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Customer Info saved successfully", response.data);
      return response.data._id; // Return customer ID after saving
    } catch (error) {
      console.error("Error saving Customer", error);
      throw error;
    }
  };

  // Function to place an order
  const addOrder = async (orderData) => {
    try {
      const response = await axios.post("/order", orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Order placed successfully", response.data);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine address fields into one object and create full customer data
    const customerData = {
      name: formData.firstName,
      email: formData.email,
      password: formData.firstName, // Dummy password for now
      phone: formData.phoneNumber,
      address: {
        house: formData.apartment || "N/A",
        street: formData.streetAddress,
        city: formData.city,
        state: "N/A", // Default for now; adjust as needed
        postalCode: "N/A", // Placeholder; adjust if needed
        country: "Pakistan", // Default value
      },
      deliveryAddress: formData.streetAddress,
      paymentMethods: {
        cashOnDelivery: formData.cashOnDelivery,
      },
      isVerified: false,
    };

    try {
      // Save customer and get the customer ID
      const customerId = await addCustomer(customerData);

      // Place an order using the returned customer ID
      const orderData = {
        customerId: customerId,
        productId: "6719f1516dbac474c74137cb", // Test product ID
        status: "pending", // Optional: default is 'pending'
      };

      addOrder(orderData);
    } catch (error) {
      console.error("Error during customer/order process", error);
    }
  };

  return (
    <>
      <div className={styles.checkoutcontainer}>
        <div className={styles.billing}>
          <h1>Billing Details</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.name}>
              <label>First Name</label>
              <input type="text" name="firstName" onChange={handleChange} />
            </div>
            <div className={styles.street}>
              <label>Street Address</label>
              <input type="text" name="streetAddress" onChange={handleChange} />
            </div>
            <div className={styles.apartment}>
              <label>Apartment, floor, etc (optional)</label>
              <input type="text" name="apartment" onChange={handleChange} />
            </div>
            <div className={styles.city}>
              <label>Town City</label>
              <input type="text" name="city" onChange={handleChange} />
            </div>
            <div className={styles.number}>
              <label>Phone Number</label>
              <input type="number" name="phoneNumber" onChange={handleChange} />
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <input type="email" name="email" onChange={handleChange} />
            </div>
            <div className="radio" style={{ marginTop: "20px" }}>
              <input type="checkbox" name="saveInfo" onChange={handleChange} />
              <label style={{ marginLeft: "20px" }}>
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>
        <div className={styles.maincheckout}>
          <div className={styles.topheading}>
            <h1 style={{ fontWeight: "bold" }}>Item Details</h1>
          </div>
          <div className={styles.cartitems}>
            <div className={styles.item}>
              <div className={styles.imagesection}>
                <img
                  src="https://rukminim2.flixcart.com/image/416/416/xif0q/glass-cleaner/j/k/s/1-glass-cleaner-sparkling-shine-500-ml-x-2-pic-liiya-original-imagvx78uhxsgzwc.jpeg?q=70&crop=false"
                  alt=""
                />
              </div>
              <div className={styles.itemright}>
                <h5>Meliora Super Plus</h5>
                <h5>$75 x 1</h5>
              </div>
            </div>
            <hr />
          </div>
          <div
            className={styles.label1}
            style={{ color: "black", borderBottom: "2px solid black" }}
          >
            <h3>SubTotal:</h3>
            <h3>$175</h3>
          </div>
          <div
            className={styles.label2}
            style={{ color: "black", borderBottom: "2px solid black" }}
          >
            <h3>Shipping:</h3>
            <h3>Free</h3>
          </div>
          <div
            className={styles.label3}
            style={{ color: "black", borderBottom: "2px solid black" }}
          >
            <h3>Total:</h3>
            <h3>$175</h3>
          </div>
          <div className={styles.radio}>
            <input type="checkbox" name="" id="" />
            <label>Cash On Delivery</label>
          </div>
          <Button onClick={handleSubmit}>Place Order</Button>
        </div>
      </div>
    </>
  );
}
