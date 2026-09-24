import { Schema, Types, model } from "mongoose";

const eventSchema = new Schema(
  {
    coursesinfo: { type: Types.ObjectId, ref: "courses", required: [true, "course is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    name: { type: String, required: [true, "event name is required"], trim: true },
    decp: { type: String, required: [true, "description is required"], trim: true },
    catogery: {
      type: String,
      enum: ["academic", "cultural", "sports", "placement", "holiday", "exam", "seminar", "other"],
      required: [true, "category is required"],
    },
    startdate: { type: String, required: [true, "start date is required"], trim: true },
    enddate: { type: String, required: [true, "end date is required"], trim: true },
    members: { type: Number, required: [true, "members count is required"], min: 0 },
    logo: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.index({ deptinfo: 1, catogery: 1 });

export const eventmodel = model("event", eventSchema);
