import { Types } from "mongoose";

export const isObjectId = (v) => Types.ObjectId.isValid(v);

/** Frontend sends "" for untouched optional inputs and "true"/"false" from
 *  text fields. Normalise so Mongoose validation/casting behaves sanely:
 *  "" / null -> undefined (field omitted), "true"/"false" -> boolean,
 *  numeric strings stay strings (Mongoose casts Numbers itself) except for
 *  known boolean fields which are coerced strictly. */
export function sanitizeBody(input = {}, booleanFields = []) {
  const out = {};
  for (const [key, raw] of Object.entries(input ?? {})) {
    let value = raw;
    if (value === "" || value === null) value = undefined;
    if (booleanFields.includes(key) && typeof value === "string") {
      const v = value.trim().toLowerCase();
      if (["true", "1", "yes"].includes(v)) value = true;
      else if (["false", "0", "no"].includes(v)) value = false;
      else if (v === "") value = undefined;
    }
    // Drive backwards-compat: accept `location` for legacy `loctaion`
    if (value !== undefined) out[key] = value;
  }
  // alias: location -> loctaion handled at schema level too, mirror here
  if (out.location !== undefined && out.loctaion === undefined) {
    out.loctaion = out.location;
  }
  // comma-string -> array for convenience (faculty/student arrays, stages excluded)
  return out;
}

/** Split comma string into trimmed array (used for skills/qualifications). */
export function toStringArray(v) {
  if (Array.isArray(v)) return v.map(String).map((s) => s.trim()).filter(Boolean);
  if (typeof v === "string") return v.split(",").map((s) => s.trim()).filter(Boolean);
  return v;
}

export function pick(obj = {}, keys = []) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}
