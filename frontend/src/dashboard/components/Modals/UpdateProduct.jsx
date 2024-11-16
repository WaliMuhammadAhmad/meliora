import { useEffect, useState } from "react";
import styles from "./style.module.css";

export default function UpdateModal({ show, onClose, product }) {
  console.log(product);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    description: "",
    detail: "",
    subDetail: "",
    frontImage: "",
    backImage: "",
    stockQuantity: "",
    sizes: "",
    price: "",
  });
  useEffect(() => {
    if (product) {
      setCurrentProduct({
        name: product.name,
        description: product.description,
        detail: product.detail,
        subDetail: product.subDetail,
        frontImage: product.frontImage,
        backImage: product.backImage,
        stockQuantity: product.stockQuantity,
        sizes: product.sizes,
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
    <div className={styles.modaloverlay}>
      <div className={styles.modalcontent}>
        <span className={styles.closeicon} onClick={onClose}>
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

        <label>detail:</label>
        <input
          type="text"
          value={currentProduct.detail}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              ingredient: e.target.value,
            }))
          }
        />

        <label>subDetail:</label>
        <input
          type="text"
          value={currentProduct.subDetail}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              ingredient: e.target.value,
            }))
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

        <label>Price:</label>
        <input
          type="number"
          value={currentProduct.price}
          onChange={(e) =>
            setCurrentProduct((prev) => ({ ...prev, price: e.target.value }))
          }
        />

        <label>stockQuantity:</label>
        <input
          type="number"
          value={currentProduct.stockQuantity}
          onChange={(e) =>
            setCurrentProduct((prev) => ({
              ...prev,
              stockQuantity: e.target.value,
            }))
          }
        />

        <div className="flex">
          <label>Front Image:</label>
          <img className="w-20 h-100" src={currentProduct.frontImage} alt="" />
        </div>
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

        <div className="flex">
          <label>Back Image:</label>
          <img className="w-20 h-100" src={currentProduct.backImage} alt="" />
        </div>
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
