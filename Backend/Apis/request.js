import { requestmodel } from "../modules/request.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const requestapp = crudRouter({
  model: requestmodel,
  resource: "request",
  populates: [{ path: "userinfo", select: "-password" }],
  searchFields: ["title", "subject", "catogery"],
  allowedFilters: ["userinfo", "catogery", "action", "priority"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
