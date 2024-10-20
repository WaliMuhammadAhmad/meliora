import React, { useEffect, useState } from 'react'

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
                <h2>Update Product</h2>
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

                <label>Ingredients:</label>
                <input
                    type="text"
                    value={currentProduct.ingredient}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, ingredient: e.target.value }))}
                />

                <label>Price:</label>
                <input
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, price: e.target.value }))}
                />
                <label>Front Image:</label>
                <input
                    type="number"
                // value={currentProduct.price}
                // onChange={(e) => setPrice(e.target.value)}
                />
                <label>Back Image:</label>
                <input
                    type="number"
                // value={currentProduct.price}
                // onChange={(e) => setPrice(e.target.value)}
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
                <h2>Add Product</h2>
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

                <label>Ingredients:</label>
                <input
                    type="text"
                    value={currentProduct.ingredients}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, ingredients: e.target.value }))}
                />

                <label>Price:</label>
                <input
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) => setCurrentProduct(prev => ({ ...prev, price: e.target.value }))}
                />
                <label>Front Image:</label>
                <input
                    type="number"
                // value={currentProduct.price}
                // onChange={(e) => setPrice(e.target.value)}
                />
                <label>Back Image:</label>
                <input
                    type="number"
                // value={currentProduct.price}
                // onChange={(e) => setPrice(e.target.value)}
                />
                <button onClick={handleSubmit}>Add Product</button>
            </div>
        </div>
    );
};


export default function AddProducts() {
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const handleUpdateClick = () => {
        setSelectedProduct({ name: 'zain', description: '27127192197829', ingredient: 'hello chocloate', price: '25' });
        setShowModal(true);
    };
    const handleAddClick = () => {
        setShowAddModal(true);
    };
    return (
        <>
            <div className="manage-products">
                <div className="top">

                    <h1>Manage Products</h1>
                    <button onClick={() => handleAddClick()} >Add Product</button>
                </div>
                <div className="products">
                    <div className="product-grid">
                        <div className="header product-no">Product No.</div>
                        <div className="header product-name">Product Name</div>
                        <div className="header product-price">Price</div>
                        <div className="header product-status">Status</div>
                        <div className="header product-operations">Operations</div>

                        <div className="product-no product-description">3</div>
                        <div className="product-name product-description">Meliora Body Soap</div>
                        <div className="product-price product-description">10</div>
                        <div className="product-status out-of-stock product-description">Out of Stock</div>
                        <div className="product-operations product-description">
                            <button className="update-btn" onClick={() => handleUpdateClick()}>Update</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                        <div className="product-no product-description">3</div>
                        <div className="product-name product-description">Meliora Body Soap</div>
                        <div className="product-price product-description">10</div>
                        <div className="product-status out-of-stock product-description">Out of Stock</div>
                        <div className="product-operations product-description">
                            <button className="update-btn" onClick={() => handleUpdateClick()}>Update</button>
                            <button className="delete-btn">Delete</button>
                        </div>
                       
                    </div>
                </div>

                <UpdateModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    product={selectedProduct}
                // onUpdate={handleUpdate}
                />
                <AddModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                // product={selectedProduct}
                // onUpdate={handleUpdate}
                />

            </div>
        </>
    )
}


// Made by: Zain Manzoor github: ZainManzoor2003
