import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Change if needed

// Product APIs
export const getProducts = () =>
  axios.get(`${API_URL}/products/getAllProducts`);
export const getProductById = (id) =>
  axios.get(`${API_URL}/products/getProduct/${id}`);
export const createProduct = (data) =>
  axios.post(`${API_URL}/products/createProduct`, data);
export const updateProduct = (id, data) =>
  axios.put(`${API_URL}/products/updateProduct/${id}`, data);
export const deleteProduct = (id) =>
  axios.delete(`${API_URL}/products/deleteProduct/${id}`);

export const getAllProducts = (id) =>
  axios.get(`${API_URL}/products/getAllProducts`);

// Order APIs
export const getOrders = () => axios.get(`${API_URL}/orders/getAllOrder`);
export const createOrder = (data) =>
  axios.post(`${API_URL}/orders/createOrder`, data);
export const updateOrderStatus = (id, status) =>
  axios.put(`${API_URL}/orders/updateOrderStatus/${id}`, { status });
export const deleteOrder = (id) =>
  axios.delete(`${API_URL}/orders/deleteOrder/${id}`);
