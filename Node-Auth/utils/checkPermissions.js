const checkPermissions = (currentUser, resourceUserId) => {
  if (currentUser.role === "admin") {
    // Admins have access to all resources
    return true;
  }

  if (currentUser.role === "user" && currentUser.id === resourceUserId) {
    // Regular users can access their own resources
    return true;
  }

  // If no conditions are met, deny access
  return res.status(403).json({
    message: "Forbidden! You don't have permission to access this resource",
  });
};

// const checkPermissions = (req, res, next) => {
//   const { user } = req;
//   const { role } = user;

//   // Check if the user has the required role
//   if (!role || !["admin", "user"].includes(role)) {
//     return res.status(403).json({
//       message: "Forbidden! You don't have permission to access this resource",
//     });
//   }

//   // If the user is an admin, allow access
//   if (role === "admin") {
//     return next();
//   }

//   // If the user is a regular user, check for specific permissions
//   if (role === "user") {
//     // Add any specific checks for user permissions here
//     return next();
//   }

//   // If no conditions are met, deny access
//   return res.status(403).json({
//     message: "Forbidden! You don't have permission to access this resource",
//   });
// }

module.exports = checkPermissions;