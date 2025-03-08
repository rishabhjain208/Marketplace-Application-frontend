import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../api";

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product._id !== id));
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
      <h2 className="text-2xl font-bold mb-4">Products</h2>

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

      {/* Product List */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No matching products found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border p-4 rounded-lg shadow"
            >
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-900 font-bold">₹{product.price}</p>

              {/* Edit & Delete Buttons */}
              <div className="mt-3 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
