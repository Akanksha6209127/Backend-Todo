"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = await user_model_1.User.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            return next();
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
exports.protect = protect;
