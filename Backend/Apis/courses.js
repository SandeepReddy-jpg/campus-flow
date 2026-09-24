import { coursesmodel } from "../modules/courses.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const courseapp = crudRouter({
  model: coursesmodel,
  resource: "course",
  populates: [{ path: "collegeinfo" }, { path: "deptinfo" }],
  searchFields: ["name", "code", "descp"],
  allowedFilters: ["collegeinfo", "deptinfo", "code"],
  uniqueCheck: async (body, selfId) => {
    if (!body.code) return null;
    const q = { code: String(body.code).toUpperCase().trim() };
    if (selfId) q._id = { $ne: selfId };
    const dup = await coursesmodel.findOne(q).select("_id");
    return dup ? { field: "code" } : null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
