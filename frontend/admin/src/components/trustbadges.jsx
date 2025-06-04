import { useState } from "react";
import api from "../services/api";

const TrustBadge = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const trustData = {
      trustHeading: form.trustHeading.value,
      trustDescription: form.trustDescription.value,
      geniuneHeading: form.geniuneHeading.value,
      geniuneDescription: form.geniuneDescription.value,
      fastDeliveryHeading: form.fastDeliveryHeading.value,
      fastDeliveryDescription: form.fastDeliveryDescription.value,
      fontColor: form.fontColor.value,
      bgColor: form.bgColor.value,
    };

    try {
      setIsSubmitting(true);
      const response = await api.post("/uploadTrustBadges", trustData);
      if (response.status === 200 || response.status === 201) {
        alert("✅ Data successfully submitted!");
        form.reset();
      } else {
        alert("❌ Error: data not submitted.");
      }
    } catch (error) {
      console.error("Error submitting trust badge:", error);
      alert("❌ An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>Trust Badge Form</h2>

      <input
        type="text"
        name="trustHeading"
        placeholder="Trust Heading (e.g., 100%)"
        required
      />
      <input
        type="text"
        name="trustDescription"
        placeholder="Trust Description (e.g., Highly Reliable)"
        required
      />
      <input
        type="text"
        name="geniuneHeading"
        placeholder="Genuine Heading (e.g., Verified)"
        required
      />
      <input
        type="text"
        name="geniuneDescription"
        placeholder="Genuine Description (e.g., Authentic)"
        required
      />
      <input
        type="text"
        name="fastDeliveryHeading"
        placeholder="Fast Delivery Heading (e.g., 24h Shipping)"
        required
      />
      <input
        type="text"
        name="fastDeliveryDescription"
        placeholder="Fast Delivery Description (e.g., Guaranteed)"
        required
      />

      <div style={{ marginTop: "10px" }}>
        <label htmlFor="fontColor">Font Color: </label>
        <input type="color" name="fontColor" id="fontColor" required />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="bgColor">Background Color: </label>
        <input type="color" name="bgColor" id="bgColor" required />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default TrustBadge;
