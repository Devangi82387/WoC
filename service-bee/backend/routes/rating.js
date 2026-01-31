import express from "express";
import { createRating } from "../controllers/rating.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect(["customer"]), createRating);

export default router;
