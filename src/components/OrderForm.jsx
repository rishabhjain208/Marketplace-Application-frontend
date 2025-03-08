import { useState } from "react";
import { createOrder } from "../api";
import { toast } from "react-toastify";

const OrderForm = ({ products, fetchOrders }) => {
  const [order, setOrder] = useState({ productId: "", quantity: 1 });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderPayload = {
        products: [
          {
            product: order.productId,
            quantity: Number(order.quantity),
          },
        ],
      };
      await createOrder(orderPayload);
      toast.success("Order placed successfully!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to place order!");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 border rounded-lg shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Place Order</h2>
      <select
        name="productId"
        value={order.productId}
        onChange={handleChange}
        required
        className="w-full border p-2 mb-3 rounded-lg"
      >
        <option value="">Select a Product</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name} - ₹{product.price}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="quantity"
        value={order.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        min="1"
        required
        className="w-full border p-2 mb-3 rounded-lg"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
