"use strict";
// import { Request, Response } from "express";
// import { User } from "../models/user.model";
// import { loginUserService } from "../services/auth.service";
// import { generateToken } from "../utils/generateToken";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const auth_service_1 = require("../services/auth.service");
const generateToken_1 = require("../utils/generateToken");
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await user_model_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const userRole = "user";
        const user = await user_model_1.User.create({ name, email, password, role: userRole });
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            message: "User created successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await (0, auth_service_1.loginUserService)(email, password);
        const token = (0, generateToken_1.generateToken)(userData._id);
        res.json({
            ...userData,
            token,
            message: "User logged in successfully",
        });
    }
    catch (error) {
        const message = error.message || "Server error";
        const status = message === "Invalid email or password" ? 400 : 500;
        res.status(status).json({ message });
    }
};
exports.loginUser = loginUser;
const getMe = async (req, res) => {
    try {
        // protect middleware se req.user aayega
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const user = await user_model_1.User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getMe = getMe;
