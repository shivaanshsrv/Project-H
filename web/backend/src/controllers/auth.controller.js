import { User } from "../models/index.js";
import { ApiResponse } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json(new ApiResponse(400, null, "Email already in use"));
        }

        const user = await User.create({ name, email, password });

        return res.status(201).json(new ApiResponse(201, { id: user._id }, "User registered"));
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json(new ApiResponse(401, null, "Invalid credentials"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(200).json(new ApiResponse(200, { token }, "Login successful"));
    } catch (err) {
        next(err);
    }
};
