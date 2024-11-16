import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/dashboard/components/Alert";
import OrderAlert from "../components/dashboard/components/OrderAlert";
import styles from "./style.module.css";

axios.defaults.baseURL = "http://localhost:3001";

export default function Orders() {
  const [showCancelAlert, setShowCancelAlert] = useState(false);
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

  const handleCancelClick = (product) => {
    setChangeOrder(product);
    setShowCancelAlert(true);
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

  const handleConfirmCancel = async () => {
    try {
      await axios.put(`/order/${changeOrder._id}`, {
        ...changeOrder,
        status: "cancelled",
      });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === changeOrder._id ? { ...p, status: "cancelled" } : p
        )
      );
      setShowCompleteAlert(false);
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const renderOrdersByStatus = (status) => {
    const filteredProducts = products.filter((product) => product.status === status);

    return filteredProducts.length > 0 ? (
      filteredProducts.map((product, index) => (
        <React.Fragment key={index}>
          <div className={`${styles.productno} ${styles.productdescription}`}>{product._id}</div>
          <div className={`${styles.productname} ${styles.productdescription}`}>{product.customerName}</div>
          <div className={`${styles.productprice} ${styles.productdescription}`}>{product.productName}</div>
          <div className={`${styles.productstatus} ${styles.productdescription}`}
            style={{ color: product.status === 'pending' ? '#216D9E' : product.status === 'completed' ? 'green' : 'red' }}>{product.status}</div>
          <div className={`${styles.productoperations} ${styles.productdescription}`}>
            {status === "pending" && (
              <button className={styles.updatebtn} onClick={() => handleCompleteClick(product)}>
                Complete
              </button>
            )}
            <button className={styles.deletebtn} onClick={() => handleCancelClick(product)}>
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
        <div className={styles.products}>
          <div className={styles.productgrid}>
            <div className={`${styles.header} ${styles.productno}`}>Order No.</div>
            <div className={`${styles.header} ${styles.productname}`}>Product Name</div>
            <div className={`${styles.header} ${styles.productname}`}>Customer Name</div>
            <div className={`${styles.header} ${styles.productstatus}`}>Status</div>
            <div className={`${styles.header} ${styles.productoperations}`}>Operations</div>
            {renderOrdersByStatus("pending")}
          </div>
        </div>

        <h1>Completed Orders</h1>
        <div className={styles.products}>
          <div className={styles.productgrid}>
            <div className={`${styles.header} ${styles.productno}`}>Order No.</div>
            <div className={`${styles.header} ${styles.productname}`}>Product Name</div>
            <div className={`${styles.header} ${styles.productname}`}>Customer Name</div>
            <div className={`${styles.header} ${styles.productstatus}`}>Status</div>
            <div className={`${styles.header} ${styles.productoperations}`}>Operations</div>
            {renderOrdersByStatus("completed")}
          </div>
        </div>

        <h1>Cancelled Orders</h1>
        <div className={styles.products}>
          <div className={styles.productgrid}>
            <div className={`${styles.header} ${styles.productno}`}>Order No.</div>
            <div className={`${styles.header} ${styles.productname}`}>Product Name</div>
            <div className={`${styles.header} ${styles.productname}`}>Customer Name</div>
            <div className={`${styles.header} ${styles.productstatus}`}>Status</div>
            <div className={`${styles.header} ${styles.productoperations}`}>Operations</div>
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
        {showCancelAlert && (
          <Alert
            productName={changeOrder.productName}
            onConfirm={handleConfirmCancel}
            onCancel={() => setShowCancelAlert(false)}
          />
        )}
      </div>
    </>
  );
}
