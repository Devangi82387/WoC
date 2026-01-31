import express from "express";
import {
  registerProvider,
  loginProvider,
  searchProviders,
  getProviderById,
  getProviders
} from "../controllers/provider.js";

const router = express.Router();

router.post("/register", registerProvider);
router.post("/login", loginProvider);
router.get("/", getProviders);
router.get("/search", searchProviders);
router.get("/:id", getProviderById);

export default router;
