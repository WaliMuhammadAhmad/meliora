import React, { useState, useEffect } from "react";
import axios from "axios";
import CompleteOrder from "../components/Alerts/CompleteOrder";
import CancelOrder from "../components/Alerts/CancelOrder";
import DeleteOrder from "../components/Alerts/DeleteOrder";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function Orders() {
  // Alerts
  const [showCancelAlert, setShowCancelAlert] = useState(false);
  const [showCompleteAlert, setShowCompleteAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Orders States
  const [products, setProducts] = useState([]);
  const [changeOrder, setChangeOrder] = useState(null);

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

  const handleCompleteClick = (product) => {
    setChangeOrder(product);
    setShowCompleteAlert(true);
  };

  const handleCancelClick = (product) => {
    setChangeOrder(product);
    setShowCancelAlert(true);
  };

  const handleDeleteClick = (product) => {
    setChangeOrder(product);
    setShowDeleteAlert(true);
  };

  const handleUpdateStatus = async (s) => {
    try {
      await axios.put(`/order/${changeOrder._id}`, {
        ...changeOrder,
        status: s,
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === changeOrder._id ? { ...p, status: s } : p
        )
      );
      setShowCompleteAlert(false);
      if (s === "completed") {
        setShowCompleteAlert(false);
      }
      if (s === "cancelled") {
        setShowCancelAlert(false);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/order/${changeOrder._id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== changeOrder._id)
      );
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const renderOrdersByStatus = (status) => {
    const filteredProducts = products.filter(
      (product) => product.status === status
    );

    return filteredProducts.length > 0 ? (
      filteredProducts.map((product, index) => (
        <React.Fragment key={index}>
          <div className={`${styles.productno} ${styles.productdescription}`}>
            {product._id}
          </div>
          <div className={`${styles.productname} ${styles.productdescription}`}>
            {product.customerName}
          </div>
          <div
            className={`${styles.productprice} ${styles.productdescription}`}
          >
            {product.productName}
          </div>
          <div
            className={`${styles.productstatus} ${styles.productdescription}`}
            style={{
              color:
                product.status === "pending"
                  ? "#216D9E"
                  : product.status === "completed"
                  ? "green"
                  : "red",
            }}
          >
            {product.status}
          </div>
          <div
            className={`${styles.productoperations} ${styles.productdescription}`}
          >
            {status === "pending" && (
              <div>
                <button
                  className={styles.updatebtn}
                  onClick={() => handleCompleteClick(product)}
                >
                  Complete
                </button>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleCancelClick(product)}
                >
                  Cancel
                </button>
              </div>
            )}
            {(status === "completed" || status === "cancelled") && (
              <div>
                <button
                  className={styles.deletebtn}
                  onClick={() => handleDeleteClick(product)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </React.Fragment>
      ))
    ) : (
      <div className="text-xl text-white">
        No <strong>{status}</strong> Orders
      </div>
    );
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Orders</h1>
        </div>

        {["pending", "completed", "cancelled"].map((status) => (
          <div key={status} className={styles.products}>
            <div className={styles.productgrid}>
              <div className={`${styles.header} ${styles.productno}`}>
                Order No.
              </div>
              <div className={`${styles.header} ${styles.productname}`}>
                Product Name
              </div>
              <div className={`${styles.header} ${styles.productname}`}>
                Customer Name
              </div>
              <div className={`${styles.header} ${styles.productstatus}`}>
                Status
              </div>
              <div className={`${styles.header} ${styles.productoperations}`}>
                Operations
              </div>
              {renderOrdersByStatus(status)}
            </div>
          </div>
        ))}

        {showCompleteAlert && (
          <CompleteOrder
            onConfirm={() => handleUpdateStatus("completed")}
            onCancel={() => setShowCompleteAlert(false)}
            order={changeOrder}
          />
        )}

        {showCancelAlert && (
          <CancelOrder
            order={changeOrder}
            onConfirm={() => handleUpdateStatus("cancelled")}
            onCancel={() => setShowCancelAlert(false)}
          />
        )}

        {showDeleteAlert && (
          <DeleteOrder
            order={changeOrder}
            onConfirm={handleDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}

/* 
Made by: Wali M. Ahmad 
Github: WaliMuhammadAhmad
*/