import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/showTrustBadges.css";

const ShowTrustBadges = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editBadgeId, setEditBadgeId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const response = await api.get("/getTrustBadges");
      setBadges(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load trust badges");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/deleteTrustBadges/${id}`);
      setBadges(badges.filter((badge) => badge._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete trust badge");
    }
  };

  const handleEditClick = (badge) => {
    setEditBadgeId(badge._id);
    setEditData(badge);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditSave = async (id) => {
    try {
      const response = await api.put(`/updateTrustBadges/${id}`, editData);
      setBadges(
        badges.map((badge) => (badge._id === id ? response.data : badge))
      );
      setEditBadgeId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update trust badge");
    }
  };

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
            {editBadgeId === badge._id ? (
              <>
                <div className="trust-badge">
                  <input
                    type="text"
                    name="trustHeading"
                    value={editData.trustHeading}
                    onChange={handleEditChange}
                    placeholder="Trust Heading"
                  />
                  <input
                    type="text"
                    name="trustDescription"
                    value={editData.trustDescription}
                    onChange={handleEditChange}
                    placeholder="Trust Description"
                  />
                </div>
                <span className="separator"></span>
                <div className="trust-badge">
                  <input
                    type="text"
                    name="geniuneHeading"
                    value={editData.geniuneHeading}
                    onChange={handleEditChange}
                    placeholder="Genuine Heading"
                  />
                  <input
                    type="text"
                    name="geniuneDescription"
                    value={editData.geniuneDescription}
                    onChange={handleEditChange}
                    placeholder="Genuine Description"
                  />
                </div>
                <span className="separator"></span>
                <div className="trust-badge">
                  <input
                    type="text"
                    name="fastDeliveryHeading"
                    value={editData.fastDeliveryHeading}
                    onChange={handleEditChange}
                    placeholder="Fast Delivery Heading"
                  />
                  <input
                    type="text"
                    name="fastDeliveryDescription"
                    value={editData.fastDeliveryDescription}
                    onChange={handleEditChange}
                    placeholder="Fast Delivery Description"
                  />
                </div>
                <div className="trust-badge-colors">
                  <input
                    type="text"
                    name="bgColor"
                    value={editData.bgColor}
                    onChange={handleEditChange}
                    placeholder="Background Color (e.g., #ffffff)"
                  />
                  <input
                    type="text"
                    name="fontColor"
                    value={editData.fontColor}
                    onChange={handleEditChange}
                    placeholder="Font Color (e.g., #000000)"
                  />
                </div>
                <button onClick={() => handleEditSave(badge._id)}>Save</button>
                <button onClick={() => setEditBadgeId(null)}>Cancel</button>
              </>
            ) : (
              <>
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
                  <p className="trustparagraph">
                    {badge.fastDeliveryDescription}
                  </p>
                </div>
                <button onClick={() => handleEditClick(badge)}>Edit</button>
                <button onClick={() => handleDelete(badge._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowTrustBadges;
