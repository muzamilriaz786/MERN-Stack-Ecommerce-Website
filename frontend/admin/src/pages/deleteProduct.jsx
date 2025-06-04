import  { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const DeleteProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        const response = await api.delete(`/deleteProducts/${id}`);
        console.log("Deleted:", response.data);
        // After deletion, redirect back to product list or another page
        navigate("/");
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    deleteProduct();
  }, [id, navigate]);

  return (
    <div>
      <h2>Deleting product...</h2>
    </div>
  );
};

export default DeleteProductPage;
