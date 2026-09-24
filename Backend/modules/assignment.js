import { Schema, Types, model } from "mongoose";

const assignmentSchema = new Schema(
  {
    subjectinfo: { type: Types.ObjectId, ref: "subject", required: [true, "subject is required"] },
    teacherinfo: { type: Types.ObjectId, ref: "user", required: [true, "teacher is required"] },
    name: { type: String, required: [true, "assignment name is required"], trim: true },
    descp: { type: String, required: [true, "description is required"], trim: true },
    instructions: { type: String, required: [true, "instructions are required"], trim: true },
    maxmarks: { type: Number, required: true, default: 100, min: 0 },
    duedate: { type: String, required: [true, "due date is required"], trim: true },
  },
  { versionKey: false, timestamps: true }
);

assignmentSchema.index({ subjectinfo: 1, name: 1 });

export const assignmentmodel = model("assignment", assignmentSchema);
