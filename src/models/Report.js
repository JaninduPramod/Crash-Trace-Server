import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    vehicleNo: { type: String, required: true },
    cardID: { type: String, unique: true }, // Incrementing string
    title: { type: String, required: false,default: "Untitled Report" },
    imageUrl: { type: String, required: false },
    description: { type: String, required: false },
    location: { type: [String], required: false },
    address: { type: String },
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: false },
    status: { type: String, default: "pending" },
    trustRate: { type: Number, default: 0 },
    damageRate: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Pre-save hook to increment cardID as a zero-padded string
reportSchema.pre("save", async function (next) {
  if (!this.isNew) return next(); // Only generate cardID for new documents

  const lastReport = await mongoose.model("Report").findOne().sort({ createdAt: -1 });
  const lastCardID = lastReport && !isNaN(parseInt(lastReport.cardID)) ? parseInt(lastReport.cardID) : 0;

  this.cardID = String(lastCardID + 1).padStart(4, "0"); // Increment and pad with zeros
  next();
});

const Report = mongoose.model("Report", reportSchema);
export default Report;