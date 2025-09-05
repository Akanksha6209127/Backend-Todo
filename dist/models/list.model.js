"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const mongoose_1 = require("mongoose");
const listSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    completed: { type: Boolean, default: false },
}, { timestamps: true });
exports.List = (0, mongoose_1.model)("List", listSchema);
