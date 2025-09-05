"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const database_1 = require("./config/database");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const list_route_1 = __importDefault(require("./routes/list.route"));
dotenv_1.default.config();
;
(0, database_1.connectDB)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/todos", todo_route_1.default);
app.use("/api/lists", list_route_1.default);
// DB Connection
(0, database_1.connectDB)();
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
exports.default = app;
