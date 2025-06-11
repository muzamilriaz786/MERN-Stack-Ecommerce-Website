import { useEffect, useState } from "react";

const CartList = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <ul style={styles.itemsList}>
          {cart.map((item, index) => (
            <li key={index} style={styles.item}>
              <h4 style={styles.itemTitle}>{item.title}</h4>
              <img src={item.image} alt={item.title} style={styles.itemImage} />
              <p style={styles.itemDetail}>Quantity: {item.quantity}</p>
              <p style={styles.itemDetail}>Price: ${item.price.toFixed(2)}</p>
              <p style={styles.itemTotal}>
                Total: ${(item.quantity * item.price).toFixed(2)}
              </p>
              <button style={styles.buyButton}>Buy Now</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  itemImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },

  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "600",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#666",
    fontSize: "18px",
  },
  itemsList: {
    listStyle: "none",
    padding: "0",
  },
  item: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "6px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    borderLeft: "4px solid #4CAF50",
  },
  itemTitle: {
    margin: "0 0 10px 0",
    color: "#2c3e50",
    fontSize: "20px",
  },
  itemDetail: {
    margin: "5px 0",
    color: "#555",
    fontSize: "16px",
  },
  itemTotal: {
    margin: "10px 0",
    fontWeight: "bold",
    color: "#2c3e50",
    fontSize: "18px",
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
    marginTop: "10px",
  },
};

export default CartList;
