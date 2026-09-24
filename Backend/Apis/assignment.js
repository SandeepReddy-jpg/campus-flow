import { assignmentmodel } from "../modules/assignment.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const assignmentapp = crudRouter({
  model: assignmentmodel,
  resource: "assignment",
  populates: [{ path: "subjectinfo" }, { path: "teacherinfo", select: "-password" }],
  searchFields: ["name", "descp", "instructions"],
  allowedFilters: ["subjectinfo", "teacherinfo"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
