// import { Request, Response } from "express";
// import {
//   getListsService,
//   createListService,
//   updateListService,
//   deleteListService,
// } from "../services/list.service";

// export const getLists = async (req: Request, res: Response) => {
//   try {
//     const lists = await getListsService();
//     res.json(lists);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createList = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;
//     if (!name) {
//       return res.status(400).json({ message: "Name is required" });
//     }
//     const list = await createListService(name);
//     res.status(201).json(list);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateList = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const list = await updateListService(id, req.body);
//     if (!list) {
//       return res.status(404).json({ message: "List not found" });
//     }
//     res.json(list);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const deleteList = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const list = await deleteListService(id);
//     if (!list) {
//       return res.status(404).json({ message: "List not found" });
//     }
//     res.json({ message: "List deleted" });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };


import {  Response } from "express";

import {
  getListsService,
  createListService,
  updateListService,
  deleteListService,
} from "../services/list.service";
import { AuthRequest } from "../middlewares/auth.middleware"; // 👈 extend Request with user


export const getLists = async (req: AuthRequest, res: Response) => {
  try {
    const lists = await getListsService(req.user.id); // pass user
    res.json(lists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const createList = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const list = await createListService({
      name,
      user: req.user.id, // 👈 attach logged-in user
    });

    res.status(201).json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update list (only user’s own)
export const updateList = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const list = await updateListService(id, req.body, req.user.id); // pass user for ownership check

    if (!list) {
      return res.status(404).json({ message: "List not found or not yours" });
    }

    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete list (only user’s own)
export const deleteList = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const list = await deleteListService(id, req.user.id);

    if (!list) {
      return res.status(404).json({ message: "List not found or not yours" });
    }

    res.json({ message: "List deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
