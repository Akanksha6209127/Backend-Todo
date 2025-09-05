"use strict";
// import { Request, Response } from "express";
// import {
//   getListsService,
//   createListService,
//   updateListService,
//   deleteListService,
// } from "../services/list.service";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteList = exports.updateList = exports.createList = exports.getLists = void 0;
const list_service_1 = require("../services/list.service");
const getLists = async (req, res) => {
    try {
        const lists = await (0, list_service_1.getListsService)(req.user.id); // pass user
        res.json(lists);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getLists = getLists;
const createList = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const list = await (0, list_service_1.createListService)({
            name,
            user: req.user.id, // 👈 attach logged-in user
        });
        res.status(201).json(list);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createList = createList;
// ✅ Update list (only user’s own)
const updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await (0, list_service_1.updateListService)(id, req.body, req.user.id); // pass user for ownership check
        if (!list) {
            return res.status(404).json({ message: "List not found or not yours" });
        }
        res.json(list);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateList = updateList;
// ✅ Delete list (only user’s own)
const deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        const list = await (0, list_service_1.deleteListService)(id, req.user.id);
        if (!list) {
            return res.status(404).json({ message: "List not found or not yours" });
        }
        res.json({ message: "List deleted" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteList = deleteList;
