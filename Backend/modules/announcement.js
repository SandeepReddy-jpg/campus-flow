import { Schema, Types, model } from "mongoose";

function boolCoerce(v) {
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["true", "1", "yes"].includes(s)) return true;
    if (["false", "0", "no", ""].includes(s)) return false;
  }
  return v;
}

const announcementSchema = new Schema(
  {
    coursesinfo: { type: Types.ObjectId, ref: "courses", required: [true, "course is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    name: { type: String, required: [true, "title is required"], trim: true },
    content: { type: String, required: [true, "content is required"], trim: true },
    priority: { type: String, enum: ["low", "normal", "high", "urgent"], default: "normal" },
    postedby: { type: Types.ObjectId, ref: "user", required: [true, "postedby is required"] },
    ispinned: { type: Boolean, default: false, set: boolCoerce },
  },
  { versionKey: false, timestamps: true }
);

announcementSchema.index({ deptinfo: 1, coursesinfo: 1 });
announcementSchema.index({ ispinned: -1, createdAt: -1 });

export const announcementmodel = model("announcement", announcementSchema);
