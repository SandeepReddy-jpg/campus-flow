import { submissionmodel } from "../modules/submission.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const submissionapp = crudRouter({
  model: submissionmodel,
  resource: "submission",
  populates: [
    { path: "courseinfo" },
    { path: "deptinfo" },
    { path: "studentinfo", select: "-password" },
    { path: "assignmentinfo" },
  ],
  searchFields: ["grade"],
  allowedFilters: ["courseinfo", "deptinfo", "studentinfo", "assignmentinfo", "grade"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
