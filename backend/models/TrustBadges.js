import mongoose from "mongoose";

const TrustBadgesSchema = new mongoose.Schema(
  {
    trustHeading: {
      type: String,
      required: true,
    },
    trustDescription: {
      type: String,
      required: true,
    },
    geniuneHeading: {
      type: String,
      required: true,
    },
    geniuneDescription: {
      type: String,
      required: true,
    },
    fastDeliveryHeading: {
      type: String,
      required: true,
    },
    fastDeliveryDescription: {
      type: String,
      required: true,
    },
    fontColor: {
      type: String,
      default: "#000000", // default black
    },
    bgColor: {
      type: String,
      default: "#ffffff", // default white
    },
  },
  {
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

const TrustBadges = mongoose.model("TrustBadges", TrustBadgesSchema);

export default TrustBadges;
