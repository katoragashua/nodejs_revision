const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! Token not found" });
  }
  // console.log(token);
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

const authorizationMiddleware = (...roles) => {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized! No user found" });
    }
    const { role } = req.user;
    console.log(`User role: ${role}`);
    if (!roles.includes(role)) {
      return res
        .status(403)
        .json({
          message:
            "Forbidden! You don't have permission to access this resource",
        });
    }
    console.log(`User role: ${role}`);
    console.log(`Allowed roles: ${roles}`);

    next();
  };
};

module.exports = { authenticationMiddleware, authorizationMiddleware };
