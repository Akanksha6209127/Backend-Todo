


import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/auth.routes";
import groupRoutes from "./routes/group.routes";
import listRoutes from "./routes/list.route";
import todoRoutes from "./routes/todo.route";

import { notFound, errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", routes);
app.use("/api/groups", groupRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/todos", todoRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
