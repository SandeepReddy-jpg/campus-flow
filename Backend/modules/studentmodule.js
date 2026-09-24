import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: [true, "user is required"], unique: true },
    skills: { type: [String], default: [] },
    cgpa: { type: Number, required: [true, "cgpa is required"], min: 0, max: 10 },
    admissionYear: { type: Number, min: 1990, max: 2100 },
    graduationYear: { type: Number, min: 1990, max: 2100 },
    program: { type: String, trim: true, default: "" },
    linkdinurl: { type: String, trim: true, default: "" },
    githuburl: { type: String, trim: true, default: "" },
    potfoliourl: { type: String, trim: true, default: "" },
    resume: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

export const studentmodel = model("student", studentSchema);
