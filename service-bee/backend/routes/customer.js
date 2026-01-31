import express from "express";
import {
  registerCustomer,
  loginCustomer,
  getCustomerProfile
} from "../controllers/customer.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.get("/me", protect(["customer"]), getCustomerProfile);


export default router;
