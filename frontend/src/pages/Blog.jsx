import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "../components/dashboard/components/Alert";
import BlogModal from "../components/dashboard/components/BlogModal";
import styles from './style.module.css'

axios.defaults.baseURL = "http://localhost:3001";

export default function AddBlogs() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Fetch blogs on component mount
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

  const handleUpdateClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog);
    setShowDeleteAlert(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`/blog/${blogToDelete._id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== blogToDelete._id));
      setShowDeleteAlert(false);
      setBlogToDelete(null);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handles adding or updating a blog
  const handleBlogSubmit = async (formData, blogId) => {
    try {
      console.log("Form data:", formData);
      if (blogId) {
        // Update blog
        const response = await axios.put(`/blog/${blogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b._id === blogId ? response.data : b))
        );
      } else {
        // Add new blog
        const response = await axios.post("/blog", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setBlogs((prevBlogs) => [...prevBlogs, response.data]);
      }
      setShowModal(false);
      setSelectedBlog(null);
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <>
      <div className={styles.manageItems}>
        <div className={styles.top}>
          <h1>Manage Blogs</h1>
          <button onClick={() => setShowModal(true)}>Add Blog</button>
        </div>
        <div className={styles.blogs}>
          <div className={styles.productgrid}>
          <div className={`${styles.header} ${styles.productno}`}>Blog No.</div>
          <div className={`${styles.header} ${styles.productname}`}>Blog Image</div>
          <div className={`${styles.header} ${styles.productprice}`}>Blog Name</div>
          <div className={`${styles.header} ${styles.productstatus}`}>Blog Text</div>
            <div className={`${styles.header} ${styles.productoperations}`}>Operations</div>

            {blogs.map((blog, index) => (
              <React.Fragment key={blog._id}>
               <div className={`${styles.productno} ${styles.productdescription}`}>
                  {index + 1}
                </div>
                <div className={`${styles.productname} ${styles.productdescription}`}>
                  <img src={blog.image} alt={blog.blogName} />
                </div>
                <div className={`${styles.productprice} ${styles.productdescription}`}>
                  {blog.name}
                </div>
                <div className={`${styles.productprice} ${styles.productdescription}`}>
                  {blog.text}
                </div>
                <div className={`${styles.productoperations} ${styles.productdescription}`}>
                  <button
                    className={styles.updatebtn}
                    onClick={() => handleUpdateClick(blog)}
                  >
                    Update
                  </button>
                  <button
                    className={styles.deletebtn}
                    onClick={() => handleDeleteClick(blog)}
                  >
                    Delete
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <BlogModal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedBlog(null);
          }}
          blog={selectedBlog}
          onSubmit={handleBlogSubmit} // Pass the unified submit handler
        />

        {showDeleteAlert && (
          <Alert
            productName={blogToDelete?.name}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteAlert(false)}
          />
        )}
      </div>
    </>
  );
}