const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// generate jwt token-->
const generatetoken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// routes-->
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      profileImageUrl,
      adminInviteToken,
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Determine user role
    let role = "member";
    if (
      adminInviteToken &&
      adminInviteToken === process.env.ADMIN_INVITE_TOKEN
    ) {
      role = "admin";
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    // Respond with user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generatetoken(user._id),
      message: "New user registered successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Invalid credentials" });
    }
    // comapre password-->
    const isMatchpassword = await bcrypt.compare(password, user.password);
    if (!isMatchpassword) {
      return res.status(500).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generatetoken(user._id),
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// private route-->
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({
        message: "user profile not found",
      });
    }
    res.status(200).json({ message: "user profile", user });
  } catch (error) {
    res.status(401).json({ message: "Sever error ", error });
  }
};

// private route--->
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);

      const updateduser = await User.save();
      res.json({
        _id: updateduser._id,
        name: updateduser.name,
        email: updateduser.email,
        role: updateduser.role,
        token: updateduser.generatetoken(updateduser._id),
      });
    }
    res.status(200).json({ message: "user profile", user });
  } catch (error) {
    res.status(401).json({ message: "server error", error });
  }
};

module.exports = { updateUserProfile, getUserProfile, loginUser, registerUser };
