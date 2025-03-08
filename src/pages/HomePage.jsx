import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-gray-100 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        Welcome to Marketplace Application
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Easily manage your products and orders!
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          to="/products"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg text-center transition"
        >
          Manage Products
        </Link>
        <Link
          to="/orders"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg text-center transition"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
