import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateModal from "../components/dashboard/components/UpdateModal";
import AddModal from "../components/dashboard/components/AddModal";
import Alert from "../components/dashboard/components/Alert";

axios.defaults.baseURL = "http://localhost:3001";

export default function AddProducts() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product added successfully", response.data);
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products");

        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          alert("No products found");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product); // Set the product to be deleted
    setShowDeleteAlert(true); // Show the alert
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/products/${productToDelete._id}`);
      setProducts(products.filter((p) => p._id !== productToDelete._id)); // Remove the deleted product from the state
      setShowDeleteAlert(false); // Close the alert after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="manageItems">
        <div className="top">
          <h1>Manage Products</h1>
          <button onClick={() => setShowAddModal(true)}>Add Product</button>
        </div>
        <div className="products">
          <div className="product-grid">
            <div className="header product-no">Product No.</div>
            <div className="header product-name">Product Name</div>
            <div className="header product-price">Price</div>
            <div className="header product-status">Status</div>
            <div className="header product-operations">Operations</div>

            {products.map((product, index) => (
              <React.Fragment key={product._id}>
                <div className="product-no product-description">
                  {index + 1}
                </div>
                <div className="product-name product-description">
                  {product.name}
                </div>
                <div className="product-price product-description">
                  ${product.price}
                </div>
                <div
                  className={`product-status ${
                    product.stockQuantity === 0 ? "out-of-stock" : "in-stock"
                  } product-description`}
                >
                  {product.stockQuantity === 0 ? "Out of Stock" : "In Stock"}
                </div>
                <div className="product-operations product-description">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(product)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(product)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modals for updating and adding products */}
        <UpdateModal
          show={showModal}
          onClose={() => setShowModal(false)}
          product={selectedProduct}
        />
        <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        submitAction={handleAddProduct}
      />

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
