import { Schema, model } from "mongoose";

// Frontend CollegeManagement sends: name, code, address,
// contact:{phone,email,website}, desp, logo
const collegeSchema = new Schema(
  {
    name: { type: String, required: [true, "college name is required"], trim: true },
    code: { type: String, required: [true, "college code is required"], trim: true, uppercase: true, unique: true },
    address: { type: String, required: [true, "address is required"], trim: true },
    contact: {
      phone: { type: String, trim: true, default: "" },
      email: { type: String, trim: true, lowercase: true, default: "" },
      website: { type: String, trim: true, default: "" },
    },
    desp: { type: String, required: [true, "description is required"], trim: true },
    logo: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

collegeSchema.index({ name: "text", code: "text" });

export const collegemodel = model("college", collegeSchema);
