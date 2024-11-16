import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import axios from "axios";

export default function Account() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    image: "",
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const id = "6719ce23a316938ba713dc0a";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/admins/${id}`);
        if (response.data) {
          setAdmin(response.data);
        } else {
          alert("No Admin found");
        }
      } catch (error) {
        console.error("Error fetching Admin:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in admin) {
      if (admin[key] === "" && key !== "image") {
        alert(`${key} cannot be empty`);
        return;
      }
    }

    const formData = new FormData();
    for (const key in admin) {
      formData.append(key, admin[key]);
    }
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      console.log("formData:", formData);
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post('/admins', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Admin updated successfully");
    } catch (error) {
      console.error("Error updating Admin:", error);
      alert("Failed to update admin");
    }
  };


  return (
    <>
      <div className={styles.account}>
        <h1>Account Information</h1>
        <div className={styles.accountinfo}>
          <div className={styles.inputs}>
            <form onSubmit={handleSubmit} encType="multipart/form-date">
              <div className={styles.name}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.apartmemailent}>
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.number}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
          <div className={styles.image}>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464l349.5 0c-8.9-63.3-63.3-112-129-112l-91.4 0c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304l91.4 0C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7L29.7 512C13.3 512 0 498.7 0 482.3z" />
              </svg>
            </div>
            <label htmlFor="admin-image">Upload Image</label>
            <input
              style={{ display: "none" }}
              type="file"
              name="admin-image"
              id="admin-image"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
