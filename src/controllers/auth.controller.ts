import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  const token = generateToken(user.id.toString());
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid email or password" });

  const token = generateToken(user.id.toString());
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const u = req.user!;
  res.json({ _id: u._id, name: u.name, email: u.email, role: u.role });
});
