const Image = require("../models/Image");
const {
  upload,
  deleteImage: deleteImageFromCloudinary,
} = require("../utils/cloudinary");
const fs = require("fs");
const checkPermissions = require("../utils/checkPermissions");

// This function is used to upload an image to Cloudinary
const uploadImage = async (req, res) => {
  const photo = req.file;

  if (!photo || !photo.mimetype.startsWith("image")) {
    return res.status(400).json({ message: "No file provided." });
  }

  //   console.log(photo);
  //   console.log(req.user);

  try {
    const result = await upload(photo.path);

    // console.log(result);
    // const newImage = await Image.create({
    //   url: result.secure_url,
    //   public_id: result.public_id,
    //   user: req.user._id,
    // });
    const image = new Image({
      url: result.secure_url,
      public_id: result.public_id,
      user: req.user.id,
    });
    await image.save();
    fs.unlinkSync(photo.path); // Delete the file from the server after uploading to Cloudinary

    res.status(200).json({ message: "Image uploaded successfully", image });
  } catch (error) {
    console.error(error);
    fs.unlinkSync(photo.path); // Delete the file from the server in case of error
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get images
const getAllImages = async (req, res) => {
  const per_page = parseInt(req.query.per_page) || 10; // Default to 10 images per page
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const skip = (page - 1) * per_page;
  const sort = req.query.sort || "createdAt"; // Default sort by createdAt
  const order = req.query.order === "asc" ? 1 : -1; // Default order is descending
  const sortObj = {};
  sortObj[sort] = order;

  // const validSortFields = ["createdAt", "updatedAt", "url"]; // Add other fields if needed
  // // Validate sort field
  // if (!validSortFields.includes(sort)) {
  //   return res.status(400).json({
  //     success: false,
  //     message: `Invalid sort field. Valid fields are: ${validSortFields.join(", ")}`,
  //   });
  // }

  // Validate pagination parameters
  if (isNaN(per_page) || isNaN(page) || per_page <= 0 || page <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid pagination parameters",
    });
  }

  // // Check if the user is authenticated
  // const user = req.user;
  // if (!user) {
  //   return res.status(401).json({ success: false, message: "Unauthorized" });
  // }

  try {
    const totalImages = await Image.countDocuments({});
    const totalPages = Math.ceil(totalImages / per_page);
    if (page > totalPages) {
      return res.status(400).json({
        success: false,
        message: `Page number exceeds total pages. Total pages: ${totalPages}`,
      });
    }

    const images = await Image.find({})
      .populate("user", "username email -_id") // Populate user field with username and email
      // .select("-__v") // Exclude __v field from the response
      .skip(skip)
      .limit(per_page)
      .sort(sortObj);
    if (!images || images.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No images found" });
    }
    res
      .status(200)
      .json({ success: true, page, totalImages, totalPages, images });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error });
  }
};

const deleteImage = async (req, res) => {
  const { id: imageId } = req.params;
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized! No user found" });
  }

  try {
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    console.log(user.id, image.user);

    // Check if the user has permission to delete the image
    if (!checkPermissions(user, image.user))
      return res.status(403).json({
        message: "Forbidden! You don't have permission to access this resource",
      });

    // Delete the image from Cloudinary
    await deleteImageFromCloudinary(image.public_id);
    // Delete the image from the database
    await Image.findByIdAndDelete(imageId);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
  getAllImages,
};

/**
 * file: {
    fieldname: 'image',
    originalname: 'bike-adventure.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    buffer: <Buffer ff d8 ff e0 00 10 4a 46 49 46 00 01 02 01 00 48 00 48 00 00 ff e2 0c 58 49 43 43 5f 50 52 4f 46 49 4c 45 00 01 01 00 00 0c 48 4c 69 6e 
6f 02 10 00 00 ... 353076 more bytes>,
    size: 353126
  },
 */
