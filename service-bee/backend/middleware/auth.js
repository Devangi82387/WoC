import jwt from "jsonwebtoken";

// Protect routes
export const protect = (roles = []) => {
  return (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
          id: decoded.id,
          role: decoded.role
        };

        // If roles are specified, check
        if (roles.length && !roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access forbidden: role mismatch" });
        }

        next();
      } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
      }
    } else {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  };
};
