import mongoose, { Schema, Types, model } from "mongoose";

// Redesigned: frontend DriveManagement only sends collegeinfo/courseinfo/
// deptinfo/companyinfo/name/role/descp/salary/status — so applicationStart/End
// are optional (default to now / +30d). Legacy typo `loctaion` (+`virtula`)
// is kept working while canonical `location` (+`virtual`) is supported.
const driveSchema = new Schema(
  {
    collegeinfo: { type: Types.ObjectId, ref: "college", required: [true, "college is required"] },
    courseinfo: { type: Types.ObjectId, ref: "courses", required: [true, "course is required"] },
    deptinfo: { type: Types.ObjectId, ref: "dept", required: [true, "department is required"] },
    companyinfo: { type: Types.ObjectId, ref: "company", required: [true, "company is required"] },
    name: { type: String, required: [true, "drive name is required"], trim: true },
    jobType: { type: String, enum: ["full_time", "internship", "contract", "part_time"], default: undefined },
    descp: { type: String, required: [true, "description is required"], trim: true },
    role: { type: String, required: [true, "role is required"], trim: true },
    // canonical fixed field
    location: { type: String, enum: ["virtual", "in-office", "hybrid", "onsite"], default: undefined },
    // legacy misspelled field — still accepted/synced for old documents
    loctaion: { type: String, enum: ["virtula", "virtual", "in-office", "hybrid", "onsite"], default: undefined },
    salary: { type: Number, required: [true, "salary is required"], min: 0 },
    eligibility: {
      minCgpa: { type: Number, default: 0, min: 0, max: 10 },
      maxBacklogs: { type: Number, default: 0, min: 0 },
      allowedDepartments: [{ type: Schema.Types.ObjectId, ref: "dept" }],
    },
    stages: [
      {
        name: {
          type: String,
          enum: ["Application", "Aptitude Test", "Technical Interview", "HR Interview", " Application", " HR Interview"],
          trim: true,
        },
        scheduledDate: Date,
        mode: { type: String, enum: ["online", "offline", "hybrid"] },
        venue: String,
        status: { type: String, enum: ["pending", "ongoing", "completed", "cancelled"], default: "pending" },
      },
    ],
    applicationStart: { type: Date, default: () => new Date() },
    applicationEnd: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    status: {
      type: String,
      enum: ["open", "closed", "in_progress", "completed", "cancelled"],
      default: "open",
    },
  },
  { versionKey: false, timestamps: true }
);

// keep the two location spellings in sync; normalise legacy `virtula`
driveSchema.pre("save", function () {
  if (this.location && !this.loctaion) this.loctaion = this.location === "virtual" ? "virtula" : this.location;
  if (this.loctaion && !this.location) {
    this.location = this.loctaion === "virtula" ? "virtual" : this.loctaion;
  }
});

driveSchema.virtual("canonicalLocation").get(function () {
  if (this.location) return this.location;
  if (this.loctaion === "virtula") return "virtual";
  return this.loctaion;
});
driveSchema.set("toJSON", { virtuals: true });
driveSchema.set("toObject", { virtuals: true });

driveSchema.index({ companyinfo: 1, status: 1 });
driveSchema.index({ collegeinfo: 1, deptinfo: 1 });

export const drivemodel = model("drive", driveSchema);
