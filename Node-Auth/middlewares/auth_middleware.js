const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  if(!token) {
    return res.status(401).json({ message: "Unauthorized! Token not found" });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized! Invalid token" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
};

module.exports = { authMiddleware };