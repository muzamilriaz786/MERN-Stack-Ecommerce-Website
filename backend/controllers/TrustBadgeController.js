import TrustBadgeData from "../models/TrustBadges.js";
export const saveTrustBadges = async (req,res) => {
      try {
        const {
          trustHeading,
          trustDescription,
          geniuneHeading,
          geniuneDescription,
          fastDeliveryHeading,
          fastDeliveryDescription,
          fontColor,
          bgColor,
        } = req.body;

        if (!trustHeading || !trustDescription) {
          return res
            .status(400)
            .json({ error: "trustHeading and trustDescription are required" });
        }

        const trustBadges = await TrustBadgeData.create({
          trustHeading,
          trustDescription,
          geniuneHeading,
          geniuneDescription,
          fastDeliveryHeading,
          fastDeliveryDescription,
          fontColor,
          bgColor,
        });

        return res.status(201).json(trustBadges);
      } catch (error) {
        console.log("Error in saveTrustBadges:", error);
        return res.status(500).json({ error: "Failed to save trust badge" });
      }
    };

export const getTrustBadges = async (req,res) => {
    const trustBadges = await TrustBadgeData.find();
    return res.status(200).json(trustBadges);
}
export const updateTrustBadges = async (req, res) => {
  try {
    const trustBadgeId = req.params.id;
    const updatedTrustBadge = await TrustBadgeData.findByIdAndUpdate(
      trustBadgeId,
      req.body,
      { new: true, runValidators: true } // return the updated doc + apply schema validation
    );

    if (!updatedTrustBadge) {
      return res.status(404).json({ error: "Trust badge not found" });
    }

    return res.status(200).json(updatedTrustBadge);
  } catch (error) {
    console.error("Error in updateTrustBadges:", error);
    res.status(500).json({ error: "Failed to update trust badge" });
  }
};

export const deleteTrustBadges = async (req, res) => {
  try {
    const trustBadgesId = req.params.id;
    const trustBadges = await TrustBadgeData.findByIdAndDelete(trustBadgesId);

    if (!trustBadges) {
      return res.status(404).json({ error: "Trust badge not found" });
    }

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error in deleteTrustBadges:", error);
    res.status(500).json({ error: "Failed to delete trust badge" });
  }
};
