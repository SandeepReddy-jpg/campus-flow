import { drivemodel } from "../modules/drive.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

// Frontend DriveManagement sends: collegeinfo, courseinfo, deptinfo,
// companyinfo, name, role, descp, salary, status(+optional jobType/location).
// applicationStart/End default server-side so minimal payloads succeed.
export const driveapp = crudRouter({
  model: drivemodel,
  resource: "drive",
  populates: [
    { path: "collegeinfo" },
    { path: "courseinfo" },
    { path: "deptinfo" },
    { path: "companyinfo" },
  ],
  searchFields: ["name", "role", "descp", "status"],
  allowedFilters: ["collegeinfo", "courseinfo", "deptinfo", "companyinfo", "status", "jobType"],
  validate: async (body) => {
    // normalise legacy location spellings before Mongoose validation
    const loc = body.location ?? body.loctaion;
    if (typeof loc === "string") {
      const v = loc.trim();
      if (v === "virtula" || v === "virtual") {
        body.location = "virtual";
        body.loctaion = "virtula"; // stored legacy value, read back as virtual
      } else if (v) {
        body.location = v;
        body.loctaion = v;
      }
    }
    if (body.stages && !Array.isArray(body.stages)) return "stages must be an array";
    return null;
  },
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
