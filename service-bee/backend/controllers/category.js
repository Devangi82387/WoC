import Category from "../models/Category.js";
import AppError from "../utils/AppError.js";

export const createCategory = async (req, res, next) => {

  const { name } = req.body;

  if (!name) {
    return next(new AppError("Category name is required", 400));
  }

  const category = await Category.create({ name });

  res.status(201).json({
    success: true,
    data: category
  });

};

export const updateCategory = async (req, res, next) => {

  const { name } = req.body;

  if (!name) {
    return next(new AppError("Category name is required", 400));
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    data: category
  });

};

export const deleteCategory = async (req, res, next) => {

  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Category deleted successfully"
  });

};


export const getCategories = async (req, res, next) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "";

  const skip = (page - 1) * limit;

  const filter = {
    name: { $regex: search, $options: "i" }
  };

  const categories = await Category.find(filter)
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(filter);

  res.status(200).json({
    success: true,
    categories,
    total,
    page,
    pages: Math.ceil(total / limit)
  });

};