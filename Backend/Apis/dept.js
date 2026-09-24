import { deptmodel } from "../modules/department.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

// Frontend: POST /dept-api/create, GET /list, GET /info/:id,
// PATCH+PUT (and legacy POST) /update/:id, DELETE /remove/:id
export const deptapp = crudRouter({
  model: deptmodel,
  resource: "department",
  populates: [
    { path: "collegeinfo" },
    { path: "hodid", select: "-password" },
  ],
  searchFields: ["name", "code", "descp"],
  allowedFilters: ["collegeinfo", "code", "name"],
  allowPostUpdate: true,
  uniqueCheck: async (body, selfId) => {
    if (!body.code || !body.collegeinfo) return null;
    const q = { code: String(body.code).toUpperCase().trim(), collegeinfo: body.collegeinfo };
    if (selfId) q._id = { $ne: selfId };
    const dup = await deptmodel.findOne(q).select("_id");
    return dup ? { field: "code" } : null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
