import { Schema, Types, model } from "mongoose";

const resourceSchema = new Schema(
  {
    subjectinfo: { type: Types.ObjectId, ref: "subject", required: [true, "subject is required"] },
    title: { type: String, required: [true, "title is required"], trim: true },
    type: {
      type: String,
      enum: ["notes", "slides", "video", "book", "link"],
      required: [true, "resource type is required"],
    },
    url: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    uploadedBy: { type: Types.ObjectId, ref: "user", required: [true, "uploader is required"] },
  },
  { versionKey: false, timestamps: true }
);

resourceSchema.index({ subjectinfo: 1, type: 1 });

export const resourcemodel = model("resource", resourceSchema);
