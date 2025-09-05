import { Request, Response } from "express";
import  User  from "../models/user.model";


export const createAdminFromEnv = async (req: Request, res: Response) => {
  try {
    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminName || !adminEmail || !adminPassword) {
      return res.status(400).json({
        message: "ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in environment",
      });
    }

    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
     
      let shouldSave = false;
      if (existingUser.role !== "admin") {
        existingUser.role = "admin";
        shouldSave = true;
      }
      if (existingUser.name !== adminName) {
        existingUser.name = adminName;
        shouldSave = true;
      }
      
      existingUser.password = adminPassword;
      shouldSave = true;

      if (shouldSave) await existingUser.save();

      return res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        message: "Admin updated from environment",
      });
    }

    const adminUser = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    return res.status(201).json({
      _id: adminUser._id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role,
      message: "Admin created from environment",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};




