import { Schema, model } from "mongoose";

// Aligned with Frontend Register/UserManagement: role, username, email,
// id (campus/roll id), password, phno, department, branch (students only).
const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["student", "teacher", "placement-office", "hod", "admin"],
      required: [true, "role is required"],
    },
    username: { type: String, required: [true, "username is required"], trim: true },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "email must be valid"],
    },
    id: { type: String, required: [true, "campus id is required"], unique: true, trim: true },
    password: { type: String, required: [true, "password is required"], select: false },
    phno: { type: Number, required: [true, "phone number is required"] },
    department: { type: String, trim: true, default: "" },
    branch: { type: String, trim: true, default: "" },
    avatar: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

userSchema.index({ role: 1, isActive: 1 });

export const usermodel = model("user", userSchema);
