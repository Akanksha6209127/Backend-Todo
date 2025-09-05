import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";


interface AuthRequest extends Request {
  user?: any;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
          res.status(401);
          throw new Error("Not authorized, user not found");
        }

        req.user = user; //  attach user to request
        return next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
        console.warn(" No token provided in headers");
      res.status(401);
      throw new Error("Not authorized, no token provided");
    }
  }
);
