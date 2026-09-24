import { timetablemodel } from "../modules/timetable.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const timetableapp = crudRouter({
  model: timetablemodel,
  resource: "timetable slot",
  populates: [
    { path: "collegeinfo" },
    { path: "deptinfo" },
    { path: "courseinfo" },
    { path: "subjectinfo" },
    { path: "teacherinfo", select: "-password" },
  ],
  searchFields: ["day", "room", "section"],
  allowedFilters: ["collegeinfo", "deptinfo", "courseinfo", "subjectinfo", "teacherinfo", "day", "section"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
