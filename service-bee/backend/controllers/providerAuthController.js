const ServiceProvider = require("../models/ServiceProvider");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");

// REGISTER
exports.registerProvider = async (req, res) => {
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

// LOGIN
exports.loginProvider = async (req, res) => {
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
