const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, "mysecretekey", (err, decoded) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = decoded;
    next();
  });
};

exports.admin = (req, res, next) => {
   try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, "mysecretekey");

    if (decoded.role !== "admin")
      return res.status(403).json({ error: "Access denied" });

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
