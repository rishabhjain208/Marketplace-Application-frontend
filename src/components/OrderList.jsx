import { useEffect, useState } from "react";
import { getOrders, deleteOrder, getProductById } from "../api";
import { toast } from "react-toastify";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [deleteOrderId, setDeleteOrderId] = useState(null); // Track order to delete

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      fetchMissingProductDetails(orders);
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data.orders);
    } catch (error) {
      toast.error("Failed to fetch orders!");
      console.error(error);
    }
  };

  const fetchMissingProductDetails = async (orders) => {
    let productInfo = { ...productDetails };
    for (let order of orders) {
      for (let item of order.products) {
        if (
          item.product &&
          typeof item.product === "string" &&
          !productInfo[item.product]
        ) {
          try {
            const res = await getProductById(item.product);
            productInfo[item.product] = res.data;
          } catch (error) {
            console.error("Failed to fetch product:", error);
          }
        }
      }
    }
    setProductDetails(productInfo);
  };

  const handleDelete = async () => {
    if (!deleteOrderId) return;
    try {
      await deleteOrder(deleteOrderId);
      toast.success("Order deleted successfully!");
      setDeleteOrderId(null); // Close modal after deleting
      fetchOrders();
    } catch (error) {
      toast.error("Failed to delete order!");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border p-4 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-700">Status: {order.status}</p>
              <p className="font-bold text-gray-900">
                Total Amount: ₹{order.totalAmount}
              </p>

              <h4 className="mt-2 font-semibold text-gray-800">Products:</h4>
              <ul>
                {order.products.map((item, index) => {
                  const product =
                    item.product && typeof item.product === "object"
                      ? item.product
                      : productDetails[item.product];

                  return (
                    <li key={index} className="border-b py-2 text-gray-700">
                      {product ? (
                        <>
                          <span className="font-bold">
                            {product.name || "No Name"}
                          </span>{" "}
                          - {product.description || "No Description"} <br /> ₹
                          {item.price || 0} x {item.quantity}
                        </>
                      ) : (
                        <p className="text-red-500">Product details missing!</p>
                      )}
                    </li>
                  );
                })}
              </ul>

              <button
                className="bg-red-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => setDeleteOrderId(order._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOrderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this order?
            </p>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setDeleteOrderId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
