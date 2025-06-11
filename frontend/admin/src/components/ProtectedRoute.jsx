import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // your Axios config with withCredentials

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/check-auth");
        const userRole = res.data.role;

        if (allowedRoles.includes(userRole)) {
          setAuthorized(true);
        } else {
            window.location.href = "http://localhost:5174/login";
        }
      } catch (err) {
        window.location.href = "http://localhost:5174/login";
          console.log(err)
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [allowedRoles, navigate]);

  if (loading) return <div>Loading...</div>;

  return authorized ? children : null;
};

export default ProtectedRoute;
