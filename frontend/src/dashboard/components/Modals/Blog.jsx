import { useState, useEffect } from "react";
import styles from './style.module.css'

export default function Blog({ show, onClose, blog, onSubmit }) {
  const [currentBlog, setCurrentBlog] = useState({
    blogName: "",
    text: "",
    image: null,
  });

  // Load blog data into the modal if updating
  useEffect(() => {
    if (blog) {
      setCurrentBlog({
        blogName: blog.blogName || "",
        text: blog.text || "",
        image: blog.image || null,
      });
    } else {
      setCurrentBlog({
        blogName: "",
        text: "",
        image: null,
      });
    }
  }, [blog]);

  const handleSubmit = async () => {
    const formData = new FormData();

    // Log values before appending to ensure they are populated
    console.log("Current Blog Data:", currentBlog);
    formData.append("blogName", currentBlog.blogName);
    formData.append("text", currentBlog.text);
    console.log(
      "Current Blog Data after appending:",
      formData.blogName,
      formData.text
    );
    if (currentBlog.image) formData.append("image", currentBlog.image);

    try {
      await onSubmit(formData, blog?._id);
      console.log("Submitted FormData:", Array.from(formData.entries()));
      onClose(); // Close modal after submission
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <span className={styles.closeicon} onClick={onClose}>
          &times;
        </span>
        <h2>{blog ? "Update Blog" : "Add Blog"}</h2>
        <label>Blog Name:</label>
        <input
          type="text"
          value={currentBlog.blogName}
          onChange={(e) =>
            setCurrentBlog((prev) => ({ ...prev, blogName: e.target.value }))
          }
        />
        <label>Description:</label>
        <input
          type="text"
          value={currentBlog.text}
          onChange={(e) =>
            setCurrentBlog((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) =>
            setCurrentBlog((prev) => ({
              ...prev,
              image: e.target.files[0],
            }))
          }
        />
        <button onClick={handleSubmit}>
          {blog ? "Update Blog" : "Add Blog"}
        </button>
      </div>
    </div>
  );
}
