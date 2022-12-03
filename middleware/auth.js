import jwt from "jsonwebtoken";
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Действие запрещено" });
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: "Нет доступа" });
  }
};
