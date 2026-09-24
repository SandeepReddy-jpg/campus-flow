import { Schema, Types, model } from "mongoose";

const attendanceSchema = new Schema(
  {
    subjectinfo: { type: Types.ObjectId, ref: "subject", required: [true, "subject is required"] },
    studentinfo: { type: Types.ObjectId, ref: "user", required: [true, "student is required"] },
    date: { type: String, required: [true, "date is required"], trim: true },
    status: { type: String, enum: ["present", "absent", "late"], required: [true, "status is required"] },
  },
  { versionKey: false, timestamps: true }
);

attendanceSchema.index({ subjectinfo: 1, studentinfo: 1, date: 1 }, { unique: true });

export const attendancemodel = model("attendance", attendanceSchema);
