import { Schema, Types, model } from "mongoose";

const requestSchema = new Schema(
  {
    userinfo: { type: Types.ObjectId, ref: "user", required: [true, "user is required"] },
    catogery: {
      type: String,
      enum: ["leave", "document_request", "fee_related", "course_drop", "subject_change", "project_extension", "grievance", "other"],
      required: [true, "category is required"],
    },
    title: { type: String, required: [true, "title is required"], trim: true },
    subject: { type: String, required: [true, "subject is required"], trim: true },
    attachments: { type: String, default: "" },
    action: {
      type: String,
      enum: ["submitted", "reviewed", "approved", "rejected", "escalated", "commented"],
      default: "submitted",
    },
    priority: { type: String, enum: ["low", "normal", "high", "urgent"], default: "normal" },
  },
  { versionKey: false, timestamps: true }
);

requestSchema.index({ userinfo: 1, catogery: 1 });
requestSchema.index({ action: 1, priority: 1 });

export const requestmodel = model("request", requestSchema);
