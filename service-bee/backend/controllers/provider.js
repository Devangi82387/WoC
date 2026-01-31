import ServiceProvider from "../models/ServiceProvider.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/jwt.js";

export const registerProvider = async (req, res) => {
  try {
    const { name, email, mobileNo, description, category, city, budget, password } = req.body;

    const exists = await ServiceProvider.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Provider already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const provider = await ServiceProvider.create({
      name,
      email,
      mobileNo,
      description,
      category,
      city,
      budget,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Service Provider registered successfully",
      token: generateToken(provider._id, "provider")
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginProvider = async (req, res) => {
  try {
    const { email, password } = req.body;

    const provider = await ServiceProvider.findOne({ email });
    if (!provider) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(provider._id, "provider")
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find().populate("category", "name");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchProviders = async (req, res) => {
  try {
    const { city, category } = req.query;

    const filter = {};
    if (city) filter.city = city;
    if (category) filter.category = category;

    const providers = await ServiceProvider.find(filter).populate("category");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProviderById = async (req, res) => {
  try {
    const provider = await ServiceProvider.findById(req.params.id).populate("category", "name");
    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }
    res.json(provider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
