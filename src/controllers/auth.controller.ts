// import { Request, Response } from "express";
// import { User } from "../models/user.model";
// import { loginUserService } from "../services/auth.service";
// import { generateToken } from "../utils/generateToken";

// // Signup
// export const registerUser = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password } = req.body;

//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).json({ message: "Email already exists" });
//         // Ensure only "user" role is allowed during registration, prevent "admin" creation
//         const userRole = "user";
//         const user = await User.create({ name, email, password, role: userRole });

//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             message: "User created successfully"
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // Login
// export const loginUser = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body;

//         const userData = await loginUserService(email, password);

//         res.json({
//             ...userData,
//             message: "User logged in successfully"
//         });
//     } catch (error) {
//         const message = (error as Error).message || "Server error";
//         const status = message === "Invalid email or password" ? 400 : 500;
//         res.status(status).json({ message });
//     }
// };


// // Get logged-in user (/me)
// export const getMe = async (req: Request, res: Response) => {
//   try {
//     // middleware (protect) se req.user aayega
//     const user = await User.findById((req as any).user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };


import { Request, Response } from "express";
import { User } from "../models/user.model";
import { loginUserService } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import { AuthRequest } from "../middlewares/auth.middleware";

// =================== Signup ===================
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Sirf normal user role allow karna
    const userRole = "user";
    const user = await User.create({ name, email, password, role: userRole });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// =================== Login ===================
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userData = await loginUserService(email, password);

    res.json({
      ...userData,
      message: "User logged in successfully",
    });
  } catch (error) {
    const message = (error as Error).message || "Server error";
    const status = message === "Invalid email or password" ? 400 : 500;
    res.status(status).json({ message });
  }
};

// =================== Get Logged-in User (/me) ===================
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    // protect middleware se req.user aayega
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


