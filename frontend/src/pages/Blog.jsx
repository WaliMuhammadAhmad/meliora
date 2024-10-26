import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateModal from "../components/dashboard/components/UpdateModal";
import AddModal from "../components/dashboard/components/AddModal";
import Alert from "../components/dashboard/components/Alert";

axios.defaults.baseURL = "http://localhost:3001";

export default function AddBlogs() {
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [Blogs, setBlogs] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleAddProduct = async (productData) => {
    try {
      const response = await axios.post("/blog", productData, {
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
        const response = await axios.get("/blog");

        if (response.data && response.data.length > 0) {
          setBlogs(response.data);
        } else {
          alert("No Blogs found");
        }
      } catch (error) {
        console.error("Error fetching Blogs:", error);
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
      await axios.delete(`/blog/${productToDelete._id}`);
      setBlogs(Blogs.filter((p) => p._id !== productToDelete._id));
      setShowDeleteAlert(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <>
      <div className="manageItems">
        <div className="top">
          <h1>Manage Blogs</h1>
          <button onClick={() => setShowAddModal(true)}>Add Blog</button>
        </div>
        <div className="Blogs">
          <div className="product-grid">
            <div className="header product-no">Blog No.</div>
            <div className="header product-name">Blog Image</div>
            <div className="header product-price">Blog Name</div>
            <div className="header product-status">Blog Text</div>
            <div className="header product-operations">Operations</div>

            {Blogs.map((blog, index) => (
              <React.Fragment key={blog._id}>
                <div className="product-no product-description">
                  {index + 1}
                </div>
                <div className="product-name product-description">
                  <img src={blog.image} alt={blog.blogName} />
                </div>
                <div className="product-price product-description">
                  {blog.blogName}
                </div>
                <div className="product-price product-description">
                  {blog.text}
                </div>
                <div className="product-operations product-description">
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(blog)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(blog)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modals for updating and adding Blogs */}
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