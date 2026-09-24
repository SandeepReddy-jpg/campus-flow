import { attendancemodel } from "../modules/attendance.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const attendanceapp = crudRouter({
  model: attendancemodel,
  resource: "attendance record",
  populates: [{ path: "subjectinfo" }, { path: "studentinfo", select: "-password" }],
  searchFields: ["date", "status"],
  allowedFilters: ["subjectinfo", "studentinfo", "date", "status"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
