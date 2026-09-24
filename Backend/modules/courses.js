import { Schema, Types, model } from "mongoose";

const coursesSchema = new Schema(
  {
    collegeinfo: { type: Types.ObjectId, ref: "college", required: [true, "college is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    name: { type: String, required: [true, "course name is required"], trim: true },
    code: { type: String, required: [true, "course code is required"], trim: true, uppercase: true, unique: true },
    credits: { type: Number, required: [true, "credits are required"], min: 0 },
    duration: { type: String, required: [true, "duration is required"], trim: true },
    descp: { type: String, required: [true, "description is required"], trim: true },
  },
  { versionKey: false, timestamps: true }
);

coursesSchema.index({ collegeinfo: 1, deptinfo: 1 });

export const coursesmodel = model("courses", coursesSchema);
