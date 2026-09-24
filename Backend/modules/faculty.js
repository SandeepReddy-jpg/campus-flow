import { Schema, model } from "mongoose";

const facultySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: [true, "user is required"], unique: true },
    collegeinfo: { type: Schema.Types.ObjectId, ref: "college", required: [true, "college is required"] },
    deptinfo: { type: Schema.Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    designation: { type: String, required: [true, "designation is required"], trim: true },
    qualifications: { type: [String], default: [] },
    specialization: { type: [String], default: [] },
    experienceYears: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

facultySchema.index({ collegeinfo: 1, deptinfo: 1 });

export const facultymodel = model("faculty", facultySchema);
