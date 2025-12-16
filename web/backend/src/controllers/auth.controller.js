import { User } from "../models/user.model.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: 400,
        message: "User already exists",
      });
    }

    const user = await User.create({ name, email, password });

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        status: 400,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Login successful",
      data: {
        id: user._id,
        email: user.email,
      },
    });

  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
