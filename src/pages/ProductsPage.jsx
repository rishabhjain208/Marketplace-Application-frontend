import { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Products</h1>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <ProductForm
          selectedProduct={selectedProduct}
          clearSelection={() => setSelectedProduct(null)}
        />
      </div>
      <div className="mt-6">
        <ProductList onEdit={(product) => setSelectedProduct(product)} />
      </div>
    </div>
  );
};

export default ProductsPage;
