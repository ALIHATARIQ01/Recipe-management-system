const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  serving: String,
  origin: String,
  cookingTime: String,
  ingredients: [String],
  steps: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);
const Favorite = mongoose.model('Favorite', recipeSchema); // Reusing the same schema for simplicity

// Add recipe to favorites
app.post('/api/favorites', async (req, res) => {
  try {
    const favoriteRecipe = new Favorite(req.body);
    await favoriteRecipe.save();
    res.status(201).json({ message: 'Recipe added to favorites' });
  } catch (error) {
    console.error('Error adding recipe to favorites:', error);
    res.status(500).json({ error: 'Failed to add recipe to favorites' });
  }
});

// Get all favorite recipes
app.get('/api/favorites', async (req, res) => {
  try {
    const favoriteRecipes = await Favorite.find();
    res.json(favoriteRecipes);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    res.status(500).json({ error: 'Failed to fetch favorite recipes' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
