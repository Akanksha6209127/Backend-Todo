"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = exports.registerUserService = void 0;
const user_model_1 = require("../models/user.model");
const generateToken_1 = require("../utils/generateToken");
const registerUserService = async (name, email, password) => {
    const userExists = await user_model_1.User.findOne({ email });
    if (userExists) {
        throw new Error("Email already exists");
    }
    const user = await user_model_1.User.create({ name, email, password });
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: (0, generateToken_1.generateToken)(user.id)
    };
};
exports.registerUserService = registerUserService;
const loginUserService = async (email, password) => {
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email");
    }
    if (!(await user.comparePassword(password))) {
        throw new Error("Invalid password");
    }
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: (0, generateToken_1.generateToken)(user.id)
    };
};
exports.loginUserService = loginUserService;
