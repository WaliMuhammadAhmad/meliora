import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/dashboard/components/Alert";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function Orders() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchAdditionalData = async (order) => {
    try {
      const customerResponse = await axios.get(
        `/customers/${order.customerId}`
      );
      const productResponse = await axios.get(`/products/${order.productId}`);

      return {
        ...order,
        customerName: customerResponse.data.name,
        productName: productResponse.data.name,
      };
    } catch (error) {
      console.error("Error fetching additional data:", error);
      return { ...order, customerName: "Unknown", productName: "Unknown" };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/order");

        if (response.data && response.data.length > 0) {
          const ordersWithDetails = await Promise.all(
            response.data.map((order) => fetchAdditionalData(order))
          );
          setProducts(ordersWithDetails);
        } else {
          alert("No orders found");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/order/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Orders</h1>
        </div>
        <div className="products">
          <div className="product-grid">
            <div className="header product-no">Order No.</div>
            <div className="header product-name">Product Name</div>
            <div className="header product-name">Customer Name</div>
            <div className="header product-status">Status</div>
            <div className="header product-operations">Operations</div>
            {}
            {products.map((product, index) => (
              <React.Fragment key={product._id}>
                <div className="product-no product-description">
                  {index + 1}
                </div>
                <div className="product-name product-description">
                  {product.customerName}
                </div>
                <div className="product-price product-description">
                  {product.productName}
                </div>
                <div className="product-price product-description">
                  {product.status}
                </div>
                <div className="product-operations product-description">
                  <button
                    className="update-btn"
                  >
                    Complete
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Cancel
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {showDeleteAlert && (
          <Alert
            productName={productToDelete.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}
