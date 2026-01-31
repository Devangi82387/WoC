import Customer from "../models/Customer.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/jwt.js";

export const registerCustomer = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, mobileNo, age, gender } = req.body;

    const exists = await Customer.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = await Customer.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      mobileNo,
      age,
      gender
    });

    res.status(201).json({
      message: "Customer registered successfully",
      token: generateToken(customer._id, "customer")
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(customer._id, "customer")
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user.id).select("-password");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};