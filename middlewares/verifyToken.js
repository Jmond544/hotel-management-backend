import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config.js";

export function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return "Expired";
      } else {
        console.error("Error al verificar el token:", err);
      }
    } else {
      return decoded;
    }
  });
  if (decoded === "Expired") {
    return res.status(401).json({ message: "Expired" });
  }
  req.userId = decoded.id;
  next();
}
