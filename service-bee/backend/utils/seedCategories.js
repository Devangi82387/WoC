import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Category from "../models/Category.js";

const categories = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Cleaner",
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    for (const name of categories) {
      const exists = await Category.findOne({ name });
      if (!exists) await Category.create({ name });
    }

    console.log("Default categories added");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCategories();
