import { Schema, Types, model } from "mongoose";

const companySchema = new Schema(
  {
    collegeinfo: { type: Types.ObjectId, ref: "college", required: [true, "college is required"] },
    name: { type: String, required: [true, "company name is required"], trim: true },
    sector: { type: String, required: [true, "sector is required"], trim: true },
    industry: { type: String, required: [true, "industry is required"], trim: true },
    hrname: { type: String, required: [true, "HR name is required"], trim: true },
    hrphno: { type: Number, required: [true, "HR phone is required"] },
    hremail: {
      type: String,
      required: [true, "HR email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "HR email must be valid"],
    },
    descp: { type: String, required: [true, "description is required"], trim: true },
    logo: { type: String, default: "" },
    isRecruiting: {
      type: Boolean,
      default: true,
      set: (v) => {
        if (typeof v === "string") {
          const s = v.trim().toLowerCase();
          if (["true", "1", "yes"].includes(s)) return true;
          if (["false", "0", "no"].includes(s)) return false;
        }
        return v;
      },
    },
  },
  { versionKey: false, timestamps: true }
);

companySchema.index({ collegeinfo: 1, name: 1 });

export const companymodel = model("company", companySchema);
