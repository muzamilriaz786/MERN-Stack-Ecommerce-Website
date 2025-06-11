import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
    const navigate = useNavigate();
    const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Try admin login
      const response = await api.post("/admin/login", formData);
      if (response.data.role === "admin") {
        window.location.href = "http://localhost:5173/";
        return;
      }
    } catch (error) {
        console.log(error, "error in admin")
    }

    try {
      // Try client login
      const response = await api.post("/login", formData);
      if (response.data.role === "client") {
        navigate("/");
        return;
      }
    } catch (clientError) {
      setError(
        clientError.response?.data?.msg || "Login failed. Please try again."
      );
    }
  };
  
  
  
  
  

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Login
      </h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-2 rounded text-sm text-center mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
};

export default Login;
