import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./config/database";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.route";
import listRoute from "./routes/list.route"

dotenv.config();
;connectDB();


const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/lists", listRoute);

// DB Connection
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


export default app;
