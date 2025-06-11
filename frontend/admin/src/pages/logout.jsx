import api from "../services/api"; // assuming you have axios instance

const logout = async () => {
  try {
    await api.post("/logout"); // Call the backend logout route
    window.location.href = "http://localhost:5174/login"; // Or use navigate('/') if you're inside a component
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default logout;
