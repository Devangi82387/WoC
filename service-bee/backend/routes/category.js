import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
} from "../controllers/category.js";

const router = express.Router();

router.post("/", protect(["admin"]), createCategory);
router.put("/:id", protect(["admin"]), updateCategory);
router.delete("/:id", protect(["admin"]), deleteCategory);

router.get("/", getCategories);

export default router;
