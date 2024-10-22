import React, { useState, useEffect } from 'react'


const UpdateModal = ({ show, onClose, product }) => {
    const [currentProduct, setCurrentProduct] = useState({
        name: '',
        description: '',
        ingredient: '',
        price: ''
    });
    useEffect(() => {
        if (product) {
            setCurrentProduct({
                name: product.name,
                description: product.description,
                ingredient: product.ingredient,
                price: product.price
            });
        }
    }, [product]);

    if (!show) return null;


    const handleSubmit = () => {
        // onUpdate({ ...productData, name: productName, price });
        // onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-icon" onClick={onClose}>&times;</span>
                <h2>Update Blog</h2>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, name: e.target.value }))}
                />

                <label>Description:</label>
                <input
                    type="text"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, description: e.target.value }))}
                />
                <label>Image:</label>
                <input
                    type="file"
                    // value={currentProduct.price}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, Image: e.target.files[0] }))}
                />

                <button onClick={handleSubmit}>Update</button>
            </div>
        </div>
    );
};

const AddModal = ({ show, onClose }) => {

    const [currentProduct, setCurrentProduct] = useState({});
    if (!show) return null;


    const handleSubmit = () => {
        // onUpdate({ ...productData, name: productName, price });
        // onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-icon" onClick={onClose}>&times;</span>
                <h2>Add Blog</h2>
                <label>Blog Name:</label>
                <input
                    type="text"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, name: e.target.value }))}
                />

                <label>Description:</label>
                <input
                    type="text"
                    value={currentProduct.description}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, description: e.target.value }))}
                />
                <label>Image:</label>
                <input
                    type="file"
                    // value={currentProduct.price}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, Image: e.target.files[0] }))}
                />

                <button onClick={handleSubmit}>Add Blog</button>
            </div>
        </div>
    );
};



export default function AddBlog() {
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState({});
    const handleUpdateClick = () => {
        setSelectedBlog({ name: 'zain', description: '27127192197829', ingredient: 'hello chocloate', price: '25' });
        setShowModal(true);
    };
    const handleAddClick = () => {
        setShowAddModal(true);
    };
    return (
        <>
            <div className="manage-products">
                <div className="top">

                    <h1>Manage Blogs</h1>
                    <button onClick={() => handleAddClick()} >Add Blog</button>
                </div>
                <div className="blog-grid">
                    <div className="header product-no">Blog No.</div>
                    <div className="header product-name">Blog Name</div>
                    <div className="header product-price">Blog Image</div>
                    <div className="header product-operations">Operations</div>

                    <div className="product-no product-description">1</div>
                    <div className="product-name product-description">Meliora Body Soap</div>
                    <div className="product-price product-description"><img src="" alt="" /></div>
                    <div className="product-operations product-description">
                        <button className="update-btn" onClick={() => handleUpdateClick()}>Update</button>
                        <button className="delete-btn">Delete</button>
                    </div>

                    <div className="product-no product-description">1</div>
                    <div className="product-name product-description">Meliora Body Soap</div>
                    <div className="product-price product-description"><img src="" alt="" /></div>
                    <div className="product-operations product-description">
                        <button className="update-btn" onClick={() => handleUpdateClick()}>Update</button>
                        <button className="delete-btn">Delete</button>
                    </div>

                    <div className="product-no product-description">1</div>
                    <div className="product-name product-description">Meliora Body Soap</div>
                    <div className="product-price product-description"><img src="" alt="" /></div>
                    <div className="product-operations product-description">
                        <button className="update-btn" onClick={() => handleUpdateClick()}>Update</button>
                        <button className="delete-btn">Delete</button>
                    </div>
                </div>
            </div>
            <UpdateModal
                show={showModal}
                onClose={() => setShowModal(false)}
                product={selectedBlog}
            // onUpdate={handleUpdate}
            />
            <AddModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
            // product={selectedProduct}
            // onUpdate={handleUpdate}
            />
        </>
    )
}
