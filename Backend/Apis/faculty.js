import { facultymodel } from "../modules/faculty.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

// Frontend: POST /faculty-api/basic-info, GET /list, GET /info/:id,
// PATCH+PUT /update/:id, DELETE /remove/:id
export const facultyapp = crudRouter({
  model: facultymodel,
  resource: "faculty",
  createPath: "/basic-info",
  populates: [
    { path: "user", select: "-password" },
    { path: "collegeinfo" },
    { path: "deptinfo" },
  ],
  searchFields: ["designation"],
  allowedFilters: ["user", "collegeinfo", "deptinfo", "isActive"],
  booleanFields: ["isActive"],
  arrayFields: ["qualifications", "specialization"],
  uniqueCheck: async (body, selfId) => {
    if (!body.user) return null;
    const q = { user: body.user };
    if (selfId) q._id = { $ne: selfId };
    const dup = await facultymodel.findOne(q).select("_id");
    return dup ? { field: "user" } : null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
