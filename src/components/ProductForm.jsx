import { useState, useEffect } from "react";
import { createProduct, updateProduct } from "../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = ({ selectedProduct, clearSelection }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    } else {
      setProduct({ name: "", price: "", description: "" });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, product);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(product);
        toast.success("Product added successfully!");
      }
      clearSelection();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        {selectedProduct ? "Edit Product" : "Add Product"}
      </h2>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border p-2 mb-3 rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2 mb-3 rounded"
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 mb-3 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {selectedProduct ? "Update" : "Add"} Product
      </button>
    </form>
  );
};

export default ProductForm;
