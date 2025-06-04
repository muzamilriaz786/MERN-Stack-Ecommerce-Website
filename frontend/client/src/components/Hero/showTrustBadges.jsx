import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/showTrustBadges.css";

const ShowTrustBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await api.get("/getTrustBadges");
        setBadges(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load trust badges");
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  if (loading) return <p>Loading trust badges...</p>;
  if (error) return <p>{error}</p>;

  if (badges.length === 0) return <p>No trust badges found.</p>;

  return (
    <section className="trust-badges">
      <div className="trust-badges-container">
        {badges.map((badge) => (
          <div
            key={badge._id}
            className="trust-badge-group"
            style={{
              backgroundColor: badge.bgColor,
              color: badge.fontColor,
            }}
          >
            <div className="trust-badge">
              <h3 className="trustHeading">{badge.trustHeading}</h3>
              <p className="trustparagraph">{badge.trustDescription}</p>
            </div>
            <span className="separator"></span>
            <div className="trust-badge">
              <h3 className="trustHeading">{badge.geniuneHeading}</h3>
              <p className="trustparagraph">{badge.geniuneDescription}</p>
            </div>
            <span className="separator"></span>
            <div className="trust-badge">
              <h3 className="trustHeading">{badge.fastDeliveryHeading}</h3>
              <p className="trustparagraph">{badge.fastDeliveryDescription}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowTrustBadges;
