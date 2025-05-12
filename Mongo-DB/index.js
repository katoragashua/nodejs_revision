const { Schema, default: mongoose } = require("mongoose");
const mongoURI =
  "mongodb+srv://katoragashua:zFFqF43JYSho00Wi@bananacluster.0fvnmw3.mongodb.net/bananacluster?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

const runQueryExample = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // // Create a new user
    // const user = await User.create({
    //   name: "John Doe",
    //   email: "johndoe@outlook.com",
    //   age: 30,
    // });
    // console.log("User created:", user);

    // Create a new user with the save method
    // const newUser = new User({
    //   name: "Kamala Doe",
    //   email: "kamaladoe@gmail.com",
    //   age: 40,
    // });
    // await newUser.save();
    // console.log("User created:", newUser);

    // // Find users
    // const users = await User.find({});
    // const users = await User.find({age: { $gt: 25 }});
    // // Find the first user
    // const firstUser = await User.findOne();
    // or
    // const users = await User.find({});
    // const firstuser = users[0];
    // console.log("First user found:", firstuser);
    // When sorting, -1 is descending and 1 is ascending
    const users = await User.find({})
      .select("age name")
      .sort({ createdAt: -1 })
      .limit(2)
      .skip(1);
    console.log("Users found:", users);
    // count the number of users whose age is greater than 25
    const count = await User.countDocuments({ age: { $gt: 25 } });
    console.log("Number of users with age greater than 25:", count);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    // Close the connection
    console.log("Closing MongoDB connection");
    await mongoose.connection.close();
  }
};

runQueryExample();
