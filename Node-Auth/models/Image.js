const { Schema, default: mongoose } = require("mongoose");

const ImageSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, "Image is required."],
    },
    public_id: {
      type: String,
      required: [true, "Public ID is required."],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
// This schema defines the structure of the Image document in the MongoDB database.
