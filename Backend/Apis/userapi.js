import exp from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { usermodel } from "../modules/User.js";
import { verifyToken, JWT_SECRET } from "../middleware/auth.js";
import { sanitizeBody } from "../utils/sanitize.js";

export const userapp = exp.Router();

const REQUIRE_AUTH = process.env.REQUIRE_AUTH !== "false";
const guard = REQUIRE_AUTH ? verifyToken : (_req, _res, next) => next();
const isId = (v) => Types.ObjectId.isValid(v);
const stripPassword = (doc) => {
  const o = typeof doc.toObject === "function" ? doc.toObject() : { ...doc };
  delete o.password;
  return o;
};

// ---------- REGISTER (public) ----------
userapp.post("/register", async (req, res, next) => {
  try {
    const data = sanitizeBody(req.body);
    if (!data.password) return res.status(400).json({ message: "Password is required" });
    if (String(data.password).length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
    if (!data.email || !data.username || !data.id || !data.role) {
      return res.status(400).json({ message: "role, username, email, id and password are required" });
    }
    data.email = String(data.email).toLowerCase().trim();
    const exists = await usermodel.findOne({ $or: [{ email: data.email }, { id: data.id }] }).select("_id");
    if (exists) return res.status(409).json({ message: "User with this email or campus id already exists" });
    data.password = await bcryptjs.hash(String(data.password), 12);
    const doc = new usermodel(data);
    const saved = await doc.save();
    res.status(201).json({ message: "user is created", payload: stripPassword(saved) });
  } catch (err) {
    next(err);
  }
});

// ---------- LOGIN (public) ----------
userapp.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ message: "email and password are required" });
    const user = await usermodel.findOne({ email: String(email).toLowerCase().trim() }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isActive === false) return res.status(403).json({ message: "Account is deactivated" });
    const ok = await bcryptjs.compare(String(password), user.password);
    if (!ok) return res.status(400).json({ message: "Incorrect password" });
    const token = jwt.sign({ userId: user._id.toString(), role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ message: "Login successful", token, payload: stripPassword(user) });
  } catch (err) {
    next(err);
  }
});

// ---------- FORGOT PASSWORD (public) ----------
userapp.post("/forgot", async (req, res, next) => {
  try {
    const { email, newpassword } = req.body ?? {};
    if (!email || !newpassword) return res.status(400).json({ message: "email and newpassword are required" });
    if (String(newpassword).length < 6) return res.status(400).json({ message: "New password must be at least 6 characters" });
    const hashed = await bcryptjs.hash(String(newpassword), 12);
    const user = await usermodel.findOneAndUpdate(
      { email: String(email).toLowerCase().trim() },
      { $set: { password: hashed } },
      { returnDocument: "after" }
    );
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "password reset successful" });
  } catch (err) {
    next(err);
  }
});

// ---------- ME (auth) ----------
userapp.get("/me", guard, async (req, res, next) => {
  try {
    const me = await usermodel.findById(req.user.userId).select("-password");
    if (!me) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "current user", payload: me });
  } catch (err) {
    next(err);
  }
});

// ---------- LIST (search + filter + paginate) ----------
userapp.get("/list", guard, async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 200);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const filter = {};
    if (req.query.includeInactive !== "true") filter.isActive = { $ne: false };
    for (const k of ["role", "department", "branch"]) {
      if (req.query[k]) filter[k] = req.query[k];
    }
    if (req.query.search) {
      const rx = new RegExp(String(req.query.search).trim().slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      filter.$or = [{ username: rx }, { email: rx }, { id: rx }, { department: rx }];
    }
    const [total, docs] = await Promise.all([
      usermodel.countDocuments(filter),
      usermodel.find(filter).select("-password").skip((page - 1) * limit).limit(limit).sort({ _id: -1 }).lean(),
    ]);
    res.status(200).json({ message: "users list", payload: docs, meta: { total, page, limit, pages: Math.max(Math.ceil(total / limit), 1) } });
  } catch (err) {
    next(err);
  }
});

// ---------- INFO ----------
userapp.get("/info/:id", guard, async (req, res, next) => {
  try {
    if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
    const user = await usermodel.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "user info", payload: user });
  } catch (err) {
    next(err);
  }
});

// ---------- UPDATE ----------
async function updateHandler(req, res, next) {
  try {
    if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
    const data = sanitizeBody(req.body);
    delete data._id;
    if (data.password) {
      if (String(data.password).length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });
      data.password = await bcryptjs.hash(String(data.password), 12);
    } else {
      delete data.password;
    }
    if (data.email) data.email = String(data.email).toLowerCase().trim();
    if ((data.email || data.id) && Object.keys(data).length) {
      const or = [];
      if (data.email) or.push({ email: data.email });
      if (data.id) or.push({ id: data.id });
      const clash = await usermodel.findOne({ $or: or, _id: { $ne: req.params.id } }).select("_id");
      if (clash) return res.status(409).json({ message: "Another user with this email or campus id already exists" });
    }
    const user = await usermodel
      .findByIdAndUpdate(req.params.id, { $set: data }, { returnDocument: "after", runValidators: true })
      .select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", payload: user });
  } catch (err) {
    next(err);
  }
}
userapp.patch("/update/:id", guard, updateHandler);
userapp.put("/update/:id", guard, updateHandler);

// ---------- SOFT DELETE (deactivate) ----------
userapp.patch("/delete/:id", guard, async (req, res, next) => {
  try {
    if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
    const result = await usermodel
      .findByIdAndUpdate(req.params.id, { $set: { isActive: false } }, { returnDocument: "after" })
      .select("-password");
    if (!result) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user deleted successfully", payload: result });
  } catch (err) {
    next(err);
  }
});

// ---------- RESTORE ----------
userapp.patch("/restore/:id", guard, async (req, res, next) => {
  try {
    if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
    const result = await usermodel
      .findByIdAndUpdate(req.params.id, { $set: { isActive: true } }, { returnDocument: "after" })
      .select("-password");
    if (!result) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user restored successfully", payload: result });
  } catch (err) {
    next(err);
  }
});

// ---------- HARD DELETE ----------
userapp.delete("/remove/:id", guard, async (req, res, next) => {
  try {
    if (!isId(req.params.id)) return res.status(400).json({ message: "Invalid id format" });
    const result = await usermodel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ message: "user removed permanently" });
  } catch (err) {
    next(err);
  }
});
