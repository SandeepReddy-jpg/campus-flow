import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "campusflow-dev-secret";

/** Verify Bearer token. Attaches { userId, role } to req.user. */
export function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

/** Like verifyToken, but lets public routes through when no token is present. */
export function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();
  try {
    req.user = jwt.verify(token, JWT_SECRET);
  } catch {
    // ignore bad token on optional routes — downstream can decide
  }
  return next();
}

/** Role guard: requireAuth already ran. roles e.g. ["hod","admin"] */
export function requireRoles(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Authentication required" });
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    return next();
  };
}

export { JWT_SECRET };
