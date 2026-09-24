import { Schema, Types, model } from "mongoose";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timetableSchema = new Schema(
  {
    collegeinfo: { type: Types.ObjectId, ref: "college", required: [true, "college is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    courseinfo: { type: Types.ObjectId, ref: "courses", required: [true, "course is required"] },
    subjectinfo: { type: Types.ObjectId, ref: "subject", required: [true, "subject is required"] },
    teacherinfo: { type: Types.ObjectId, ref: "user", required: [true, "teacher is required"] },
    day: { type: String, enum: DAYS, required: [true, "day is required"], trim: true },
    startTime: { type: String, required: [true, "start time is required"], trim: true },
    endTime: { type: String, required: [true, "end time is required"], trim: true },
    room: { type: String, trim: true, default: "" },
    section: { type: String, trim: true, default: "A" },
  },
  { versionKey: false, timestamps: true }
);

timetableSchema.index({ day: 1, section: 1, startTime: 1 });

export const timetablemodel = model("timetable", timetableSchema);
export const TIMETABLE_DAYS = DAYS;
