import { announcementmodel } from "../modules/announcement.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const announcementapp = crudRouter({
  model: announcementmodel,
  resource: "announcement",
  populates: [
    { path: "coursesinfo" },
    { path: "deptinfo" },
    { path: "postedby", select: "-password" },
  ],
  searchFields: ["name", "content"],
  allowedFilters: ["coursesinfo", "deptinfo", "postedby", "priority", "ispinned"],
  booleanFields: ["ispinned"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
