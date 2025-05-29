const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizationMiddleware,
} = require("../middlewares/auth_middleware");
const uploadMiddleware = require("../middlewares/upload_middleware");

const {
  uploadImage,
  deleteImage,
    getAllImages,
} = require("../controllers/image_controllers");

// Route to upload an image
router.post(
  "/upload",
  authenticationMiddleware,
  uploadMiddleware.single("image"),
  uploadImage
);

// Route to get all images
router.get("/all",  getAllImages);

// Route to delete an image
router.delete("/delete/:id", authenticationMiddleware, deleteImage);

module.exports = router;
