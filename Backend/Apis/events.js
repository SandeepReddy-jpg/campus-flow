import { eventmodel } from "../modules/events.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const eventapp = crudRouter({
  model: eventmodel,
  resource: "event",
  populates: [{ path: "coursesinfo" }, { path: "deptinfo" }],
  searchFields: ["name", "decp", "catogery"],
  allowedFilters: ["coursesinfo", "deptinfo", "catogery"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
