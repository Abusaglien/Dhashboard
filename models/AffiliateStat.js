import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

export const AffiliateStat = mongoose.model(
    "AffiliateStat", 
    AffiliateStatSchema,
    "Affiliatestat",
);
