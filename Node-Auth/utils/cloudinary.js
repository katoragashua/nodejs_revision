const cloudinary = require("cloudinary").v2;

// // Import the Cloudinary library
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (image) => {
  // Upload an image
  const result = await cloudinary.uploader.upload(image, {
    folder: "node-auth",
  });
  return result;
};

module.exports = {
  upload,
};
