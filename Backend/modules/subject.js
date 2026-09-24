import { Schema, Types, model } from "mongoose";

const subjectSchema = new Schema(
  {
    collegeinfo: { type: Types.ObjectId, ref: "college", required: [true, "college is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    courseinfo: { type: Types.ObjectId, ref: "courses", required: [true, "course is required"] },
    teacherinfo: { type: Types.ObjectId, ref: "user", required: [true, "teacher is required"] },
    name: { type: String, required: [true, "subject name is required"], trim: true },
    code: { type: String, required: [true, "subject code is required"], trim: true, uppercase: true, unique: true },
    descp: { type: String, required: [true, "description is required"], trim: true },
    credits: { type: Number, required: [true, "credits are required"], min: 0 },
  },
  { versionKey: false, timestamps: true }
);

subjectSchema.index({ courseinfo: 1, deptinfo: 1 });

export const subjectmodel = model("subject", subjectSchema);
