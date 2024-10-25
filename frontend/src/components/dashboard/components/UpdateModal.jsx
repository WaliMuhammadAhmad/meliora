import { useEffect, useState } from "react";

export default function UpdateModal({ show, onClose, product }) {
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    ingredient: "",
    price: "",
  });
  useEffect(() => {
    if (product) {
      setCurrentProduct({
        name: product.name,
        description: product.description,
        ingredient: product.ingredient,
        price: product.price,
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
        <span className="close-icon" onClick={onClose}>
          &times;
        </span>
        <h2>Update Product</h2>
        <label>Product Name:</label>
        <input
          type="text"
          value={currentProduct.name}
          onChange={(e) =>
            setCurrentProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />

        <label>Description:</label>
        <input
          type="text"
          value={currentProduct.description}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />

        <label>Ingredients:</label>
        <input
          type="text"
          value={currentProduct.ingredient}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              ingredient: e.target.value,
            }))
          }
        />

        <label>Price:</label>
        <input
          type="number"
          value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <label>Front Image:</label>
        <input
          type="file"
          // value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              frontImage: e.target.files[0],
            }))
          }
        />
        <label>Back Image:</label>
        <input
          type="file"
          // value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              backImage: e.target.files[0],
            }))
          }
        />
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
}
