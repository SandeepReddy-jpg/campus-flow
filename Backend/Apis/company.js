import { companymodel } from "../modules/company.js";
import { crudRouter } from "../utils/crudFactory.js";
import { verifyToken } from "../middleware/auth.js";

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();

export const companyapp = crudRouter({
  model: companymodel,
  resource: "company",
  populates: [{ path: "collegeinfo" }],
  searchFields: ["name", "sector", "industry", "hrname"],
  allowedFilters: ["collegeinfo", "sector", "industry", "isRecruiting"],
  booleanFields: ["isRecruiting"],
  middlewares: { create: guard, list: guard, info: guard, update: guard, remove: guard },
});
