import exp from "express";
import { Types } from "mongoose";
import { sanitizeBody, toStringArray } from "./sanitize.js";

const isId = (v) => Types.ObjectId.isValid(v);

/**
 * Build a fully-aligned CRUD router for a resource.
 *
 * Frontend contract (must not break):
 *   POST   /create (or custom createPath)      -> { message, payload }
 *   GET    /list?limit=&page=&search=&sort=     -> { message, payload: [], meta }
 *   GET    /info/:id                            -> { message, payload }
 *   PATCH  /update/:id  (+ PUT alias)           -> { message, payload }
 *   DELETE /remove/:id                          -> { message }
 *
 * options:
 *  - model, resource ("college"), createPath (default "/create")
 *  - populates: [{ path, select }] applied to list + info
 *  - searchFields: [field] for ?search=
 *  - booleanFields: coerced from "true"/"false"
 *  - arrayFields: coerced from comma strings
 *  - allowedFilters: query keys that become exact-match filters
 *  - uniqueCheck: async (body) => { field, value } | null, to return 409 early
 *  - validate: async (body, isUpdate) => string|null (error message)
 *  - allowPut, allowPostUpdate (dept legacy POST /update/:id)
 *  - auth: { create, list, info, update, remove } middlewares or null
 */
export function crudRouter({
  model,
  resource = "record",
  createPath = "/create",
  populates = [],
  searchFields = ["name"],
  booleanFields = [],
  arrayFields = [],
  allowedFilters = [],
  validate = null,
  uniqueCheck = null,
  allowPostUpdate = false,
  middlewares = {},
}) {
  const router = exp.Router();
  const mw = (key) => middlewares[key] || ((_, __, next) => next());
  const applyPopulate = (q) => {
    for (const p of populates) q = q.populate(p.path, p.select);
    return q;
  };

  // ---- CREATE ----
  router.post(createPath, mw("create"), async (req, res, next) => {
    try {
      const body = sanitizeBody(req.body, booleanFields);
      for (const f of arrayFields) if (body[f] !== undefined) body[f] = toStringArray(body[f]);
      if (validate) {
        const err = await validate(body, false);
        if (err) return res.status(400).json({ message: err });
      }
      // fail fast on bad ObjectIds with a clear message
      for (const [k, v] of Object.entries(body)) {
        const path = model.schema.path(k);
        if (path?.instance === "ObjectID" && v !== undefined && v !== null && !isId(v)) {
          return res.status(400).json({ message: `Invalid id for field '${k}'` });
        }
      }
      if (uniqueCheck) {
        const dup = await uniqueCheck(body, null);
        if (dup) return res.status(409).json({ message: `${resource} with this ${dup.field} already exists` });
      }
      const doc = new model(body);
      await doc.save();
      let out = doc;
      // re-fetch with populates for a rich create response
      try {
        let q = model.findById(doc._id);
        q = applyPopulate(q);
        const populated = await q;
        if (populated) out = populated;
      } catch { /* fall back to raw doc */ }
      res.status(201).json({ message: `${resource} created`, payload: out });
    } catch (err) {
      next(err);
    }
  });

  // ---- LIST (search + filter + paginate + sort + populate) ----
  router.get("/list", mw("list"), async (req, res, next) => {
    try {
      const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
      const page = Math.max(Number(req.query.page) || 1, 1);
      const skip = (page - 1) * limit;
      const filter = {};
      for (const key of allowedFilters) {
        if (req.query[key] !== undefined && req.query[key] !== "") {
          const path = model.schema.path(key);
          filter[key] = path?.instance === "ObjectID" ? req.query[key] : req.query[key];
        }
      }
      if (req.query.search && searchFields.length) {
        const rx = new RegExp(String(req.query.search).trim().slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
        filter.$or = searchFields.map((f) => ({ [f]: rx }));
      }
      // boolean / status style query coercion
      for (const bf of booleanFields) {
        if (filter[bf] !== undefined && typeof filter[bf] === "string") {
          const v = filter[bf].toLowerCase();
          if (v === "true") filter[bf] = true;
          else if (v === "false") filter[bf] = false;
        }
      }
      const sortParam = String(req.query.sort || "-createdAt");
      const sort = {};
      for (const part of sortParam.split(",")) {
        const s = part.trim();
        if (!s) continue;
        if (s.startsWith("-")) sort[s.slice(1)] = -1;
        else sort[s] = 1;
      }
      const [total, docs] = await Promise.all([
        model.countDocuments(filter),
        (async () => {
          let q = model.find(filter).skip(skip).limit(limit).sort(Object.keys(sort).length ? sort : { _id: -1 });
          q = applyPopulate(q);
          return q.lean({ virtuals: true });
        })(),
      ]);
      res.status(200).json({
        message: `${resource} list`,
        payload: docs,
        meta: { total, page, limit, pages: Math.max(Math.ceil(total / limit), 1) },
      });
    } catch (err) {
      next(err);
    }
  });

  // ---- INFO ----
  router.get("/info/:id", mw("info"), async (req, res, next) => {
    try {
      if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
      let q = model.findById(req.params.id);
      q = applyPopulate(q);
      const doc = await q;
      if (!doc) return res.status(404).json({ message: `${resource} not found` });
      res.status(200).json({ message: `${resource} info`, payload: doc });
    } catch (err) {
      next(err);
    }
  });

  // ---- UPDATE ----
  async function updateHandler(req, res, next) {
    try {
      if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
      const body = sanitizeBody(req.body, booleanFields);
      delete body._id;
      for (const f of arrayFields) if (body[f] !== undefined) body[f] = toStringArray(body[f]);
      if (validate) {
        const err = await validate(body, true);
        if (err) return res.status(400).json({ message: err });
      }
      for (const [k, v] of Object.entries(body)) {
        const path = model.schema.path(k);
        if (path?.instance === "ObjectID" && v !== undefined && v !== null && !isId(v)) {
          return res.status(400).json({ message: `Invalid id for field '${k}'` });
        }
      }
      if (uniqueCheck && Object.keys(body).length) {
        const dup = await uniqueCheck(body, req.params.id);
        if (dup) return res.status(409).json({ message: `${resource} with this ${dup.field} already exists` });
      }
      const doc = await model
        .findByIdAndUpdate(req.params.id, { $set: body }, { returnDocument: "after", runValidators: true });
      if (!doc) return res.status(404).json({ message: `${resource} not found` });
      let out = doc;
      try {
        let q = model.findById(doc._id);
        q = applyPopulate(q);
        const populated = await q;
        if (populated) out = populated;
      } catch { /* ignore */ }
      res.status(200).json({ message: `${resource} updated`, payload: out });
    } catch (err) {
      next(err);
    }
  }
  router.patch("/update/:id", mw("update"), updateHandler);
  router.put("/update/:id", mw("update"), updateHandler);
  if (allowPostUpdate) router.post("/update/:id", mw("update"), updateHandler);

  // ---- REMOVE ----
  router.delete("/remove/:id", mw("remove"), async (req, res, next) => {
    try {
      if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
      const doc = await model.findByIdAndDelete(req.params.id);
      if (!doc) return res.status(404).json({ message: `${resource} not found` });
      res.status(200).json({ message: `${resource} deleted` });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
