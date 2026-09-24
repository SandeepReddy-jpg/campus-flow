import { collegemodel } from "../modules/college.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

// Frontend: POST /college-api/info, GET /list, GET /info/:id,
// PATCH+PUT /update/:id, DELETE /remove/:id
export const collegeapp = crudRouter({
  model: collegemodel,
  resource: "college",
  createPath: "/info",
  searchFields: ["name", "code", "address", "desp"],
  allowedFilters: ["code", "name"],
  uniqueCheck: async (body, selfId) => {
    if (!body.code) return null;
    const q = { code: String(body.code).toUpperCase().trim() };
    if (selfId) q._id = { $ne: selfId };
    const dup = await collegemodel.findOne(q).select("_id");
    return dup ? { field: "code" } : null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
