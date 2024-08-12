const Recipe = require("../models/Product");
const User = require("../models/User");

exports.addRecipe = async (req, res) => {
  const { cookingTime, prepTime, ...recipeDetails } = req.body;
  const imageFilenames = req.files.map((file) => file.filename);

  try {
    const chef = await User.findById(req.user.id);
    const newRecipe = new Recipe({
      ...recipeDetails,
      chefId: chef._id,
      Author: chef.name,
      images: imageFilenames,
      ingredients: req.body.ingredients.split(",").map((item) => item.trim()),
      instruction: req.body.instruction.split(",").map((item) => item.trim()),
      cookingTime: JSON.parse(cookingTime),
      prepTime: JSON.parse(prepTime),
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.getTrendingRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ visitor: -1 });
    res.status(200).json({ Data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.visitRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $inc: { visitor: 1 } },
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ Data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json({ Data: recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.getRandomRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const shuffledRecipes = recipes.sort(() => Math.random() - 0.5);
    res.status(200).json({ Data: shuffledRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.getPopularRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ Rating: -1 });
    res.status(200).json({ Data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.getRecentRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.status(200).json({ Data: recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};

exports.getAllChefsData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ UserData: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error", error });
  }
};