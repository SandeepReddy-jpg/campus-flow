import { resourcemodel } from "../modules/resource.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const resourceapp = crudRouter({
  model: resourcemodel,
  resource: "resource",
  populates: [{ path: "subjectinfo" }, { path: "uploadedBy", select: "-password" }],
  searchFields: ["title", "description"],
  allowedFilters: ["subjectinfo", "type"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
