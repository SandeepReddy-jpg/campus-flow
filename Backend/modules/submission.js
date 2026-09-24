import { Schema, Types, model } from "mongoose";

const submissionSchema = new Schema(
  {
    courseinfo: { type: Types.ObjectId, ref: "courses", required: [true, "course is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    studentinfo: { type: Types.ObjectId, ref: "user", required: [true, "student is required"] },
    assignmentinfo: { type: Types.ObjectId, ref: "assignment", required: [true, "assignment is required"] },
    marksobtained: { type: Number, required: [true, "marks are required"], min: 0 },
    grade: { type: String, required: [true, "grade is required"], trim: true },
  },
  { versionKey: false, timestamps: true }
);

submissionSchema.index({ assignmentinfo: 1, studentinfo: 1 }, { unique: true });

export const submissionmodel = model("submission", submissionSchema);
