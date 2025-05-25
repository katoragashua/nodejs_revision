const { Schema, default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const Isemail = require("isemail");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      maxLength: [30, "Username must not exceed 30 characters."],
      minLength: [2, "Username must be more than one character."],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v.split(" ").length === 1;
        },
        message: "Username must not contain spaces.",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      validate: [
        (val) => Isemail.validate(val),
        "Enter a valid email address.",
      ],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      trim: true,
      minlength: [6, "Password must not be less than 6 characters."],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

// This pre-save hook is used to hash the password before saving it to the database
// It uses bcrypt to hash the password with a salt
// The salt is generated using bcrypt.genSalt(10), which generates a salt with 10 rounds
// The hash is generated using bcrypt.hash(this.password, salt), which hashes the password with the salt
// The hashed password is then saved to the database

UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths());
  // The if block is used to make sure the password in only hashed if it has changed
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
});

// This method is used to compare the password entered by the user with the hashed password in the database
// It is used in the login route to check if the user has entered the correct password
// It uses bcrypt.compare(password, this.password) to compare the password
// The password entered by the user is passed as an argument to the method
// If the password matches, it returns true, otherwise it returns false
// This method is used in the login route to check if the user has entered the correct password
UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
