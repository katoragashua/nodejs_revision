const User = require("../models/User");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");

const signJWT = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 15 * 60000, // 15 minutes
  });
};

// This function is used to register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Check if the username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const user = await User.create({ username, email, password });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({success: false, message: error.message });
  }
};

// This function is used to login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    // Check if the user exists
    // Check if the user exists with the email or username
    const user =
      (await User.findOne({ email })) ||
      (await User.findOne({ username: email }));
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate an  access token using JWT
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = await signJWT(payload);
    // Send the token in the response

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  const userId = req.user.id;
  if (!userId)
    return res
      .status(400)
      .json({
        success: false,
        message: "User not authenticated. You need to login",
      });
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return res
      .status(400)
      .json({
        success: false,
        message: "Please enter your old and new password.",
      });
  try {
    const user = await User.findOne({ _id: userId });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    const isMatch = await user.comparePassword(oldPassword, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect." });
    user.password = newPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error});
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
