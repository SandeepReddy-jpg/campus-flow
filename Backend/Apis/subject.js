import { subjectmodel } from "../modules/subject.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const subjectapp = crudRouter({
  model: subjectmodel,
  resource: "subject",
  populates: [
    { path: "collegeinfo" },
    { path: "deptinfo" },
    { path: "courseinfo" },
    { path: "teacherinfo", select: "-password" },
  ],
  searchFields: ["name", "code", "descp"],
  allowedFilters: ["collegeinfo", "deptinfo", "courseinfo", "teacherinfo", "code"],
  uniqueCheck: async (body, selfId) => {
    if (!body.code) return null;
    const q = { code: String(body.code).toUpperCase().trim() };
    if (selfId) q._id = { $ne: selfId };
    const dup = await subjectmodel.findOne(q).select("_id");
    return dup ? { field: "code" } : null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
