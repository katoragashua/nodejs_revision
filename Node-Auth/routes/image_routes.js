const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizationMiddleware,
} = require("../middlewares/auth_middleware");
const uploadMiddleware = require("../middlewares/upload_middleware");

const { uploadImage } = require("../controllers/image_controllers");

// Route to upload an image
router.post(
  "/upload",
 authenticationMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);

module.exports = router;
