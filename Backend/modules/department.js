import { Schema, Types, model } from "mongoose";

// hodid is optional so a department can be created before the HOD account
// exists; Frontend DepartmentManagement still sends it (required in UI).
const deptSchema = new Schema(
  {
    collegeinfo: { type: Types.ObjectId, ref: "college", required: [true, "college is required"] },
    name: { type: String, required: [true, "department name is required"], trim: true },
    code: { type: String, required: [true, "department code is required"], trim: true, uppercase: true },
    hodid: { type: Types.ObjectId, ref: "user", required: false, default: undefined },
    descp: { type: String, required: [true, "description is required"], trim: true },
  },
  { versionKey: false, timestamps: true }
);

deptSchema.index({ collegeinfo: 1, code: 1 }, { unique: true });
deptSchema.index({ name: "text", code: "text" });

export const deptmodel = model("dept", deptSchema);
