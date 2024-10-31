import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/dashboard/components/Alert";
import OrderAlert from "../components/dashboard/components/OrderAlert";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function Orders() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCompleteAlert, setShowCompleteAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [changeOrder, setChangeOrder] = useState(null);

  const fetchAdditionalData = async (order) => {
    try {
      const customerResponse = await axios.get(`/customers/${order.customerId}`);
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

  const handleCompleteClick = (product) => {
    setChangeOrder(product);
    setShowCompleteAlert(true);
  };

  const handleDeleteClick = (product) => {
    setChangeOrder(product);
    setShowDeleteAlert(true);
  };

  const handleConfirmComplete = async () => {
    try {
      await axios.put(`/order/${changeOrder._id}`, {
        ...changeOrder,
        status: "completed",
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === changeOrder._id ? { ...p, status: "completed" } : p
        )
      );
      setShowCompleteAlert(false);
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.put(`/order/${changeOrder._id}`, {
        ...changeOrder,
        status: "completed",
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === changeOrder._id ? { ...p, status: "cancelled" } : p
        )
      );
      setShowCompleteAlert(false);
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const renderOrdersByStatus = (status) => {
    const filteredProducts = products.filter((product) => product.status === status);

    return filteredProducts.length > 0 ? (
      filteredProducts.map((product, index) => (
        <React.Fragment key={index}>
          <div className="product-no product-description">{product._id}</div>
          <div className="product-name product-description">{product.customerName}</div>
          <div className="product-price product-description">{product.productName}</div>
          <div className="product-price product-description">{product.status}</div>
          <div className="product-operations product-description">
            {status === "pending" && (
              <button className="update-btn" onClick={() => handleCompleteClick(product)}>
                Complete
              </button>
            )}
            <button className="delete-btn" onClick={() => handleDeleteClick(product)}>
              Cancel
            </button>
          </div>
        </React.Fragment>
      ))
    ) : (
      <div className="text-xl text-white">No <strong>{status}</strong> Orders</div>
    );
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Orders</h1>
        </div>

        <h1>Pending Orders</h1>
        <div className="products">
          <div className="product-grid">
            <div className="header product-no">Order No.</div>
            <div className="header product-name">Product Name</div>
            <div className="header product-name">Customer Name</div>
            <div className="header product-status">Status</div>
            <div className="header product-operations">Operations</div>
            {renderOrdersByStatus("pending")}
          </div>
        </div>

        <h1>Completed Orders</h1>
        <div className="products">
          <div className="product-grid">
            <div className="header product-no">Order No.</div>
            <div className="header product-name">Product Name</div>
            <div className="header product-name">Customer Name</div>
            <div className="header product-status">Status</div>
            <div className="header product-operations">Operations</div>
            {renderOrdersByStatus("completed")}
          </div>
        </div>

        <h1>Cancelled Orders</h1>
        <div className="products">
          <div className="product-grid">
            <div className="header product-no">Order No.</div>
            <div className="header product-name">Product Name</div>
            <div className="header product-name">Customer Name</div>
            <div className="header product-status">Status</div>
            <div className="header product-operations">Operations</div>
            {renderOrdersByStatus("cancelled")}
          </div>
        </div>

        {showCompleteAlert && (
          <OrderAlert
            onConfirm={handleConfirmComplete}
            onCancel={() => setShowCompleteAlert(false)}
            order={changeOrder}
          />
        )}
        {showDeleteAlert && (
          <Alert
            productName={changeOrder.productName}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}
