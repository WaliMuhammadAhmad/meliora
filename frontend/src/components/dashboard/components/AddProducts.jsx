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
                    <table id="customers">
                        <tr>
                            <th>Product No.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Zain Manzoor</td>
                            <td>50</td>
                            <td>In Stock</td>
                            <td><span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => handleUpdateClick()}>Update</span>
                                <span style={{ cursor: 'pointer', fontWeight: 'bold', color: 'red', marginLeft: '10px' }}>Delete</span></td>
                        </tr>

                    </table>


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
