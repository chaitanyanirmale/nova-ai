import User from "../models/users.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}


export const signin = async (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: "Email and password are required",
         });
      }
      const validUser = await User.findOne({ email });
      if (!validUser) {
         return res.status(404).json({message: "User not found"})
      }
      const validPassword = await bcrypt.compare(password, validUser.password);
      if (!validPassword) {
         return res.status(400).json({message: "Invalid username or password"});
      }
      const token = jwt.sign({ userId: validUser._id, role: validUser.role }, process.env.JWT_SECRET);
      const {password: pass, ...user} = validUser._doc;
      res
         .cookie('access_token', token, {httpOnly: true})
         .status(200)
         .json({token, user});
   }catch (error) {
      console.log(error);
   }
}


export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}