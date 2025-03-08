import { useState, useEffect } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import { getAllProducts } from "../api";

const OrdersPage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Manage Orders</h1>
      <OrderForm products={products} fetchOrders={() => {}} />
      <OrderList />
    </div>
  );
};

export default OrdersPage;
