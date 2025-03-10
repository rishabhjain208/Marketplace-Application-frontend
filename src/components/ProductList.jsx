import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const openModal = (product) => {
    setProductToDelete(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete._id);
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;
    const matchesPrice =
      (priceRange.min === "" || product.price >= Number(priceRange.min)) &&
      (priceRange.max === "" || product.price <= Number(priceRange.max));

    return matchesName && matchesCategory && matchesPrice;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Products</h2>

      {/* Search & Filter Section */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange({ ...priceRange, min: e.target.value })
          }
          className="border p-2 rounded w-1/4"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: e.target.value })
          }
          className="border p-2 rounded w-1/4"
        />
        {/* <input
          type="text"
          placeholder="Filter by Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-1/3"
        /> */}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No matching products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold text-green-600">₹{product.price}</p>
              {/* <p className="text-gray-500">
                Category: {product.category || "N/A"}
              </p> */}
              <div className="mt-3 flex gap-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  onClick={() => openModal(product)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold text-gray-800">Confirm Delete</h2>
        <p className="text-gray-600 mt-2">
          Are you sure you want to delete <b>{productToDelete?.name}</b>?
        </p>
        <div className="mt-4 flex gap-4">
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
