import { studentmodel } from "../modules/studentmodule.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

// Frontend: POST /student-api/basic-info, GET /list, GET /info/:id,
// PATCH+PUT /update/:id, DELETE /remove/:id
export const studentapp = crudRouter({
  model: studentmodel,
  resource: "student",
  createPath: "/basic-info",
  populates: [{ path: "user", select: "-password" }],
  searchFields: ["program"],
  allowedFilters: ["user", "program", "isActive"],
  booleanFields: ["isActive"],
  arrayFields: ["skills"],
  uniqueCheck: async (body, selfId) => {
    if (!body.user) return null;
    const q = { user: body.user };
    if (selfId) q._id = { $ne: selfId };
    const dup = await studentmodel.findOne(q).select("_id");
    return dup ? { field: "user" } : null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
