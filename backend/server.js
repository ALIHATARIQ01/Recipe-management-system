const express = require('express');
const { MongoClient } = require('mongodb');
const config = require('./config');
const cors = require('cors'); // Import the cors middleware
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; 
// Middleware to parse JSON bodies and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to set CSP headers
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://localhost:3000");
    next();
});

// Middleware to log all incoming requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    console.log('Request headers:', req.headers);
    console.log('Request body:', req.body);
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
let db;

async function connectToDatabase()
{
    const client = new MongoClient(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } );
    await client.connect();
    console.log('Connected to the MongoDB Atlas cluster');
    db = client.db(config.dbName);
}
// Use the cors middleware
app.use(cors());

// Fetch recipes API
app.get('/api/Italian_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Italian_recipes');
      const recipes = await recipesCollection.find({}).toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
app.get('/api/Japanese_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Japanese_recipes');
      const recipes = await recipesCollection.find({}).toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
app.get('/api/Mexican_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Mexican_recipes');
      const recipes = await recipesCollection.find({}).toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
app.get('/api/Thai_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Thai_recipes');
      const recipes = await recipesCollection.find({}).toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});
app.get('/api/Pakistani_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Pakistani_recipes');
      const recipes = await recipesCollection.find({}).toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Insert recipes API (optional)
app.post('/api/Italian_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Italian_recipes');
      await recipesCollection.insertMany(req.body);
      res.status(201).json({ message: 'Recipes inserted successfully' });
  } catch (error) {
      console.error('Error inserting recipes:', error);
      res.status(500).json({ error: 'Failed to insert recipes' });
  }
});
app.post('/api/Thai_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Thai_recipes');
      await recipesCollection.insertMany(req.body);
      res.status(201).json({ message: 'Recipes inserted successfully' });
  } catch (error) {
      console.error('Error inserting recipes:', error);
      res.status(500).json({ error: 'Failed to insert recipes' });
  }
});
app.post('/api/Japanese_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Japanese_recipes');
      await recipesCollection.insertMany(req.body);
      res.status(201).json({ message: 'Recipes inserted successfully' });
  } catch (error) {
      console.error('Error inserting recipes:', error);
      res.status(500).json({ error: 'Failed to insert recipes' });
  }
});
app.post('/api/Mexican_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Mexican_recipes');
      await recipesCollection.insertMany(req.body);
      res.status(201).json({ message: 'Recipes inserted successfully' });
  } catch (error) {
      console.error('Error inserting recipes:', error);
      res.status(500).json({ error: 'Failed to insert recipes' });
  }
});
// Insert recipes API (optional)
app.post('/api/Pakistani_recipes', async (req, res) => {
  try {
      const recipesCollection = db.collection('Pakistani_recipes');
      await recipesCollection.insertMany(req.body);
      res.status(201).json({ message: 'Recipes inserted successfully' });
  } catch (error) {
      console.error('Error inserting recipes:', error);
      res.status(500).json({ error: 'Failed to insert recipes' });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
    connectToDatabase().catch(console.error);
});

async function main()
 {
    const client = new MongoClient(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        // Connect the client to the server
        await client.connect();
        console.log('Connected to the MongoDB Atlas cluster');
        // Connect to the specific database
        const db = client.db(config.dbName);
        console.log(`Connected to database: ${config.dbName}`);
        // Insert some sample recipes
      //  await insertRecipes(db);

       // fetchAndDisplayRecipes();
        // Fetch and display recipe data
     //   await showRecipes(db);
    } catch (err) {
        console.error('Error: ', err);
        console.log('Failed to connect to the MongoDB Atlas cluster');}              
}
// async function fetchAndDisplayRecipes() {
//   try {
//       const response = await fetch('/api/recipes'); // Replace '/api/recipes' with your backend endpoint
//       const recipes = await response.json();
//       displayRecipes(recipes);
//   } catch (error) {
//       console.error('Error fetching recipes:', error);
//   }
// }

// function displayRecipes(recipes) {
//   const italianContainer = document.getElementById('italian-container');
//   const pakistaniContainer = document.getElementById('pakistani-container');
//   const japaneseContainer = document.getElementById('japanese-container');
//   const mexicanContainer = document.getElementById('mexican-container');
//   const thaiContainer = document.getElementById('thai-container');

//   recipes.forEach(recipe => {
//       switch (recipe.type) {
//           case 'Italian':
//               italianContainer.innerHTML += `<p>${recipe.name}</p>`;
//               break;
//           case 'Pakistani':
//               pakistaniContainer.innerHTML += `<p>${recipe.name}</p>`;
//               break;
//           case 'Japanese':
//               japaneseContainer.innerHTML += `<p>${recipe.name}</p>`;
//               break;
//           case 'Mexican':
//               mexicanContainer.innerHTML += `<p>${recipe.name}</p>`;
//               break;
//           case 'Thai':
//               thaiContainer.innerHTML += `<p>${recipe.name}</p>`;
//               break;
//           default:
//               break;
//       }
//   });
// }



async function insertRecipes(db)
{  
    const recipesCollection = db.collection('recipes');
    const Pakistani_recipes_Collection = db.collection('Pakistani_recipes');
    const Italian_recipes_Collection = db.collection('Italian_recipes');
    const Japanese_recipes_Collection = db.collection('Japanese_recipes');
    const Mexican_recipes_Collection = db.collection('Mexican_recipes');
    const Thai_recipes_Collection = db.collection('Thai_recipes');
    

// Insert documents into the Surah collection
await recipesCollection.insertMany([
    { category: 1, category_name: 'Italian', noOfrecipe: 20, recipeId: 1 },
    { category: 2, category_name: 'Pakistani', noOfrecipe: 20, recipeId: 2 },
    { category: 3, category_name: 'Japness', noOfrecipe: 20, recipeId: 3 },
    { category: 4, category_name: 'Mexican', noOfrecipe: 20, recipeId: 4 },
    { category: 5, category_name: 'Thai', noOfrecipe: 20, recipeId: 5 }
 ]);
    
    // Insert some sample recipe data
    await Italian_recipes_Collection.insertMany([
         
        //Italian recipe
        {
          IT_r_id: 1,
          Description: "Classic Roman pasta dish made with eggs, cheese, pancetta, and pepper.",
          name: 'Spaghetti Carbonara',
          type: 'Italian',
          ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Pecorino Romano Cheese', 'Black Pepper'],
          recipeId: 2,
          
          serving: "Serves 4 people.",
          origin: "Italy",
          CookingTime: "Approximately 25 minutes",
          steps: [
              ' Cook spaghetti according to package instructions until al dente. Drain and set aside.',
              ' In a bowl, whisk together eggs and grated Pecorino Romano cheese.',
              ' In a large skillet, cook pancetta until crispy.',
              ' Add cooked spaghetti to the skillet with pancetta and remove from heat.',
              ' Quickly stir in the egg and cheese mixture, tossing constantly to create a creamy sauce.',
              ' Season with black pepper and serve immediately.'
          ]
      },
      {
        IT_r_id: 2,
        name: 'Lasagna',
        type: 'Italian',
        ingredients: ['Lasagna Noodles', 'Ground Beef', 'Ricotta Cheese', 'Mozzarella Cheese', 'Tomato Sauce', 'Parmesan Cheese', 'Garlic', 'Onion'],
        recipeId: 3,
        Description: "Layered pasta dish with ground beef, ricotta, mozzarella, and tomato sauce.",
        serving: "Serves 8-10 people.",
        origin: "Italy",
        CookingTime: "Approximately 1 hour and 30 minutes",
        steps: [
            ' Preheat oven to 375°F (190°C).',
            ' Cook lasagna noodles according to package instructions. Drain and set aside.',
            ' In a large skillet, cook ground beef with chopped onion and garlic until browned.',
            ' Add tomato sauce to the skillet and simmer for 10 minutes.',
            ' In a baking dish, layer lasagna noodles, meat sauce, ricotta cheese, and mozzarella cheese.',
            ' Repeat layers and top with Parmesan cheese.',
            ' Bake in preheated oven for 45 minutes or until cheese is bubbly and golden.',
            ' Let lasagna rest for 10 minutes before serving.'
        ]
    },
    {
      IT_r_id: 3,
      name: 'Margherita Pizza',
      type: 'Italian',
      ingredients: ['Pizza Dough', 'Tomato Sauce', 'Fresh Mozzarella Cheese', 'Fresh Basil Leaves', 'Olive Oil', 'Salt'],
      recipeId: 4,
      Description: "Traditional pizza topped with tomato sauce, fresh mozzarella, and basil.",
      serving: "Serves 2-4 people.",
      origin: "Italy",
      CookingTime: "Approximately 30 minutes",
      steps: [
          ' Preheat oven to 475°F (245°C).',
          ' Roll out pizza dough on a floured surface to desired thickness.',
          ' Spread tomato sauce evenly over the dough.',
          ' Arrange slices of fresh mozzarella cheese on top.',
          ' Bake in preheated oven for 10-12 minutes or until crust is golden and cheese is melted.',
          ' Remove from oven and top with fresh basil leaves.',
          ' Drizzle with olive oil and season with salt before serving.'
      ]
  },{
    IT_r_id: 4,
    name: 'Risotto alla Milanese',
    type: 'Italian',
    ingredients: ['Arborio Rice', 'Saffron Threads', 'Chicken Broth', 'Onion', 'Butter', 'Parmesan Cheese', 'White Wine'],
    recipeId: 5,
    Description: "Creamy risotto flavored with saffron and Parmesan cheese.",
    serving: "Serves 4 people.",
    origin: "Italy",
    CookingTime: "Approximately 40 minutes",
    steps: [
        ' In a small bowl, steep saffron threads in a few tablespoons of hot broth.',
        ' In a large saucepan, sauté finely chopped onion in butter until translucent.',
        ' Add Arborio rice and toast for 2-3 minutes.',
        ' Deglaze with white wine and cook until wine is absorbed.',
        ' Gradually add warm chicken broth, one ladle at a time, stirring constantly.',
        ' Continue adding broth and stirring until rice is creamy and cooked al dente.',
        ' Stir in the saffron-infused broth and grated Parmesan cheese.',
        ' Season with salt and serve immediately.'
    ]
},
{
  IT_r_id: 5,
  name: 'Panna Cotta',
  type: 'Italian',
  ingredients: ['Heavy Cream', 'Sugar', 'Vanilla Bean', 'Gelatin', 'Fresh Berries', 'Mint Leaves'],
  recipeId: 6,
  Description: "Silky smooth dessert made with sweetened cream and gelatin, served with fresh berries.",
  serving: "Serves 6 people.",
  origin: "Italy",
  CookingTime: "Approximately 20 minutes plus chilling time",
  steps: [
      ' In a small bowl, sprinkle gelatin over cold water and let it bloom for 5 minutes.',
      ' In a saucepan, heat heavy cream, sugar, and split vanilla bean until just simmering.',
      ' Remove from heat and stir in the bloomed gelatin until completely dissolved.',
      ' Pour the mixture into serving molds and refrigerate for at least 4 hours or until set.',
      ' To serve, unmold panna cotta onto plates and garnish with fresh berries and mint leaves.'
  ]
}
,
      { IT_r_id:6,name: 'Fettuccine Alfredo', type: 'Italian', ingredients: ['Fettuccine Pasta', 'Butter', 'Heavy Cream', 'Parmesan Cheese'],recipeId: 1 ,Description:                 "Creamy pasta dish made with fettuccine noodles, butter, cream, and Parmesan cheese.",
        serving: "Serves 4-6 people.",
        origin: "Italy",
        CookingTime: "Approximately 20 minutes",steps: [
            ' Cook fettuccine pasta according to package instructions until al dente. Drain and set aside.',
            ' In a large skillet, melt butter over medium heat.',
            ' Add heavy cream to the skillet and bring to a simmer.',
            ' Gradually stir in grated Parmesan cheese until smooth and creamy.',
            ' Add cooked pasta to the skillet and toss until well coated in the sauce.',
            ' Season with salt and pepper to taste, and serve immediately.'
          ] },
        { IT_r_id:7,name: 'Caprese Salad', type: 'Italian', Description:"A simple Italian salad made with sliced tomatoes, fresh mozzarella cheese, basil leaves, and balsamic glaze.",
        serving: "Serves 2-4 people.",
        origin: "Italy",
        CookingTime: "No cooking required", ingredients: ['Tomatoes', 'Fresh Mozzarella', 'Basil', 'Balsamic Glaze'],recipeId: 1 ,steps: [
            ' Slice tomatoes and fresh mozzarella into 1/4-inch thick slices.',
            ' Arrange alternating slices of tomato and mozzarella on a serving platter.',
            ' Tuck fresh basil leaves between the tomato and mozzarella slices.',
            ' Drizzle with balsamic glaze and season with salt and pepper to taste.',
            ' Serve immediately as a refreshing appetizer or side dish.'
          ] },
        { IT_r_id:8,name: 'Gnocchi alla Sorrentina', Description:"Italian potato dumplings baked with tomato sauce, fresh mozzarella, and basil.",
        serving: "Serves 4-6 people.",
        origin: "Italy",
        CookingTime: "Approximately 20 minutes", type: 'Italian', ingredients: ['Gnocchi', 'Tomato Sauce', 'Fresh Mozzarella', 'Basil'], recipeId: 1,steps: [
              ' Cook gnocchi according to package instructions until they float to the surface. Drain and set aside.',
              ' Preheat oven to 375°F (190°C).',
              ' In a baking dish, spread a layer of tomato sauce.',
              ' Add a layer of cooked gnocchi on top of the tomato sauce.',
              ' Tear fresh mozzarella into pieces and distribute them over the gnocchi.',
              ' Sprinkle basil leaves over the mozzarella layer.',
              ' Repeat the layers until all ingredients are used, ending with a layer of mozzarella on top.',
              ' Bake in the preheated oven for about 20 minutes or until the cheese is melted and bubbly.',
              ' Serve hot, garnished with additional fresh basil leaves if desired.'
            ]},
          {IT_r_id:9, name: 'Pesto Pasta', type: 'Italian', Description: "Pasta dish tossed in basil pesto sauce, garnished with Parmesan cheese and pine nuts.",
          serving: "Serves 4-6 people.",
          origin: "Italy",
          CookingTime: "Varies depending on pasta type",ingredients: ['Pasta', 'Basil Pesto', 'Parmesan Cheese', 'Pine Nuts'], recipeId: 1, steps: [
              ' Cook pasta according to package instructions until al dente. Drain and set aside.',
              ' In a large bowl, toss the cooked pasta with basil pesto until evenly coated.',
              ' Add grated Parmesan cheese and toasted pine nuts to the bowl. Toss to combine.',
              ' Serve hot, garnished with additional grated Parmesan cheese and pine nuts if desired.'
            ]
          },
          { IT_r_id:10,name: 'Osso Buco', type: 'Italian', Description:                "Braised veal shanks cooked with vegetables, tomatoes, and white wine.",
          serving: "Serves 4-6 people.",
          origin: "Italy",
          CookingTime: "Approximately 2-3 hours",ingredients: ['Veal Shanks', 'Tomato Sauce', 'Vegetables', 'White Wine'],recipeId: 1,steps: [
              ' Preheat oven to 350°F (175°C).',
              ' Season veal shanks with salt and pepper.',
              ' Heat olive oil in a large ovenproof pot over medium-high heat.',
              ' Sear veal shanks on all sides until browned. Remove and set aside.',
              ' In the same pot, add diced onions, carrots, and celery. Cook until softened.',
              ' Stir in tomato sauce and white wine, scraping up any browned bits from the bottom of the pot.',
              ' Return the veal shanks to the pot, nestling them into the sauce.',
              ' Cover the pot and transfer to the preheated oven. Bake for about 2-3 hours, or until the veal is tender.',
              ' Serve hot, garnished with gremolata (a mixture of chopped parsley, garlic, and lemon zest) if desired.'
            ]},
          { IT_r_id:11,name: 'Spaghetti Carbonara',type: 'Italian', Description:                "Classic Italian pasta dish made with spaghetti, eggs, pancetta, Parmesan cheese, and black pepper.",
          serving: "Serves 2-4 people.",
          origin: "Italy",
          CookingTime: "Approximately 20 minutes",ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],recipeId: 1,steps: [
              ' Cook spaghetti in a large pot of boiling salted water until al dente. Drain and set aside, reserving some pasta water.',
              ' In a skillet, cook pancetta over medium heat until crispy. Remove from skillet and set aside.',
              ' In a bowl, whisk together eggs, grated Parmesan cheese, and freshly ground black pepper.',
              ' Add cooked spaghetti to the skillet with the pancetta, tossing to combine.',
              ' Remove the skillet from heat and quickly pour in the egg mixture, tossing the spaghetti continuously to coat evenly.',
              ' If the sauce is too thick, add a splash of reserved pasta water to thin it out.',
              ' Serve hot, garnished with additional grated Parmesan cheese and black pepper.'
            ]
          },
          {IT_r_id:12, name: 'Cannoli',type: 'Italian',Description:                "Italian pastry filled with sweetened ricotta cheese and chocolate chips, served in a crispy shell.",
          serving: "Serves 6-8 people.",
          origin: "Italy",
          CookingTime: "No cooking required",ingredients: ['Cannoli Shells', 'Ricotta Cheese', 'Powdered Sugar', 'Chocolate Chips'],recipeId: 1,steps: [
              ' In a mixing bowl, combine ricotta cheese and powdered sugar until smooth.',
              ' Fold in chocolate chips until evenly distributed.',
              ' Fill cannoli shells with the ricotta mixture using a piping bag or spoon.',
              ' Optional: dip the ends of the filled cannoli into chopped pistachios or additional chocolate chips for garnish.',
              ' Serve immediately, or refrigerate until ready to serve.'
            ]
          },
          {IT_r_id:13,name: 'Veal Marsala',type: 'Italian', Description:                "Thinly sliced veal cutlets cooked in a Marsala wine sauce with mushrooms and butter.",
          serving: "Serves 4-6 people.",
          origin: "Italy",
          CookingTime: "Approximately 30 minutes", ingredients: ['Veal Cutlets', 'Marsala Wine', 'Mushrooms', 'Butter'],recipeId: 1,steps: [
              ' Season veal cutlets with salt and pepper.',
              ' In a skillet, melt butter over medium-high heat.',
              ' Add veal cutlets to the skillet and cook until browned on both sides, about 3-4 minutes per side.',
              ' Remove veal cutlets from skillet and set aside.',
              ' In the same skillet, add sliced mushrooms and cook until tender, about 5 minutes.',
              ' Deglaze the skillet with Marsala wine, scraping up any browned bits from the bottom of the pan.',
              ' Return the veal cutlets to the skillet and simmer in the Marsala sauce for a few minutes until heated through.',
              ' Serve hot, garnished with chopped parsley if desired.'
            ]
          },
          {
            IT_r_id:14, name: 'Linguine alle Vongole', type: 'Italian', Description:                "Italian pasta dish made with linguine noodles, fresh clams, white wine, garlic, and parsley.",
            serving: "Serves 2-4 people.",
            origin: "Italy",
            CookingTime: "Approximately 20 minutes",ingredients: ['Linguine Pasta', 'Clams', 'White Wine', 'Garlic', 'Parsley'],recipeId: 1,steps: [
              ' Cook linguine pasta according to package instructions until al dente. Drain and set aside.',
              ' In a large skillet, heat olive oil over medium heat. Add minced garlic and cook until fragrant, about 1 minute.',
              ' Add clams to the skillet and pour in white wine. Cover and cook until the clams open, about 5-7 minutes.',
              ' Remove the clams from the skillet and set aside, discarding any unopened ones.',
              ' Toss the cooked linguine with the clam sauce in the skillet until well combined.',
              ' Stir in chopped parsley and season with salt and pepper to taste.',
              ' Serve hot, garnished with additional parsley and grated Parmesan cheese if desired.'
            ]
          },
          {IT_r_id:15,name: 'Panzanella',type: 'Italian', Description:                "Italian bread salad made with stale bread, tomatoes, cucumber, red onion, basil, and red wine vinegar.",
          serving: "Serves 4-6 people.",
          origin: "Italy",
          CookingTime: "No cooking required",ingredients: ['Bread', 'Tomatoes', 'Cucumber', 'Red Onion', 'Basil', 'Red Wine Vinegar'],recipeId: 1, steps: [
              ' Toast the bread slices until crisp and golden brown. Allow to cool, then tear or chop into bite-sized pieces.',
              ' In a large bowl, combine the toasted bread pieces with diced tomatoes, sliced cucumber, thinly sliced red onion, and torn basil leaves.',
              ' Drizzle the salad with red wine vinegar and olive oil. Season with salt and pepper to taste.',
              ' Toss the salad gently to coat all ingredients evenly with the dressing.',
              ' Let the panzanella salad sit for at least 10-15 minutes before serving to allow the flavors to meld together.',
              ' Serve chilled or at room temperature, garnished with additional basil leaves if desired.'
            ]
          },
          {
            IT_r_id:16,name: 'Ravioli',type: 'Italian', Description:"Italian pasta dish featuring stuffed ravioli pasta with ricotta cheese and spinach, served with marinara sauce.",
            serving: "Serves 2-4 people.",
            origin: "Italy",
            CookingTime: "Approximately 15-20 minutes",ingredients: ['Ravioli Pasta', 'Ricotta Cheese', 'Spinach', 'Marinara Sauce'],recipeId: 1,steps: [
              ' Cook ravioli pasta according to package instructions until tender. Drain and set aside.',
              ' In a skillet, heat marinara sauce over medium heat until heated through.',
              ' In a separate skillet, sauté spinach until wilted. Remove from heat and set aside.',
              ' Fill each cooked ravioli with a spoonful of ricotta cheese and a small amount of cooked spinach.',
              ' Pour a layer of marinara sauce into a serving dish. Arrange the stuffed ravioli on top of the sauce.',
              ' Spoon more marinara sauce over the ravioli until fully covered.',
              ' Serve hot, garnished with grated Parmesan cheese and fresh basil leaves if desired.'
            ]
          },
          {IT_r_id:17,name: 'Chicken Parmesan',type: 'Italian',Description:                "Breaded chicken breasts baked with marinara sauce, mozzarella, and Parmesan cheese.",
          serving: "Serves 4-6 people.",
          origin: "Italy",
          CookingTime: "Approximately 30-35 minutes",ingredients: ['Chicken Breast', 'Breadcrumbs', 'Marinara Sauce', 'Mozzarella', 'Parmesan Cheese'],recipeId: 1,steps: [
              ' Preheat oven to 400°F (200°C).',
              ' Pound chicken breasts to an even thickness. Season with salt and pepper.',
              ' Dip each chicken breast in beaten eggs, then coat with breadcrumbs.',
              ' Heat olive oil in a skillet over medium-high heat. Cook breaded chicken breasts until golden brown on both sides.',
              ' Transfer the cooked chicken breasts to a baking dish. Spoon marinara sauce over each piece.',
              ' Top each chicken breast with slices of mozzarella cheese and grated Parmesan cheese.',
              ' Bake in the preheated oven for about 15-20 minutes, or until the cheese is melted and bubbly.',
              ' Serve hot, garnished with chopped fresh basil leaves if desired.'
            ]
          },
          {IT_r_id:18,name: 'Cacio e Pepe',type: 'Italian', Description:                "Simple Italian pasta dish made with spaghetti, Pecorino Romano cheese, and black pepper.",
          serving: "Serves 2-4 people.",
          origin: "Italy",
          CookingTime: "Approximately 15 minutes",ingredients: ['Spaghetti', 'Pecorino Romano Cheese', 'Black Pepper'],recipeId: 1,
            steps: [
              ' Cook spaghetti in a large pot of boiling salted water until al dente. Reserve some pasta water.',
              ' In a skillet, heat olive oil over medium heat. Add freshly cracked black pepper and toast until fragrant.',
              ' Add cooked spaghetti to the skillet and toss to coat with the pepper-infused oil.',
              ' Remove the skillet from heat and sprinkle grated Pecorino Romano cheese over the spaghetti.',
              ' Toss the spaghetti continuously, adding reserved pasta water as needed to create a creamy sauce.',
              ' Serve hot, garnished with additional Pecorino Romano cheese and cracked black pepper.'
            ]
          },
          {IT_r_id:19,name: 'Prosciutto e Melone',type: 'Italian', Description:                "Italian appetizer featuring thin slices of prosciutto wrapped around sweet cantaloupe slices.",
          serving: "Serves 2-4 people.",
          origin: "Italy",
          CookingTime: "No cooking required",ingredients: ['Prosciutto', 'Cantaloupe'],recipeId: 1,steps: [
              ' Slice the cantaloupe into wedges or cubes, removing the seeds and rind.',
              ' Wrap thin slices of prosciutto around each piece of cantaloupe.',
              ' Arrange the prosciutto-wrapped cantaloupe on a serving platter.',
              ' Serve chilled as an appetizer or light snack.'
            ]
          },
          {
            IT_r_id:20, name: 'Zuppa Toscana',type: 'Italian',Description:                "Hearty Italian soup made with Italian sausage, potatoes, kale, chicken broth, and cream.",
            serving: "Serves 4-6 people.",
            origin: "Italy",
            CookingTime: "Approximately 30-35 minutes",ingredients: ['Italian Sausage', 'Potatoes', 'Kale', 'Chicken Broth', 'Cream'],recipeId: 1,
            steps: [
              ' In a large pot, cook Italian sausage over medium heat until browned and crumbled. Drain excess fat if necessary.',
              ' Add diced potatoes to the pot and pour in chicken broth. Bring to a simmer and cook until potatoes are tender.',
              ' Stir in chopped kale and cook until wilted and tender.',
              ' Reduce heat to low and pour in heavy cream. Stir to combine and heat through.',
              ' Season with salt and pepper to taste.',
              ' Serve hot, garnished with grated Parmesan cheese and red pepper flakes if desired.'
            ]
          }
    ]);
        await Pakistani_recipes_Collection.insertMany([
        // More Pakistani recipes
     { pk_r_id: 1,name: 'Biryani',type: 'Pakistani', Description:                "A flavorful Pakistani rice dish made with marinated chicken and fragrant basmati rice, layered and cooked together.",
     serving: "Serves 4-6 people.",
     origin: "Pakistan",
     CookingTime: "Approximately 1 hour",ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Onion', 'Tomato', 'Spices'],recipeId: 2,steps: [
      ' Marinate chicken pieces with yogurt, spices, and ginger-garlic paste for about 30 minutes.',
      ' Parboil basmati rice and set aside.',
      ' In a large pot, heat oil and fry sliced onions until golden brown. Remove half of the fried onions and set aside for garnishing.',
      ' Add marinated chicken to the pot and cook until the chicken is partially cooked.',
      ' Layer the partially cooked rice over the chicken in the pot.',
      ' Sprinkle the remaining fried onions, chopped tomatoes, and chopped coriander over the rice.',
      ' Cover the pot tightly and cook on low heat until the chicken and rice are fully cooked and tender.',
      ' Serve hot with raita and salad.'
    ]
  },
  {pk_r_id: 2,name: 'Nihari',type: 'Pakistani', Description:                "A slow-cooked Pakistani stew made with beef shank, wheat flour, and a blend of aromatic spices.",
  serving: "Serves 4-6 people.",
  origin: "Pakistan",
  CookingTime: "Approximately 4-6 hours",ingredients: ['Beef Shank', 'Wheat Flour', 'Onion', 'Ginger', 'Garlic', 'Spices'],recipeId: 2,steps: [
      ' In a large pot, heat oil and add sliced onions. Cook until the onions turn golden brown.',
      ' Add beef shank pieces to the pot along with ginger-garlic paste and spices. Cook until the beef is browned.',
      ' Add water to the pot and bring it to a boil. Then, reduce the heat and simmer until the meat is tender.',
      ' In a separate bowl, mix wheat flour with water to make a smooth paste (slurry). Add this slurry to the pot to thicken the gravy.',
      ' Continue to simmer until the gravy reaches the desired consistency and the meat is fully cooked.',
      ' Serve hot with naan or rice, garnished with sliced ginger, chopped coriander, and lemon wedges.'
    ]
  },
  {
    pk_r_id: 3,
    name: 'Haleem',
    type: 'Pakistani', Description:                "A thick and hearty Pakistani dish made with a blend of wheat, lentils, and tender beef, simmered to perfection with aromatic spices.",
    serving: "Serves 6-8 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 4-6 hours",
    ingredients: ['Wheat', 'Beef', 'Lentils', 'Onion', 'Ginger', 'Garlic', 'Spices'],
    recipeId: 2,
    steps: [
      ' Soak wheat and lentils separately in water for a few hours or overnight.',
      ' In a large pot, cook soaked wheat, lentils, and beef with water until everything is soft and tender.',
      ' Use a hand blender to blend the mixture until it reaches a smooth consistency.',
      ' In a separate pan, heat oil and fry sliced onions until golden brown. Remove half of the fried onions and set aside for garnishing.',
      ' Add ginger-garlic paste, spices, and chopped tomatoes to the fried onions in the pan. Cook until the tomatoes are soft.',
      ' Add this mixture to the pot of cooked wheat, lentils, and beef. Mix well.',
      ' Continue to cook the haleem on low heat, stirring occasionally, until it thickens to the desired consistency.',
      ' Serve hot, garnished with fried onions, chopped coriander, sliced ginger, and lemon wedges.'
    ]
  },
  {
    pk_r_id: 4,
    name: 'Chicken Karahi',
    type: 'Pakistani',
    ingredients: ['Chicken', 'Tomato', 'Ginger', 'Garlic', 'Green Chilies', 'Spices'],
    recipeId: 2, Description:                "A spicy and flavorful Pakistani chicken curry cooked in a traditional karahi (wok) with tomatoes, ginger, garlic, and green chilies.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 30-40 minutes",
    steps: [
      ' Heat oil in a karahi or deep skillet. Add chopped onions and cook until translucent.',
      ' Add chicken pieces to the karahi and cook until they start to brown.',
      ' Add chopped tomatoes, ginger-garlic paste, green chilies, and spices to the karahi. Cook until the tomatoes are soft and oil begins to separate.',
      ' Cover the karahi and let the chicken cook in its own juices until tender, stirring occasionally.',
      ' Garnish with chopped coriander and sliced ginger before serving.',
      ' Serve hot with naan or roti.'
    ]
  },
  {
    pk_r_id: 5,
    name: 'Seekh Kebab',
    type: 'Pakistani',
    ingredients: ['Ground Beef', 'Onion', 'Garlic', 'Ginger', 'Spices'],
    recipeId: 2,
    Description:                "Delicious Pakistani kebabs made with seasoned ground beef, shaped onto skewers, and grilled to perfection.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 20-30 minutes",
    steps: [
      ' In a large bowl, mix together ground beef, finely chopped onion, minced garlic, minced ginger, and spices.',
      ' Knead the mixture well until all ingredients are evenly incorporated.',
      ' Take portions of the mixture and shape them into long, cylindrical kebabs around skewers.',
      ' Grill the kebabs on a barbecue grill or in a preheated oven until cooked through and slightly charred on the outside.',
      ' Serve hot with mint chutney and naan or paratha.'
    ]
  },
 {
    pk_r_id: 6,
    name: 'Chapli Kebab',
    type: 'Pakistani', Description:                "Traditional Pakistani beef patties made with a flavorful blend of spices, tomatoes, onions, and green chilies.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 20-30 minutes",
    ingredients: ['Ground Beef', 'Tomato', 'Onion', 'Green Chilies', 'Spices'],
    recipeId: 2,
    steps: [
      ' In a mixing bowl, combine ground beef, finely chopped tomato, finely chopped onion, chopped green chilies, and spices.',
      ' Mix the ingredients until well combined and form into flat, round patties.',
      ' Heat oil in a skillet over medium heat.',
      ' Cook the chapli kebabs in the skillet until browned and cooked through, flipping once.',
      ' Serve hot with naan and chutney.'
    ]
  },
  {
    pk_r_id: 7,
    name: 'Chicken Biryani',
    type: 'Pakistani', Description:                "A classic Pakistani rice dish cooked with marinated chicken, fragrant basmati rice, and a blend of aromatic spices.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 1 hour",
    ingredients: ['Basmati Rice', 'Chicken', 'Yogurt', 'Onion', 'Tomato', 'Spices'],
    recipeId: 2,
    steps: [
      ' Marinate chicken pieces with yogurt, spices, and ginger-garlic paste for about 30 minutes.',
      ' Parboil basmati rice and set aside.',
      ' In a large pot, heat oil and fry sliced onions until golden brown. Remove half of the fried onions and set aside for garnishing.',
      ' Add marinated chicken to the pot and cook until the chicken is partially cooked.',
      ' Layer the partially cooked rice over the chicken in the pot.',
      ' Sprinkle the remaining fried onions, chopped tomatoes, and chopped coriander over the rice.',
      ' Cover the pot tightly and cook on low heat until the chicken and rice are fully cooked and tender.',
      ' Serve hot with raita and salad.'
    ]
  },
  alooGoshtRecipe = {
    pk_r_id: 8,
    name: 'Aloo Gosht',
    type: 'Pakistani',
    Description:                "A comforting Pakistani meat and potato curry cooked with tender beef, potatoes, and aromatic spices.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 1 hour",
    ingredients: ['Beef', 'Potatoes', 'Onion', 'Tomato', 'Spices'],
    recipeId: 2,
    steps: [
      ' Heat oil in a pot and sauté finely chopped onions until golden brown.',
      ' Add beef pieces and cook until browned.',
      ' Add chopped tomatoes, potatoes, and spices. Cook until tomatoes are softened and potatoes are tender.',
      ' Garnish with fresh coriander leaves and serve hot with naan or rice.'
    ]
  },
   {
    pk_r_id: 9,
    name: 'Samosa',
    type: 'Pakistani',
    ingredients: ['Flour', 'Potatoes', 'Peas', 'Spices'],
    Description:                "Popular Pakistani snacks made with crispy pastry filled with spiced potatoes and peas, deep-fried until golden brown.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 30-40 minutes",
    recipeId: 2,
    steps: [
      ' Prepare the samosa dough by mixing flour, salt, and water to form a stiff dough. Let it rest for 30 minutes.',
      ' Meanwhile, boil potatoes until tender, then mash them.',
      ' Heat oil in a pan, add cumin seeds, and sauté until fragrant.',
      ' Add mashed potatoes, peas, and spices. Cook until the mixture is well combined and fragrant.',
      ' Roll out the dough and cut into circles. Place a spoonful of the potato mixture in the center and fold into a triangular shape.',
      ' Seal the edges with water and deep fry until golden brown and crispy.',
      ' Serve hot with chutney or sauce.'
    ]
  },
  
 {
    pk_r_id: 10,
    name: 'Chana Masala',
    type: 'Pakistani',Description:                "A flavorful Pakistani chickpea curry cooked with onions, tomatoes, and a blend of aromatic spices.",
    serving: "Serves 4-6 people.",
    origin: "Pakistan",
    CookingTime: "Approximately 1 hour",
    ingredients: ['Chickpeas', 'Onion', 'Tomato', 'Garlic', 'Ginger', 'Spices'],
    recipeId: 2,
    steps: [
      ' Soak chickpeas overnight, then drain and rinse.',
      ' In a pressure cooker, heat oil and sauté finely chopped onions until golden brown.',
      ' Add chopped tomatoes, garlic, and ginger. Cook until tomatoes are softened.',
      ' Add soaked chickpeas, spices, and water. Close the lid and pressure cook until chickpeas are tender.',
      ' Garnish with fresh coriander leaves and serve hot with rice or naan.'
    ]
  },
  
        { pk_r_id:11,name: 'Halwa Puri', type: 'Pakistani', Description:                "A popular Pakistani breakfast consisting of deep-fried bread (puri), served with a sweet semolina pudding (halwa) and savory chickpea curry (chole).",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 1-2 hours",ingredients: ['Semolina', 'Flour', 'Chickpeas', 'Potatoes', 'Sugar', 'Ghee'],recipeId: 2,steps: [
            ' Prepare the dough for puris by mixing flour, water, and a pinch of salt. Let it rest for 30 minutes.',
            ' Heat ghee in a pan and roast semolina until golden brown. Add sugar and water to make a thick halwa consistency.',
            ' Boil chickpeas and potatoes until tender. Mash the potatoes and season with salt and spices.',
            ' Roll out the dough and fry puris until golden brown and crispy.',
            ' Serve hot puris with halwa, chickpeas, and aloo sabzi.'
          ] },
        { pk_r_id:12,name: 'Keema Paratha', type: 'Pakistani',Description:                "Delicious Pakistani stuffed flatbread filled with seasoned minced meat, onions, and aromatic spices.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 30-40 minutes", ingredients: ['Minced Meat', 'Flour', 'Onion', 'Spices'],recipeId: 2,steps: [
            ' Prepare the dough for parathas by mixing flour, water, and a pinch of salt. Let it rest for 30 minutes.',
            ' In a pan, cook minced meat with chopped onions, ginger-garlic paste, and spices until browned and cooked through.',
            ' Roll out the dough and place a portion of the cooked minced meat mixture in the center.',
            ' Fold the edges of the dough to enclose the filling and roll out into a paratha.',
            ' Cook the paratha on a hot griddle until golden brown and cooked through, flipping once.',
            ' Serve hot with yogurt or chutney.'
          ] },
        { pk_r_id:13,name: 'Hariyali Chicken', Description:                "Tender Pakistani chicken marinated in a flavorful green marinade made with yogurt, mint, cilantro, and green chilies.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 30-40 minutes",type: 'Pakistani', ingredients: ['Chicken', 'Yogurt', 'Mint', 'Cilantro', 'Green Chilies', 'Spices'],recipeId: 2 ,steps: [
            ' Marinate chicken pieces with yogurt, mint, cilantro, green chilies, and spices for about 1-2 hours.',
            ' Heat oil in a pan and add marinated chicken. Cook until browned and cooked through.',
            ' Serve hot with naan or rice.'
          ]},
        { pk_r_id:14,name: 'Achari Gosht', type: 'Pakistani',Description:                "Tender Pakistani chicken marinated in a flavorful green marinade made with yogurt, mint, cilantro, and green chilies.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 30-40 minutes", ingredients: ['Beef', 'Pickling Spices', 'Tomato', 'Onion', 'Yogurt'],recipeId: 2,steps: [
            ' Heat oil in a pan and sauté sliced onions until golden brown.',
            ' Add beef pieces and cook until browned.',
            ' Add pickling spices, chopped tomatoes, and yogurt. Cook until beef is tender and the gravy thickens.',
            ' Serve hot with naan or rice.'
          ] },
        { pk_r_id:15,name: 'Daal Chawal', type: 'Pakistani',  Description:               "A classic Pakistani comfort meal consisting of lentils cooked with aromatic spices, served with fluffy basmati rice.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 45-60 minutes",ingredients: ['Lentils', 'Rice', 'Onion', 'Tomato', 'Garlic', 'Ginger', 'Spices'] ,recipeId: 2,steps: [
            ' Cook lentils with water, chopped tomatoes, onions, garlic, ginger, and spices until tender.',
            ' In a separate pot, cook rice until fluffy and tender.',
            ' Serve hot lentils with rice, garnished with fresh coriander leaves.'
          ]},
        { pk_r_id:16,name: 'Paya', type: 'Pakistani',Description:               "A traditional Pakistani delicacy made with tender goat trotters cooked in a flavorful broth with aromatic spices.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 4-6 hours", ingredients: ['Goat Trotters', 'Onion', 'Ginger', 'Garlic', 'Spices'],recipeId: 2 ,steps: [
            ' Clean and wash goat trotters thoroughly. ',
            ' In a large pot, add goat trotters, sliced onions, chopped ginger, minced garlic, and spices.',
            ' Cover with water and bring to a boil. ',
            ' Reduce heat and simmer until the trotters are tender and the broth is flavorful.',
            ' Serve hot with naan or rice, garnished with chopped cilantro and sliced ginger.'
          ]},
        { pk_r_id:17,name: 'Korma', type: 'Pakistani', Description:               "A rich and creamy Pakistani curry made with tender chicken, yogurt, almonds, and aromatic spices.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 45-60 minutes", ingredients: ['Chicken', 'Yogurt', 'Onion', 'Almonds', 'Cream', 'Spices'],recipeId: 2,steps: [
            ' Marinate chicken pieces in yogurt and spices for at least 30 minutes.',
            ' In a large pot, heat oil and sauté sliced onions until golden brown.',
            ' Add marinated chicken and cook until it changes color.',
            ' Add ground almonds and a splash of water, then cover and simmer until chicken is cooked through.',
            ' Stir in cream and simmer for a few more minutes until the sauce thickens.',
            ' Serve hot with naan or rice, garnished with chopped cilantro and slivered almonds.'
          ] },
        { pk_r_id:18,name: 'Shahi Tukda', type: 'Pakistani', Description:               "A decadent Pakistani dessert made with fried bread slices soaked in sweetened milk, flavored with cardamom, saffron, and garnished with pistachios.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 30-45 minutes", ingredients: ['Bread', 'Milk', 'Sugar', 'Cardamom', 'Saffron', 'Pistachios'],recipeId: 2, steps: [
            ' Cut bread slices into triangles and deep fry until golden brown. Drain excess oil and set aside.',
            ' In a saucepan, bring milk to a boil. Add sugar, cardamom, and saffron strands.',
            ' Simmer until the milk reduces and thickens slightly.',
            ' Dip fried bread slices in the milk mixture, allowing them to soak up the flavors.',
            ' Arrange the soaked bread slices on a serving platter and pour any remaining milk over them.',
            ' Garnish with chopped pistachios and serve warm or chilled.'
          ] },
        { pk_r_id:19,name: 'Chicken Pulao',Description:               "A fragrant Pakistani rice dish made with marinated chicken, aromatic basmati rice, and a blend of spices.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 45-60 minutes", type: 'Pakistani', ingredients: ['Basmati Rice', 'Chicken', 'Onion', 'Tomato', 'Spices'],recipeId: 2,steps: [
            ' Marinate chicken pieces with spices and set aside for at least 30 minutes.',
            ' In a large pot, heat oil and sauté sliced onions until translucent.',
            ' Add marinated chicken and cook until it changes color.',
            ' Stir in chopped tomatoes and cook until they soften.',
            ' Add soaked basmati rice and water, then cover and cook until the rice is tender and fluffy.',
            ' Serve hot with raita and salad.'
          ] },
        { pk_r_id:20,name: 'Aloo Palak', type: 'Pakistani', Description:               "A wholesome Pakistani dish made with tender potatoes and spinach cooked in a flavorful blend of spices.",
        serving: "Serves 4-6 people.",
        origin: "Pakistan",
        CookingTime: "Approximately 30-40 minutes", ingredients: ['Potatoes', 'Spinach', 'Onion', 'Tomato', 'Spices'] ,recipeId: 2, steps: [
            ' Heat oil in a pan and sauté sliced onions until golden brown.',
            ' Add chopped tomatoes and cook until they turn mushy.',
            ' Stir in diced potatoes and cook until they are partially tender.',
            ' Add chopped spinach and spices, then cover and simmer until the vegetables are cooked through.',
            ' Serve hot with roti or rice.'
          ]}]);
        await Japanese_recipes_Collection.insertMany([
        // More Japanese recipes
        {
            JP_r_id: 1,
            name: 'Tempura',Description:               'Lightly battered and deep-fried seafood and vegetables.',
            serving: 'Serves 2-4 people.',
            CookingTime: 'About 20 minutes',
            origin: 'Japan',
            type: 'Japanese',
            ingredients: ['Shrimp', 'Vegetables', 'Tempura Batter', 'Dipping Sauce'],
            recipeId: 3,
            steps: [
              ' Prepare the tempura batter by mixing flour and water until smooth.',
              ' Dip shrimp and vegetables into the batter.',
              ' Deep fry the battered ingredients until golden brown.',
              ' Serve hot with dipping sauce.'
            ]
          },
          {
            JP_r_id: 2,
            name: 'Okonomiyaki', Description:               'Savory pancake containing a variety of ingredients, often including cabbage, meat, and seafood.',
            serving: 'Serves 4 people.',
            CookingTime: 'Around 30 minutes',
            origin: 'Japan',        
            type: 'Japanese',
            ingredients: ['Cabbage', 'Flour', 'Egg', 'Pork Belly', 'Sauce', 'Mayonnaise'],
            recipeId: 3,
            steps: [
              ' Mix shredded cabbage, flour, beaten egg, and chopped pork belly to form a batter.',
              ' Cook the batter on a hot griddle or frying pan until both sides are golden brown.',
              ' Drizzle with okonomiyaki sauce and mayonnaise before serving.'
            ]
          },
          {
            JP_r_id: 3,
            name: 'Tonkatsu', Description:               'Breaded and deep-fried pork cutlet.',
            serving: 'Serves 3 people.',
            CookingTime: 'Approximately 20 minutes',
            origin: 'Japan',        
            type: 'Japanese',
            ingredients: ['Pork Cutlet', 'Panko Breadcrumbs', 'Cabbage', 'Tonkatsu Sauce'],
            recipeId: 3,
            steps: [
              ' Coat pork cutlets in flour, dip in beaten egg, and then coat with panko breadcrumbs.',
              ' Fry the coated pork cutlets until golden brown and cooked through.',
              ' Serve with shredded cabbage and tonkatsu sauce on the side.'
            ]
          },
          {
            JP_r_id: 4,
            name: 'Sushi',
            type: 'Japanese',Description:               'Vinegared rice topped with various ingredients such as raw fish, vegetables, and sometimes tropical fruits.',
            serving: 'Serves 2 people.',
            CookingTime: 'Depends on the type; typically around 30 minutes',
            origin: 'Japan.',
            ingredients: ['Sushi Rice', 'Nori Seaweed', 'Fish', 'Vegetables'],
            recipeId: 3,
            steps: [
              ' Cook sushi rice according to package instructions and let it cool.',
              ' Place a sheet of nori seaweed on a bamboo mat.',
              ' Spread a layer of sushi rice on the nori, leaving a border at the top.',
              ' Add fish and vegetables in a line along the bottom edge of the rice.',
              ' Roll the sushi tightly using the bamboo mat.',
              ' Slice into bite-sized pieces and serve with soy sauce and wasabi.'
            ]
          },
          {
            JP_r_id: 5,
            name: 'Ramen',Description:               'Noodles served in a flavorful broth, topped with various ingredients such as sliced pork, eggs, and green onions.',
            serving: 'Serves 4-6 people.',
            CookingTime: 'Approximately 30 minutes',
            origin: 'Ramen originated in China but gained popularity in Japan, evolving into numerous regional styles.',
            type: 'Japan',
            ingredients: ['Ramen Noodles', 'Broth', 'Pork Belly', 'Egg', 'Green Onions', 'Seaweed'],
            recipeId: 3,
            steps: [
              ' Cook ramen noodles according to package instructions.',
              ' Heat broth in a separate pot and season with desired flavors like soy sauce, miso, or salt.',
              ' Cook pork belly slices and boil eggs until desired doneness.',
              ' Divide cooked noodles into bowls, pour hot broth over them.',
              ' Top with sliced pork belly, halved boiled eggs, chopped green onions, and seaweed. Serve hot.'
            ]
          },
          {
            JP_r_id: 6,
            name: 'Udon',
            type: 'Japanese',Description:               'Thick wheat noodles served in a hot broth, often with toppings like tofu, mushrooms, and green onions.',
            serving: 'Serves 8 people.',
            CookingTime: 'Around 20-25 minutes',
            origin: 'Japan',        
            ingredients: ['Udon Noodles', 'Broth', 'Tofu', 'Mushrooms', 'Green Onions'],
            recipeId: 3,
            steps: [
              ' Cook udon noodles according to package instructions.',
              ' Heat broth in a pot and bring to a simmer.',
              ' Add tofu, mushrooms, and green onions to the broth and cook until they are tender.',
              ' Add cooked udon noodles to the broth and simmer for a few more minutes until heated through.',
              ' Serve hot.'
            ]
          },
          {
            JP_r_id: 7,
            name: 'Miso Soup',
            type: 'Japanese',Description:               'Soup made with dashi stock and miso paste, often containing tofu, seaweed, and green onions.',
            serving: 'Serves 2 people.',
            CookingTime: 'About 10-15 minutes',
            origin: 'Japan',        
            ingredients: ['Dashi Stock', 'Tofu', 'Seaweed', 'Green Onions'],
            recipeId: 3,
            steps: [
              ' Heat dashi stock in a pot until it starts to simmer.',
              ' Add cubed tofu and seaweed to the simmering dashi stock.',
              ' Let it simmer for a few minutes until the tofu is heated through and the seaweed softens.',
              ' Remove the pot from heat and stir in miso paste until dissolved.',
              ' Garnish with chopped green onions before serving. Serve hot.'
            ]
          },
          {
            JP_r_id: 8,
            name: 'Yakitori',
            type: 'Japanese', Description:               'Skewered and grilled chicken or other ingredients glazed with a sweet and savory sauce.',
            serving: 'Serves 1 people.',
            CookingTime: 'Around 15-20 minutes',
            origin: 'Japan.',
            ingredients: ['Chicken', 'Green Onions', 'Soy Sauce', 'Sake', 'Sugar'],
            recipeId: 3,
            steps: [
              ' Cut chicken into bite-sized pieces and thread them onto skewers, alternating with pieces of green onions.',
              ' Mix soy sauce, sake, and sugar to make the yakitori sauce.',
              ' Grill the skewered chicken and green onions, basting with the yakitori sauce until cooked through and caramelized.',
              ' Serve hot, optionally sprinkled with sesame seeds.'
            ]
          },
          {
            JP_r_id: 9,
            name: 'Gyoza',
            type: 'Japanese',Description:               'Japanese dumplings filled with ground pork, cabbage, and seasonings, pan-fried until crispy.',
            serving: 'Serves 3 people.',
            CookingTime: 'About 20-25 minutes',
            origin: 'Japan',
            ingredients: ['Ground Pork', 'Cabbage', 'Garlic', 'Ginger', 'Soy Sauce', 'Dumpling Wrappers'],
            recipeId: 3,
            steps: [
              ' Mix ground pork, finely chopped cabbage, minced garlic, minced ginger, and soy sauce in a bowl to make the filling.',
              ' Place a spoonful of the filling onto a dumpling wrapper.',
              ' Moisten the edges of the wrapper with water and fold it in half, sealing the edges tightly.',
              ' Heat oil in a pan and arrange the gyoza in a single layer.',
              ' Cook until the bottoms are golden brown.',
              ' Add water to the pan and cover to steam the gyoza until cooked through.',
              ' Serve hot with dipping sauce.'
            ]
          },
          {
            JP_r_id: 10,
            name: 'Teriyaki Chicken',
            type: 'Japanese',Description:               'Chicken marinated in a sweet and savory teriyaki sauce, then grilled or pan-seared until caramelized.',
            serving: 'Serves 4 people.',
            CookingTime: 'Approximately 20-25 minutes',
            origin: 'Japan.',
            ingredients: ['Chicken', 'Soy Sauce', 'Mirin', 'Sugar', 'Sesame Seeds'],
            recipeId: 3,
            steps: [
              ' Cut chicken into bite-sized pieces.',
              ' In a bowl, mix soy sauce, mirin, and sugar to make the teriyaki sauce.',
              ' Marinate the chicken pieces in the teriyaki sauce for about 30 minutes.',
              ' Heat a pan over medium heat and add the marinated chicken pieces.',
              ' Cook until the chicken is browned and cooked through, basting with the remaining teriyaki sauce.',
              ' Serve hot, sprinkled with sesame seeds.'
            ]
          },
          {
            JP_r_id: 11,
            name: 'Chirashi Sushi',
            type: 'Japanese', Description:               'Scattered sushi featuring a colorful array of toppings such as raw fish, vegetables, and omelette strips over sushi rice.',
            serving: 'Serves 1 people.',
            CookingTime: 'Varies depending on toppings; typically around 30 minutes',
            origin: 'Japan',
            ingredients: ['Sushi Rice', 'Assorted Fish', 'Vegetables', 'Egg', 'Soy Sauce'],
            recipeId: 3,
            steps: [
              ' Cook sushi rice according to package instructions and let it cool.',
              ' Prepare assorted fish and vegetables by slicing them into bite-sized pieces.',
              ' Optionally, make a thin omelette (tamagoyaki) and slice it into strips.',
              ' Spread the sushi rice evenly in a serving bowl or plate.',
              ' Arrange the assorted fish, vegetables, and omelette strips on top of the sushi rice.',
              ' Serve with soy sauce on the side.'
            ]
          },
          {
            JP_r_id: 12,
            name: 'Takoyaki',
            type: 'Japanese', Description:               'Japanese octopus balls made from a savory batter filled with diced octopus, cooked in a special takoyaki pan until golden and crispy.',
            serving: 'Serves 12 people.',
            CookingTime: 'About 20-25 minutes',
            origin: 'Japan',
            ingredients: ['Octopus', 'Flour', 'Egg', 'Green Onions', 'Takoyaki Sauce', 'Bonito Flakes'],
            recipeId: 3,
            steps: [
              ' Prepare takoyaki batter by mixing flour, egg, and water until smooth.',
              ' Heat a takoyaki pan and grease the molds with oil.',
              ' Pour batter into the molds and add a piece of octopus and chopped green onions into each mold.',
              ' Cook until the edges start to set, then use a skewer to flip each takoyaki ball over.',
              ' Continue cooking until all sides are golden brown and crispy.',
              ' Serve hot, drizzled with takoyaki sauce and sprinkled with bonito flakes.'
            ]
          },
          {
            JP_r_id: 13,
            name: 'Onigiri',
            type: 'Japanese', Description:               'Japanese rice balls made by shaping cooked rice with a filling of your choice, often wrapped in seaweed for easy handling.',
            serving: 'Serves 5 people.l',
            CookingTime: 'Varies depending on filling and shaping; typically 15-20 minutes',
            origin: 'Japan',
            ingredients: ['Sushi Rice', 'Nori Seaweed', 'Fillings (e.g., Salmon, Pickled Plum)'],
            recipeId: 3,
            steps: [
              ' Cook sushi rice according to package instructions and let it cool slightly.',
              ' Wet your hands and scoop a handful of rice, shaping it into a triangle or oval.',
              ' Make an indentation in the center of the rice and add your desired filling.',
              ' Cover the filling with more rice and shape it into a compact triangle or oval.',
              ' Wrap the onigiri with a strip of nori seaweed, if desired.',
              ' Repeat with the remaining rice and filling.',
              ' Serve at room temperature or pack for a convenient snack.'
            ]
          },
          {
            JP_r_id: 14,
            name: 'Katsu Curry',
            type: 'Japanese', Description:               'Crispy breaded chicken or pork cutlets served with a rich and flavorful Japanese curry sauce, typically accompanied by steamed rice.',
            serving: 'Serves 8 people.',
            CookingTime: 'Around 45-50 minutes',
            origin: 'Japan.',
            ingredients: ['Chicken or Pork Cutlet', 'Curry Sauce', 'Rice'],
            recipeId: 3,
            steps: [
              ' Cook chicken or pork cutlets by coating them in flour, dipping in beaten egg, and then coating with breadcrumbs. Fry until golden brown and cooked through.',
              ' Prepare curry sauce according to package instructions or make it from scratch.',
              ' Serve the crispy cutlets with hot curry sauce and steamed rice.',
              ' Optionally, garnish with pickled ginger or chopped green onions.'
            ]
          },
          {
            JP_r_id: 15,
            name: 'Matcha Ice Cream',Description:               'Creamy and refreshing ice cream flavored with finely ground green tea powder, known as matcha, creating a unique balance of sweet and bitter flavors.',
            serving: 'Serves 3 people.',
            CookingTime: 'Varies depending on ice cream maker; typically 20-30 minutes (plus freezing time)',
            origin: 'Japan',
            type: 'Japanese',
            ingredients: ['Matcha Powder', 'Milk', 'Cream', 'Sugar'],
            recipeId: 3,
            steps: [
              ' In a saucepan, whisk together milk, cream, sugar, and matcha powder over medium heat until sugar and matcha are dissolved.',
              ' Remove from heat and let the mixture cool completely.',
              ' Transfer the mixture to an ice cream maker and churn according to the manufacturer\'s instructions.',
              ' Once churned, transfer the ice cream to a container and freeze until firm.',
              ' Serve scoops of matcha ice cream and enjoy!'
            ]
          },
          {
            JP_r_id: 16,
            name: 'Anmitsu',
            type: 'Japanese',  Description:               'Japanese dessert consisting of agar jelly cubes, assorted fruits, red bean paste, and sweet syrup, served chilled for a refreshing treat.',
            serving: 'Serves 4-6 people.',
            CookingTime: 'About 1 hour (including setting time for jelly)',
            origin: 'Japan',
            ingredients: ['Agar Jelly', 'Fruit', 'Red Bean Paste', 'Sweet Syrup'],
            recipeId: 3,
            steps: [
              ' Prepare agar jelly according to package instructions and let it set in a mold. Once set, cut it into cubes.',
              ' Prepare assorted fruits by washing and cutting them into bite-sized pieces.',
              ' Arrange the agar jelly cubes and assorted fruits in serving bowls or plates.',
              ' Add a dollop of red bean paste on top of the fruits.',
              ' Drizzle sweet syrup over the anmitsu and serve chilled.'
            ]
          },
          {
            JP_r_id: 17,
            name: 'Soba Salad',Description:               'Refreshing salad made with buckwheat soba noodles, crisp vegetables, and a flavorful sesame dressing.',
            serving: 'Serves 4-6 people.',
            CookingTime: 'Approximately 20-25 minutes',
            origin: 'Japan.',
            type: 'Japanese',
            ingredients: ['Soba Noodles', 'Vegetables', 'Sesame Dressing'],
            recipeId: 3,
            steps: [
              ' Cook soba noodles according to package instructions, then rinse under cold water and drain well.',
              ' Prepare assorted vegetables by washing and cutting them into julienne strips or bite-sized pieces.',
              ' Toss cooked soba noodles and vegetables together in a bowl.',
              ' Drizzle sesame dressing over the soba salad and toss to coat evenly.',
              ' Serve chilled or at room temperature.'
            ]
          },
          {
            JP_r_id: 18,
            name: 'Shabu-Shabu', Description:               'Japanese hot pot dish where thinly sliced meat and vegetables are swished in boiling water and dipped in a flavorful sauce before eating.',
            serving: 'Serves 4-6 people.',
            CookingTime: 'Varies depending on ingredients; typically 30-45 minutes',
            origin: 'Japan.',
            type: 'Japanese',
            ingredients: ['Thinly Sliced Meat', 'Vegetables', 'Dipping Sauce'],
            recipeId: 3,
            steps: [
              ' Prepare a pot of boiling water and place it in the center of the dining table along with a portable stove.',
              ' Arrange thinly sliced meat and assorted vegetables on separate plates.',
              ' Each diner uses chopsticks to swish the meat and vegetables in the boiling water until cooked to their liking (shabu-shabu action).',
              ' Dip the cooked meat and vegetables in the dipping sauce before eating.',
              ' Serve with steamed rice or noodles.'
            ]
          },
          {
            JP_r_id: 19,
            name: 'Yakisoba',
            type: 'Japanese',Description:               'Stir-fried noodles tossed with vegetables, meat (often pork), and a sweet and savory yakisoba sauce.',
            serving: 'Serves 4-6 people.',
            CookingTime: 'Around 20-25 minutes',
            origin: 'Japan',
            ingredients: ['Yakisoba Noodles', 'Cabbage', 'Carrots', 'Pork Belly', 'Yakisoba Sauce'],
            recipeId: 3,
            steps: [
              ' Cook yakisoba noodles according to package instructions, then rinse under cold water and drain well.',
              ' Prepare vegetables by shredding cabbage and julienning carrots.',
              ' Slice pork belly into thin strips.',
              ' Heat oil in a pan or wok and stir-fry the pork belly until browned.',
              ' Add the vegetables to the pan and stir-fry until tender.',
              ' Add cooked yakisoba noodles and yakisoba sauce to the pan, tossing everything together until heated through.',
              ' Serve hot, optionally garnished with pickled ginger or bonito flakes.'
            ]
          },
          {
            JP_r_id: 20,
            name: 'Nikujaga',
            type: 'Japanese',
            Description:               'Japanese comfort food stew made with simmered beef, potatoes, carrots, and onions in a sweet soy sauce broth.',
            serving: 'Serves 4-6 people.',
            CookingTime: 'Approximately 1 hour',
            origin: 'Japan',
            ingredients: ['Beef', 'Potatoes', 'Carrots', 'Onion', 'Soy Sauce', 'Sugar', 'Sake'],
            recipeId: 3,
            steps: [
              ' Slice beef thinly and cut potatoes, carrots, and onion into bite-sized pieces.',
              ' In a pot, combine beef, potatoes, carrots, and onion.',
              ' Add soy sauce, sugar, sake, and enough water to cover the ingredients.',
              ' Bring to a boil, then reduce heat and simmer until the vegetables are tender and the flavors meld together.',
              ' Serve hot, optionally garnished with chopped green onions.'
            ]
          }]);
        await Mexican_recipes_Collection.insertMany([
        // More Mexican recipes
        {
            MX_r_id: 1,
            name: 'Enchiladas',
            type: 'Mexican', Description:               'Enchiladas are rolled tortillas filled with shredded chicken and cheese, smothered in enchilada sauce, and baked until bubbly.',
            serving: 'serve 2 people',
            CookingTime: 'Approximately 20-25 minutes',
            origin: 'Enchiladas have ancient roots in Mexico, with variations found in Mayan and Aztec cuisine. They evolved over time with the introduction of ingredients like cheese and chicken.',
            ingredients: ['Tortillas', 'Chicken', 'Cheese', 'Enchilada Sauce'],
            recipeId: 4,
            steps: [
              ' Preheat oven to 350°F (175°C).',
              ' Warm tortillas in a skillet or microwave to make them pliable.',
              ' Fill each tortilla with shredded chicken and cheese, then roll it up and place it seam-side down in a baking dish.',
              ' Pour enchilada sauce over the rolled tortillas, ensuring they are evenly covered.',
              ' Sprinkle extra cheese on top, if desired.',
              ' Bake in the preheated oven for 20-25 minutes, or until the cheese is melted and bubbly.',
              ' Serve hot with your favorite toppings such as sour cream, diced tomatoes, and chopped cilantro.'
            ]
          },
          {
            MX_r_id: 2,
            name: 'Chiles Rellenos',
            type: 'Mexican',Description:               'Chiles rellenos are poblano peppers stuffed with cheese and ground beef, dipped in egg batter, fried until crispy, and served with tomato sauce.',
            serving: 'serve 1 person',
            CookingTime: 'Varies depending on preparation; typically 30-45 minutes',
            origin: 'Chiles rellenos have a long history in Mexican cuisine, dating back to the colonial period when Spanish settlers introduced frying techniques and ingredients like cheese.',
            ingredients: ['Poblano Peppers', 'Cheese', 'Ground Beef', 'Tomato Sauce'],
            recipeId: 4,
            steps: [
              ' Roast poblano peppers over an open flame or broil them in the oven until the skins are charred.',
              ' Place the charred peppers in a plastic bag and let them steam for 10 minutes, then peel off the skins.',
              ' Make a slit lengthwise in each pepper and remove the seeds and membranes.',
              ' Stuff each pepper with cheese and cooked ground beef.',
              ' Close the peppers and secure with toothpicks, if necessary.',
              ' Dip each stuffed pepper in beaten egg, then coat with flour or breadcrumbs.',
              ' Fry the stuffed peppers in hot oil until golden brown and crispy.',
              ' Serve hot with tomato sauce.'
            ]
          },
          {
            MX_r_id: 3,
            name: 'Churros',
            type: 'Mexican',
            Description:               'Churros are fried dough pastries coated in cinnamon sugar, crispy on the outside and soft on the inside, often served with chocolate sauce for dipping.',
            serving: 'serves 2 people',
            CookingTime: 'Around 20-25 minutes',
            origin: 'Churros are believed to have Spanish origins but became popular in Mexico and other Latin American countries. They are commonly enjoyed as a street food or dessert.',
            ingredients: ['Flour', 'Water', 'Sugar', 'Cinnamon'],
            recipeId: 4,
            steps: [
              ' In a saucepan, heat water, sugar, and a pinch of salt until it boils.',
              ' Remove from heat and stir in flour until a dough forms.',
              ' Transfer the dough to a piping bag fitted with a star tip.',
              ' Heat oil in a deep fryer or heavy-bottomed pot to 375°F (190°C).',
              ' Pipe strips of dough into the hot oil, cutting them off with scissors.',
              ' Fry until golden brown and crispy, then drain on paper towels.',
              ' Roll the churros in a mixture of cinnamon and sugar while still warm.',
              ' Serve immediately with chocolate sauce or dulce de leche for dipping.'
            ]
          },
          {
            MX_r_id: 4,
            name: 'Tacos al Pastor',
            type: 'Mexican',
            Description:               'Guacamole is a creamy dip made from mashed avocados mixed with diced tomato, onion, cilantro, lime juice, and seasonings.',
            serving: 'serve 2-3 people',
            CookingTime: 'Preparation time: 10-15 minutes',
            origin: 'Guacamole has ancient origins in Aztec cuisine, with avocados being a staple food in Mexico for thousands of years. The addition of ingredients like tomato and lime juice became popular in the 20th century.',
            ingredients: ['Pork', 'Pineapple', 'Onion', 'Cilantro', 'Corn Tortillas'],
            recipeId: 4,
            steps: [
              ' Marinate thinly sliced pork in a mixture of pineapple juice, vinegar, achiote paste, and spices for at least 2 hours or overnight.',
              ' Preheat a grill or grill pan over medium-high heat.',
              ' Grill the marinated pork slices until cooked through and slightly charred.',
              ' Grill pineapple slices until they have grill marks.',
              ' Warm corn tortillas on the grill.',
              ' Assemble tacos by filling each tortilla with grilled pork, pineapple, diced onion, and chopped cilantro.',
              ' Serve hot with lime wedges and your favorite salsa.'
            ]
          },
          {
            MX_r_id: 5,
            name: 'Guacamole',
            type: 'Mexican',
            Description:               'Guacamole is a creamy dip made from mashed avocados mixed with diced tomato, onion, cilantro, lime juice, and seasonings.',
    serving: 'serves 2 people',
    CookingTime: 'Preparation time: 10-15 minutes',
    origin: 'Guacamole has ancient origins in Aztec cuisine, with avocados being a staple food in Mexico for thousands of years. The addition of ingredients like tomato and lime juice became popular in the 20th century.',
            ingredients: ['Avocado', 'Tomato', 'Onion', 'Lime', 'Cilantro'],
            recipeId: 4,
            steps: [
              ' Cut avocados in half, remove the pits, and scoop out the flesh into a bowl.',
              ' Mash the avocado with a fork until smooth or chunky, depending on your preference.',
              ' Stir in diced tomato, finely chopped onion, chopped cilantro, and lime juice.',
              ' Season with salt and pepper to taste.',
              ' Serve immediately with tortilla chips or as a topping for tacos, nachos, or burritos.'
            ]
          },
          {
            MX_r_id: 6,
            name: 'Mole Poblano',
            Description:                'Mole poblano is a rich and complex sauce made from chiles, chocolate, spices, and nuts, typically served over chicken or turkey.',
            serving: 'serve 2 people',
            CookingTime: 'Approximately 2 hours',
            origin: 'Mole poblano originated in the state of Puebla, Mexico, with roots in indigenous and Spanish culinary traditions. It is often associated with special occasions and holidays like Cinco de Mayo.',
            type: 'Mexican',
            ingredients: ['Chicken', 'Chocolate', 'Chiles', 'Spices', 'Almonds'],
            recipeId: 4,
            steps: [
              ' Roast chiles and spices until fragrant, then grind them into a paste.',
              ' Heat oil in a large pot and brown chicken pieces on all sides.',
              ' Add the chile paste to the pot and cook for a few minutes, stirring constantly.',
              ' Stir in chicken broth and simmer until the chicken is cooked through and tender.',
              ' Add chocolate and almonds to the pot, stirring until the chocolate is melted and the sauce is thickened.',
              ' Serve hot with rice or tortillas.'
            ]
          },
          {
            MX_r_id: 7,
            name: 'Tamales',
            type: 'Mexican',
            Description:                'Churros are fried dough pastries made from a simple dough of flour, water, and sugar, which is piped into hot oil and fried until crispy. They are often coated in cinnamon sugar and served as a sweet treat or dessert.',
            serving: 'serve 3 people',
            CookingTime: 'Preparation time: 15 minutes; Cooking time: 15 minutes',
            origin: 'Churros are believed to have originated in Spain, but they have become popular in many countries, including Mexico, where they are commonly sold as street food or enjoyed with a cup of hot chocolate.',
            ingredients: ['Corn Husks', 'Masa Dough', 'Meat Filling', 'Sauce'],
            recipeId: 4,
            steps: [
              ' Soak corn husks in warm water until they are pliable.',
              ' Spread masa dough onto each corn husk, leaving room at the edges.',
              ' Spoon meat filling onto the center of the masa dough.',
              ' Fold the sides of the corn husks over the filling and roll them up to form tamales.',
              ' Steam the tamales in a large pot for about 1-5 hours, or until the masa is cooked through.',
              ' Serve hot with sauce on the side.'
            ]
          },
          {
            MX_r_id: 8,
            name: 'Pozole',
            Description:                'Tamales are traditional Mexican dishes made of masa dough filled with a savory or sweet filling, wrapped in corn husks, and steamed until cooked through. They can be filled with a variety of ingredients, including meats, cheese, vegetables, or fruits.',
            serving: 'serve 2 people',
            CookingTime: 'Preparation time: 1-5 hours; Cooking time: 1-5 hours',
            origin: 'Tamales have ancient origins in Mesoamerican cuisine, dating back thousands of years. They were a staple food for Aztec, Maya, and Inca civilizations and have remained an important part of Mexican culinary tradition.',
            type: 'Mexican',
            ingredients: ['Pork Shoulder', 'Hominy', 'Chiles', 'Onion', 'Cabbage', 'Radishes'],
            recipeId: 4,
            steps: [
              ' In a large pot, combine pork shoulder, hominy, chopped onion, and dried chiles.',
              ' Add enough water to cover the ingredients and bring to a boil.',
              ' Reduce heat and simmer until the pork is tender and the hominy is cooked through.',
              ' Serve hot, garnished with shredded cabbage, sliced radishes, and lime wedges.'
            ]
          },
          {
            MX_r_id: 9,
            name: 'Ceviche',
            type: 'Mexican',
            Description:                'Pozole is a traditional Mexican soup or stew made from pork, hominy (dried maize kernels), and seasoned with various herbs and spices. It is often served with shredded cabbage, radishes, lime, and other toppings.',
            serving: 'serve 3 people',
            CookingTime: 'Preparation time: 15 minutes; Cooking time: 2-3 hours',
            origin: 'Pozole has deep roots in pre-Columbian Mexican cuisine, particularly among the Aztec and other indigenous peoples. It was traditionally prepared as a ceremonial dish and has evolved over time into a popular comfort food enjoyed year-round.',
            ingredients: ['Fish', 'Shrimp', 'Lime Juice', 'Tomato', 'Onion', 'Cilantro'],
            recipeId: 4,
            steps: [
              ' Cut fish and shrimp into bite-sized pieces and place them in a bowl.',
              ' Pour lime juice over the seafood and let it marinate in the refrigerator for about 30 minutes.',
              ' Drain excess lime juice from the seafood and add diced tomato, finely chopped onion, and chopped cilantro.',
              ' Season with salt and pepper to taste.',
              ' Serve chilled, optionally with avocado slices and tortilla chips.'
            ]
          },
          {
            MX_r_id: 10,
            name: 'Tostadas',
            type: 'Mexican',
            Description:                'Ceviche is a popular seafood dish in Mexican cuisine made from raw fish or shrimp marinated in citrus juices, typically lime or lemon juice, which "cook" the seafood through a process called denaturation. It is often mixed with diced tomatoes, onions, cilantro, and served chilled.',
            serving: 'serve 2 people',
            CookingTime: 'Preparation time: 15 minutes; Marinating time: 30 minutes; Total time: 45 minutes',
            origin: 'Ceviche is believed to have originated in Peru, where it was made with raw fish cured in the acidic juice of native Peruvian limes. However, variations of ceviche are found throughout Latin America, including Mexico, where it has become a popular coastal dish.'
,          
            ingredients: ['Tostada Shells', 'Refried Beans', 'Lettuce', 'Tomato', 'Cheese', 'Sour Cream'],
            recipeId: 4,
            steps: [
              ' Spread a layer of refried beans onto each tostada shell.',
              ' Top with shredded lettuce, diced tomato, grated cheese, and a dollop of sour cream.',
              ' Serve immediately as an appetizer or main dish.'
            ]
          },
          {
            MX_r_id: 11,
            name: 'Quesadillas',
            type: 'Mexican',
            Description:                'Tostadas are crispy fried or baked tortillas topped with a variety of ingredients, making them a versatile and customizable dish. Common toppings include refried beans, shredded lettuce, diced tomatoes, grated cheese, and sour cream.',
            serving: 'serve 12 people',
            CookingTime: 'Preparation time: 10 minutes; Cooking time: 10 minutes',
            origin: 'Tostadas have ancient origins in indigenous Mexican cuisine, where they were made from maize tortillas and served as a staple food. Today, they are enjoyed throughout Mexico and in many other parts of the world.',
            ingredients: ['Tortillas', 'Cheese', 'Chicken', 'Salsa', 'Guacamole'],
            recipeId: 4,
            steps: [
              ' Heat a skillet over medium heat and place a tortilla in the skillet.',
              ' Sprinkle shredded cheese evenly over one half of the tortilla.',
              ' Add cooked chicken on top of the cheese, then fold the tortilla in half.',
              ' Cook until the bottom is golden brown and crispy, then flip and cook the other side.',
              ' Repeat with remaining tortillas and filling ingredients.',
              ' Serve hot with salsa and guacamole for dipping.'
            ]
          },
          {
            MX_r_id: 12,
            name: 'Mexican Street Corn',
            type: 'Mexican',
            Description:                'Quesadillas are a classic Mexican dish consisting of melted cheese and other ingredients sandwiched between two tortillas and cooked until crispy and golden brown. They can be filled with a variety of ingredients such as cheese, chicken, beef, vegetables, and served with salsa and guacamole.',
            serving: 'serves 6 people',
            CookingTime: 'Preparation time: 10 minutes; Cooking time: 5-10 minutes',
            origin: 'Quesadillas have ancient origins in Mexico, where they were made with maize tortillas filled with various ingredients and cooked over an open flame. Today, they are enjoyed worldwide and have evolved to include a wide range of fillings and variations.',
            ingredients: ['Corn', 'Mayonnaise', 'Cotija Cheese', 'Chili Powder', 'Lime'],
            recipeId: 4,
            steps: [
              ' Grill or boil corn until cooked through.',
              ' Spread mayonnaise evenly over each corn cob.',
              ' Sprinkle crumbled cotija cheese over the mayonnaise.',
              ' Dust with chili powder and squeeze fresh lime juice over the corn.',
              ' Serve hot as a tasty street snack or side dish.'
            ]
          },
          {
            MX_r_id: 13,
            name: 'Sopes',
            type: 'Mexican',
            Description:                'Mexican street corn, also known as "elote," is a popular Mexican street food consisting of grilled or boiled corn on the cob slathered with mayonnaise, sprinkled with cotija cheese, chili powder, and drizzled with fresh lime juice. It iss a flavorful and savory treat often enjoyed as a street snack or side dish.',
            serving: 'serves 8 people',
            CookingTime: 'Preparation time: 5 minutes; Cooking time: 10-15 minutes',
            origin: 'Mexican street corn is a beloved street food that originated in Mexico and has become popular across North America, especially in regions with a significant Mexican influence.',
            ingredients: ['Corn Masa', 'Refried Beans', 'Beef', 'Lettuce', 'Sour Cream'],
            recipeId: 4,
            steps: [
              ' Divide corn masa dough into small balls and flatten them into thick discs.',
              ' Cook the masa discs on a hot griddle until golden brown and cooked through.',
              ' Spread a layer of refried beans on top of each cooked masa disc.',
              ' Top with seasoned beef, shredded lettuce, and a dollop of sour cream.',
              ' Serve immediately as a delicious appetizer or snack.'
            ]
          },
          {
            MX_r_id: 14,
            name: 'Horchata',
            type: 'Mexican',
            Description:                'Sopes are traditional Mexican antojitos (appetizers) consisting of thick corn masa dough discs topped with various ingredients. The masa discs are cooked until golden brown and then topped with refried beans, seasoned beef, shredded lettuce, and a dollop of sour cream. They are savory, satisfying, and perfect for sharing.',
            serving: 'serves 3 people',
             CookingTime: 'Preparation time: 20 minutes; Cooking time: 10-15 minutes',
             origin: 'Sopes have indigenous roots in Mexico, where they were made with masa dough and topped with local ingredients. Today, they are enjoyed throughout Mexico and have variations in different regions.',
            ingredients: ['Rice', 'Almonds', 'Cinnamon', 'Sugar', 'Water'],
            recipeId: 4,
            steps: [
              ' Rinse rice and almonds, then soak them in water for several hours or overnight.',
              ' Drain the rice and almonds, then blend them with fresh water until smooth.',
              ' Strain the mixture through a fine mesh sieve or cheesecloth into a pitcher.',
              ' Stir in cinnamon and sugar to taste.',
              ' Chill the horchata in the refrigerator before serving over ice.'
            ]
          },
          {
            MX_r_id: 15,
            name: 'Barbacoa',
            type: 'Mexican',
            Description:                'Horchata is a refreshing Mexican beverage made from soaked rice, almonds, and cinnamon, sweetened with sugar, and blended into a creamy, dairy-free drink. It is often served over ice and enjoyed as a thirst-quenching treat on hot days.',
            serving: '2 people',
            CookingTime: 'Preparation time: 5 minutes (plus soaking time); Total time: 8 hours (including soaking time)',
            origin: 'Horchata has ancient origins in Spain, where it was made from tiger nuts. The drink was introduced to Mexico during the colonial period and adapted to include local ingredients such as rice and almonds.',
            ingredients: ['Beef', 'Adobo Sauce', 'Onion', 'Garlic', 'Bay Leaves'],
            recipeId: 4,
            steps: [
              ' Season beef with salt, pepper, and adobo sauce.',
              ' Place sliced onion, minced garlic, and bay leaves in the bottom of a slow cooker.',
              ' Add the seasoned beef on top of the onion mixture.',
              ' Cover and cook on low heat for 6-8 hours, or until the beef is tender and falls apart easily.',
              ' Shred the beef with two forks and mix it with the cooking juices.',
              ' Serve hot with tortillas and your favorite toppings.'
            ]
          },
          {
            MX_r_id: 16,
            name: 'Pico de Gallo',
            type: 'Mexican',
            Description:                'Barbacoa is a traditional Mexican dish made from slow-cooked beef seasoned with adobo sauce, onions, garlic, and bay leaves. The beef is tenderized through slow cooking, resulting in flavorful and succulent shredded meat that is perfect for tacos, burritos, or served on its own.',
            serving: 'serves 5 people',
            CookingTime: 'Preparation time: 15 minutes; Cooking time: 6-8 hours (slow cooker)',
            origin: 'Barbacoa has indigenous roots in Mexico, where it was originally made by slow-cooking meat in pits dug into the ground, covered with maguey leaves. Today, it is often prepared in slow cookers or ovens.',
            ingredients: ['Tomato', 'Onion', 'Cilantro', 'Lime', 'Jalapeno'],
            recipeId: 4,
            steps: [
              ' Dice tomatoes, onions, and jalapenos into small pieces.',
              ' Finely chop cilantro and mix it with the diced vegetables in a bowl.',
              ' Squeeze fresh lime juice over the mixture and season with salt to taste.',
              ' Stir everything together until well combined.',
              ' Serve immediately as a fresh and flavorful salsa or topping.'
            ]
          },
          {
            MX_r_id: 17,
            name: 'Flan',
            type: 'Mexican',
            Description:                'Pico de Gallo, also known as salsa fresca, is a fresh and vibrant Mexican salsa made from diced tomatoes, onions, jalapenos, cilantro, and lime juice. It is a zesty and versatile condiment that adds a burst of flavor to tacos, nachos, burritos, and grilled meats.',
            serving: 'serves 4 people',
            CookingTime: 'Preparation time: 10 minutes',
            origin: 'Pico de Gallo has ancient origins in Mexican cuisine and has been enjoyed for centuries. It is believed to have originated in the regions of Central America and Mexico, where fresh ingredients were abundant.',
            ingredients: ['Eggs', 'Sugar', 'Milk', 'Vanilla', 'Caramel Sauce'],
            recipeId: 4,
            steps: [
              ' Preheat oven to 350°F (175°C).',
              ' In a saucepan, heat sugar over medium heat until it caramelizes and turns golden brown.',
              ' Pour the caramelized sugar into a baking dish and swirl to coat the bottom evenly.',
              ' In a separate bowl, whisk together eggs, milk, sugar, and vanilla until well combined.',
              ' Pour the egg mixture over the caramel in the baking dish.',
              ' Place the baking dish in a larger pan filled with hot water (water bath).',
              ' Bake in the preheated oven for 45-50 minutes, or until the flan is set but still jiggly in the center.',
              ' Remove from the oven and let it cool to room temperature, then refrigerate for at least 4 hours or overnight.',
              ' To serve, run a knife around the edges of the flan and invert onto a serving plate.',
              ' Drizzle with additional caramel sauce if desired.'
            ]
          },
          {
            MX_r_id: 18,
            name: 'Carnitas',
            type: 'Mexican',Description:                'Flan is a classic Mexican dessert consisting of creamy custard topped with caramel sauce. The custard is made from eggs, sugar, milk, and vanilla, which are baked until set and then chilled before serving. Flan has a smooth texture and rich flavor, making it a beloved treat for special occasions.',
            serving: 'serves 2 people',
            CookingTime: 'Preparation time: 20 minutes; Cooking time: 45-50 minutes; Chilling time: 4 hours (minimum)',
            origin: 'Flan has Spanish origins and was brought to Mexico during the colonial period. It has since become an integral part of Mexican cuisine and is enjoyed across the country.',
            ingredients: ['Pork Shoulder', 'Orange Juice', 'Lime', 'Garlic', 'Spices'],
            recipeId: 4,
            steps: [
              ' Cut pork shoulder into large chunks and season with salt, pepper, and spices.',
              ' Heat a large pot or Dutch oven over medium-high heat and add pork chunks in a single layer.',
              ' Sear the pork on all sides until browned and caramelized.',
              ' Add minced garlic, orange juice, and lime juice to the pot.',
              ' Cover and simmer over low heat for 2-3 hours, or until the pork is tender and falls apart easily.',
              ' Remove the lid and increase the heat to medium-high to crisp up the pork.',
              ' Shred the pork with two forks and mix it with the cooking juices.',
              ' Serve hot with tortillas, salsa, and your favorite toppings.'
            ]
          },
          {
            MX_r_id: 19,
            name: 'Salsa Verde',
            type: 'Mexican',Description:                'Carnitas are a popular Mexican dish made from braised or roasted pork that is tender and succulent on the inside and crispy on the outside. The pork is seasoned with spices, orange juice, and lime juice, then slow-cooked until tender. Carnitas are versatile and can be enjoyed in tacos, burritos, or served with rice and beans.',
            serving: 'serves 3 people',
            CookingTime: 'Preparation time: 15 minutes; Cooking time: 3-4 hours (stovetop) or 6-8 hours (slow cooker)',
            origin: 'Carnitas originated in the state of Michoacán, Mexico, where they were traditionally prepared by simmering pork in lard until tender. The dish has since evolved, with various cooking methods and seasonings used across different regions.',
            ingredients: ['Tomatillos', 'Jalapeno', 'Onion', 'Cilantro', 'Lime'],
            recipeId: 4,
            steps: [
              ' Remove the husks from tomatillos and rinse them under warm water to remove the sticky residue.',
              ' Cut tomatillos and jalapeno in half, and chop onion into large chunks.',
              ' Place the tomatillos, jalapeno, and onion on a baking sheet and broil until charred and softened.',
              ' Transfer the roasted vegetables to a blender or food processor.',
              ' Add fresh cilantro leaves, lime juice, and salt to the blender.',
              ' Blend until smooth, adjusting seasoning to taste.',
              ' Serve chilled or at room temperature as a tangy and flavorful salsa.'
            ]
          },
          {
            MX_r_id: 20,
            name: 'Mexican Rice',
            type: 'Mexican', Description:                'Salsa Verde, or green salsa, is a tangy and flavorful Mexican sauce made from tomatillos, jalapenos, onions, cilantro, and lime juice. The tomatillos and jalapenos are roasted until charred to enhance their flavor, then blended with the other ingredients to create a vibrant green salsa. Salsa Verde is delicious served with tacos, enchiladas, or as a dip for tortilla chips.',
            serving: ' serves 3 people',
            CookingTime: 'Preparation time: 15 minutes; Cooking time: 10-15 minutes',
            origin: 'Salsa Verde has ancient origins in Mexican cuisine and has been enjoyed for centuries. It is believed to have originated in the regions of Central America and Mexico, where tomatillos were cultivated.',
            ingredients: ['Rice', 'Tomato Sauce', 'Onion', 'Garlic', 'Peas', 'Carrots'],
            recipeId: 4,
            steps: [
              ' Rinse rice under cold water until the water runs clear, then drain well.',
              ' Heat oil in a skillet over medium heat and sauté finely chopped onion and minced garlic until softened.',
              ' Add rice to the skillet and toast until lightly golden brown, stirring frequently.',
              ' Stir in tomato sauce, water, salt, and pepper.',
              ' Bring to a boil, then reduce heat to low, cover, and simmer for about 15-20 minutes, or until the rice is tender and the liquid is absorbed.',
              ' Stir in peas and diced carrots, then cover and let it sit off the heat for 5 minutes.',
              ' Fluff the rice with a fork before serving.'
            ]
          }]);
        await Thai_recipes_Collection.insertMany([
        // More Thai recipes
        {
            TH_r_id: 1,
            name: 'Tom Yum Goong',
            type: 'Thai',Description:                'Tom Yum Goong is a classic Thai soup known for its spicy and sour flavors. It is made with shrimp, mushrooms, galangal, lemongrass, chili, and lime, creating a vibrant and aromatic dish.',
            serving: 'Serves 3',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 10-15 mins',
            ingredients: ['Shrimp', 'Mushrooms', 'Galangal', 'Lemongrass', 'Chili', 'Lime'],
            recipeId: 5,
            steps: [
              ' Bring chicken or vegetable broth to a boil in a pot.',
              ' Add thinly sliced galangal and lemongrass stalks to the pot.',
              ' Add sliced mushrooms and chopped chili peppers to the pot.',
              ' Let the soup simmer until the flavors meld together, about 5-10 minutes.',
              ' Stir in shrimp and cook until they turn pink and opaque.',
              ' Remove the pot from heat and stir in lime juice.',
              ' Serve hot, garnished with fresh cilantro leaves.'
            ]
          },
          {
            TH_r_id: 2,
            name: 'Pad Kra Pao',
            type: 'Thai',Description:                'Pad Kra Pao, also known as Thai Basil Stir-Fry, is a flavorful and aromatic dish made with ground meat, Thai basil, chili, garlic, fish sauce, and soy sauce. It\'s a quick and easy dish often served with steamed rice and a fried egg on top.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 10 mins, Cooking: 10 mins',
            ingredients: ['Ground Meat', 'Thai Basil', 'Chili', 'Garlic', 'Fish Sauce', 'Soy Sauce'],
            recipeId: 5,
            steps: [
              ' Heat oil in a wok or skillet over high heat.',
              ' Add minced garlic and chopped chili peppers to the pan and stir-fry until fragrant.',
              ' Add ground meat to the pan and cook until browned and cooked through.',
              ' Season with fish sauce and soy sauce, adjusting to taste.',
              ' Stir in fresh Thai basil leaves and cook until wilted.',
              ' Serve hot with steamed rice and a fried egg on top.'
            ]
          },
          {
            TH_r_id: 3,
            name: 'Mango Sticky Rice',
            type: 'Thai',Description:                'Mango Sticky Rice is a traditional Thai dessert made with glutinous rice, fresh mango, coconut milk, and sugar. It\'s a delightful combination of sweet and creamy flavors, perfect for satisfying a sweet tooth.',
            serving: 'Serves 2',
            origin: 'Thai',
            CookingTime: 'Preparation: 35 mins, Cooking: 15 mins',
            ingredients: ['Sticky Rice', 'Mango', 'Coconut Milk', 'Sugar', 'Salt'],
            recipeId: 5,
            steps: [
              ' Rinse sticky rice until the water runs clear, then soak it in water for at least 30 minutes.',
              ' Drain the rice and steam it until cooked through and tender.',
              ' In a saucepan, heat coconut milk with sugar and a pinch of salt until hot but not boiling.',
              ' Slice ripe mangoes and arrange them on a plate.',
              ' Serve the warm sticky rice alongside the sliced mangoes, drizzled with sweetened coconut milk.'
            ]
          },
          {
            TH_r_id: 4,
            name: 'Green Curry',
            type: 'Thai', Description:                'Green Curry, also known as Kaeng Khiao Wan, is a popular Thai curry known for its vibrant green color and spicy flavor. It is made with chicken, green curry paste, coconut milk, eggplant, bamboo shoots, and Thai basil.',
            serving: 'Serves 4-6',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 25 mins',
            ingredients: ['Chicken', 'Green Curry Paste', 'Coconut Milk', 'Eggplant', 'Bamboo Shoots', 'Thai Basil'],
            recipeId: 5,
            steps: [
              ' Heat green curry paste in a pot until fragrant.',
              ' Add sliced chicken to the pot and cook until no longer pink.',
              ' Stir in coconut milk and bring to a simmer.',
              ' Add sliced eggplant and bamboo shoots to the pot.',
              ' Simmer until the chicken is cooked through and the vegetables are tender.',
              ' Stir in fresh Thai basil leaves just before serving.',
              ' Serve hot with steamed rice.'
            ]
          },
          {
            TH_r_id: 5,
            name: 'Pad Thai',
            type: 'Thai',Description:                'Pad Thai is a classic Thai stir-fried noodle dish made with rice noodles, shrimp, tofu, bean sprouts, egg, and peanuts, all tossed in a flavorful sauce made from fish sauce, tamarind paste, and sugar. It is commonly served with lime wedges and garnished with additional peanuts and cilantro.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 20 mins, Cooking: 15 mins',
            ingredients: ['Rice Noodles', 'Shrimp', 'Tofu', 'Bean Sprouts', 'Egg', 'Peanuts'],
            recipeId: 5,
            steps: [
              ' Soak rice noodles in warm water until softened, then drain well.',
              ' Heat oil in a wok or skillet and scramble eggs until set. Remove from pan and set aside.',
              ' Add tofu to the pan and cook until browned on all sides. Remove from pan and set aside.',
              ' Add shrimp to the pan and cook until pink and opaque. Remove from pan and set aside.',
              ' Add soaked rice noodles to the pan along with bean sprouts and chopped peanuts.',
              ' Stir in a mixture of fish sauce, tamarind paste, and sugar until well combined.',
              ' Return cooked eggs, tofu, and shrimp to the pan and toss everything together until heated through.',
              ' Serve hot, garnished with additional peanuts, lime wedges, and cilantro.'
            ]
          },
          {
            TH_r_id: 6,
            name: 'Tom Kha Gai',
            type: 'Thai',Description:                'Tom Kha Gai is a Thai coconut soup known for its creamy texture and aromatic flavors. It is made with chicken, coconut milk, galangal, lemongrass, kaffir lime leaves, and mushrooms, creating a harmonious blend of sweet, sour, salty, and spicy tastes.',
            serving: 'Serves 4-6',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 25 mins',
            ingredients: ['Chicken', 'Coconut Milk', 'Galangal', 'Lemongrass', 'Kaffir Lime Leaves', 'Mushrooms'],
            recipeId: 5,
            steps: [
              ' In a pot, bring coconut milk to a gentle simmer over medium heat.',
              ' Add sliced galangal and bruised lemongrass stalks to infuse the coconut milk with flavor.',
              ' Stir in thinly sliced chicken breast and let it cook until no longer pink.',
              ' Add sliced mushrooms and torn kaffir lime leaves to the pot.',
              ' Season with fish sauce and lime juice, adjusting to taste.',
              ' Simmer until the flavors meld together and the chicken is cooked through.',
              ' Serve hot, garnished with fresh cilantro leaves.'
            ]
          },
          {
            TH_r_id: 7,
            name: 'Red Curry',
            type: 'Thai',Description:                'Red Curry, also known as Kaeng Phet, is a popular Thai curry known for its rich and spicy flavor. It is made with beef, red curry paste, coconut milk, bell peppers, bamboo shoots, and Thai basil.',
            serving: 'Serves 4-6',
            origin: 'Thai',
            CookingTime: 'Preparation: 20 mins, Cooking: 25 mins',
            ingredients: ['Beef', 'Red Curry Paste', 'Coconut Milk', 'Bell Peppers', 'Bamboo Shoots', 'Thai Basil'],
            recipeId: 5,
            steps: [
              ' Heat red curry paste in a pot until fragrant.',
              ' Add sliced beef to the pot and cook until browned on all sides.',
              ' Stir in coconut milk and bring to a gentle simmer.',
              ' Add sliced bell peppers and bamboo shoots to the pot.',
              ' Simmer until the beef is tender and the vegetables are cooked through.',
              ' Stir in fresh Thai basil leaves just before serving.',
              ' Serve hot with steamed rice.'
            ]
          },
          {
            TH_r_id: 8,
            name: 'Som Tum',
            type: 'Thai',Description:                'Som Tum, or Green Papaya Salad, is a refreshing and spicy Thai salad made with shredded green papaya, tomatoes, green beans, peanuts, fish sauce, and lime juice. It\'s a vibrant and flavorful dish commonly served as a side or appetizer.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 0 mins',
            ingredients: ['Green Papaya', 'Tomato', 'Green Beans', 'Peanuts', 'Fish Sauce', 'Lime Juice'],
            recipeId: 5,
            steps: [
              ' Peel and shred green papaya into thin strips using a julienne peeler or a knife.',
              ' In a mortar and pestle, pound garlic, chilies, and peanuts into a coarse paste.',
              ' Add shredded papaya, halved cherry tomatoes, and trimmed green beans to the mortar.',
              ' Pound lightly to bruise the vegetables and release their juices.',
              ' Season with fish sauce, lime juice, and sugar, adjusting to taste.',
              ' Serve immediately as a refreshing and spicy salad.'
            ]
          },
          {
            TH_r_id: 9,
            name: 'Massaman Curry',
            type: 'Thai',Description:                'Massaman Curry is a rich and flavorful Thai curry with influences from Indian cuisine. It is made with beef, Massaman curry paste, coconut milk, potatoes, onions, and peanuts, resulting in a hearty and aromatic dish.',
            serving: 'Serves 4-6',
            origin: 'Thai',
            CookingTime: 'Preparation: 20 mins, Cooking: 30 mins',
            ingredients: ['Beef', 'Massaman Curry Paste', 'Coconut Milk', 'Potatoes', 'Onion', 'Peanuts'],
            recipeId: 5,
            steps: [
              ' Heat massaman curry paste in a pot until fragrant.',
              ' Add sliced beef to the pot and cook until browned.',
              ' Stir in coconut milk and bring to a gentle simmer.',
              ' Add diced potatoes and sliced onion to the pot.',
              ' Simmer until the beef is tender and the vegetables are cooked through.',
              ' Stir in roasted peanuts just before serving.',
              ' Serve hot with steamed rice.'
            ]
          },
          {
            TH_r_id: 10,
            name: 'Pad See Ew',
            type: 'Thai',Description:                'Pad See Ew is a popular Thai stir-fried noodle dish made with wide rice noodles, chicken, broccoli, carrots, soy sauce, and oyster sauce. It is a comforting and satisfying dish often enjoyed as a quick meal.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 15 mins',
            ingredients: ['Wide Rice Noodles', 'Chicken', 'Broccoli', 'Carrots', 'Soy Sauce', 'Oyster Sauce'],
            recipeId: 5,
            steps: [
              ' Soak wide rice noodles in warm water until softened, then drain well.',
              ' Heat oil in a wok or skillet and stir-fry sliced chicken until cooked through.',
              ' Add sliced broccoli and carrots to the pan and cook until tender-crisp.',
              ' Add soaked rice noodles to the pan along with soy sauce and oyster sauce.',
              ' Stir-fry until the noodles are heated through and well coated with sauce.',
              ' Serve hot, garnished with sliced green onions.'
            ]
          },
          {
            TH_r_id: 11,
            name: 'Thai Iced Tea',
            type: 'Thai',Description:                'Thai Iced Tea is a sweet and creamy beverage made from Thai tea mix, condensed milk, and ice. It is a refreshing drink commonly enjoyed with meals or as a dessert.',
            serving: 'Serves 2',
            origin: 'Thai',
            CookingTime: 'Preparation: 5 mins, Cooking: 0 mins',
            ingredients: ['Thai Tea Mix', 'Condensed Milk', 'Ice'],
            recipeId: 5,
            steps: [
              ' Brew Thai tea mix in hot water according to package instructions.',
              ' Let the tea cool to room temperature, then chill in the refrigerator.',
              ' Fill glasses with ice cubes and pour chilled tea over the ice.',
              ' Drizzle condensed milk over the tea to taste.',
              ' Stir gently and serve immediately.'
            ]
          },
          {
            TH_r_id: 12,
            name: 'Gaeng Keow Wan Gai',
            type: 'Thai',Description:                'Gaeng Keow Wan Gai, or Green Curry Chicken, is a classic Thai curry known for its vibrant green color and spicy flavor. It is made with chicken, green curry paste, coconut milk, eggplant, bamboo shoots, and Thai basil.',
            serving: 'Serves 4-6',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 25 mins',
            ingredients: ['Chicken', 'Green Curry Paste', 'Coconut Milk', 'Eggplant', 'Bamboo Shoots', 'Thai Basil'],
            recipeId: 5,
            steps: [
              ' Heat green curry paste in a pot until fragrant.',
              ' Add sliced chicken to the pot and cook until no longer pink.',
              ' Stir in coconut milk and bring to a simmer.',
              ' Add sliced eggplant and bamboo shoots to the pot.',
              ' Simmer until the chicken is cooked through and the vegetables are tender.',
              ' Stir in fresh Thai basil leaves just before serving.',
              ' Serve hot with steamed rice.'
            ]
          },
          {
            TH_r_id: 13,
            name: 'Panang Curry',
            type: 'Thai',  Description:                'Panang Curry is a rich and creamy Thai curry made with beef simmered in a flavorful sauce of Panang curry paste, coconut milk, kaffir lime leaves, and sliced red chilies. This curry is known for its bold flavors and spicy kick, balanced by the sweetness of coconut milk.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 10 mins, Cooking: 15 mins',
            CookingTime: 'Preparation: 10 mins, Cooking: 15 mins',
            ingredients: ['Beef', 'Panang Curry Paste', 'Coconut Milk', 'Kaffir Lime Leaves', 'Red Chilies'],
            recipeId: 5,
            steps: [
              ' Heat panang curry paste in a pot until fragrant.',
              ' Add sliced beef to the pot and cook until browned on all sides.',
              ' Stir in coconut milk and bring to a gentle simmer.',
              ' Add torn kaffir lime leaves and sliced red chilies to the pot.',
              ' Simmer until the beef is tender and the flavors meld together.',
              ' Serve hot with steamed rice.'
            ]
          },
          {
            TH_r_id: 14,
            name: 'Papaya Salad',
            type: 'Thai', Description:                'Papaya Salad is a traditional Thai salad made with shredded green papaya, tomatoes, green beans, and chilies, tossed in a tangy dressing of fish sauce, lime juice, and sugar. This refreshing and spicy salad is bursting with flavors and textures, making it a popular dish in Thai cuisine.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins',
            ingredients: ['Green Papaya', 'Tomato', 'Green Beans', 'Chilies', 'Fish Sauce', 'Lime Juice'],
            recipeId: 5,
            steps: [
              ' Peel and shred green papaya into thin strips using a julienne peeler or a knife.',
              ' In a mortar and pestle, pound garlic and chilies into a coarse paste.',
              ' Add shredded papaya, halved cherry tomatoes, and trimmed green beans to the mortar.',
              ' Pound lightly to bruise the vegetables and release their juices.',
              ' Season with fish sauce, lime juice, and sugar, adjusting to taste.',
              ' Serve immediately as a spicy and refreshing salad.'
            ]
          },
          {
            TH_r_id: 15,
            name: 'Khao Soi',
            type: 'Thai',Description:                'Khao Soi is a classic Northern Thai dish consisting of egg noodles in a rich and aromatic curry broth made with coconut milk, red curry paste, and chicken. It is typically served garnished with pickled mustard greens, sliced shallots, and lime wedges, adding layers of flavor and texture to this comforting noodle soup.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 15 mins, Cooking: 20 mins',
            ingredients: ['Egg Noodles', 'Chicken', 'Coconut Milk', 'Curry Paste', 'Lime', 'Pickled Mustard Greens'],
            recipeId: 5,
            steps: [
              ' Cook egg noodles according to package instructions, then drain and set aside.',
              ' In a pot, heat coconut milk and red curry paste until fragrant.',
              ' Add sliced chicken to the pot and cook until no longer pink.',
              ' Stir in chicken broth and bring to a simmer.',
              ' Add cooked egg noodles to serving bowls.',
              ' Ladle the hot curry broth over the noodles.',
              ' Serve hot, garnished with pickled mustard greens, sliced shallots, and lime wedges.'
            ]
          },
          {
            TH_r_id: 16,
            name: 'Larb Gai',
            type: 'Thai',Description:                'Larb Gai is a traditional Thai minced chicken salad flavored with lime juice, fish sauce, shallots, mint, and cilantro. This savory and refreshing salad is served warm or at room temperature, making it a perfect appetizer or main dish in Thai cuisine.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 10 mins, Cooking: 10 mins',
            ingredients: ['Ground Chicken', 'Lime Juice', 'Fish Sauce', 'Shallots', 'Mint', 'Cilantro'],
            recipeId: 5,
            steps: [
              ' In a skillet, cook ground chicken over medium heat until fully cooked and slightly browned.',
              ' Transfer the cooked chicken to a mixing bowl and let it cool slightly.',
              ' Add lime juice, fish sauce, finely chopped shallots, chopped mint, and chopped cilantro to the chicken.',
              ' Mix well to combine all ingredients evenly.',
              ' Taste and adjust seasoning if necessary, adding more lime juice or fish sauce as desired.',
              ' Serve the larb gai warm or at room temperature, garnished with extra herbs if desired.'
            ]
          },
          {
            TH_r_id: 17,
            name: 'Thai Fish Cakes',
            type: 'Thai', Description:                'Thai Fish Cakes are flavorful patties made with blended fish fillets, red curry paste, green beans, and kaffir lime leaves, seasoned with fish sauce. These aromatic fish cakes are fried until golden brown and served hot with a dipping sauce, making them a popular street food snack in Thailand.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 20 mins, Cooking: 10 mins',
            ingredients: ['Fish Fillets', 'Red Curry Paste', 'Green Beans', 'Kaffir Lime Leaves', 'Fish Sauce'],
            recipeId: 5,
            steps: [
              ' In a food processor, blend fish fillets until they form a smooth paste.',
              ' Transfer the fish paste to a mixing bowl and add red curry paste, finely chopped green beans, thinly sliced kaffir lime leaves, and fish sauce.',
              ' Mix well until all ingredients are combined evenly.',
              ' Shape the mixture into small patties or balls with wet hands.',
              ' Heat oil in a skillet over medium heat and fry the fish cakes until golden brown and cooked through.',
              ' Serve the Thai fish cakes hot, with a dipping sauce of your choice.'
            ]
          },
          {
            TH_r_id: 18,
            name: 'Thai Basil Fried Rice', Description:                'Thai Basil Fried Rice is a popular Thai dish made with cooked rice stir-fried with chicken, Thai basil, chilies, fish sauce, and soy sauce. It is known for its aromatic flavors and vibrant colors, with the fragrant Thai basil imparting a distinct taste.',
            serving: 'Serves 2-3',
            origin: 'Thai',
            CookingTime: 'Preparation: 10 mins, Cooking: 15 mins',
            type: 'Thai',
            ingredients: ['Cooked Rice', 'Chicken', 'Thai Basil', 'Chilies', 'Fish Sauce', 'Soy Sauce'],
            recipeId: 5,
            steps: [
              ' Heat oil in a wok or large skillet over medium-high heat.',
              ' Add sliced chicken to the pan and stir-fry until cooked through.',
              ' Push the chicken to one side of the pan and crack eggs into the empty space.',
              ' Scramble the eggs until cooked, then mix with the chicken.',
              ' Add cooked rice to the pan and stir-fry, breaking up any clumps.',
              ' Stir in chopped Thai basil leaves, sliced chilies, fish sauce, and soy sauce.',
              ' Continue to stir-fry until everything is well combined and heated through.',
              ' Serve hot, garnished with additional Thai basil leaves.'
            ]
          },
          {
            TH_r_id: 19,
            name: 'Coconut Soup',
            type: 'Thai', Description:                'Coconut Soup is a classic Thai soup made with coconut milk, mushrooms, galangal, lemongrass, kaffir lime leaves, and chilies. It is known for its rich and aromatic flavor profile, with hints of sweetness from the coconut milk.',
            serving: 'Serves 2-4',
            origin: 'Thai',
            CookingTime: 'Preparation: 10 mins, Cooking: 15 mins',
            ingredients: ['Coconut Milk', 'Mushrooms', 'Galangal', 'Lemongrass', 'Kaffir Lime Leaves', 'Chilies'],
            recipeId: 5,
            steps: [
              ' In a pot, bring coconut milk to a gentle simmer over medium heat.',
              ' Add sliced galangal and bruised lemongrass stalks to infuse the coconut milk with flavor.',
              ' Add sliced mushrooms and torn kaffir lime leaves to the pot.',
              ' Simmer until the mushrooms are tender and the flavors meld together.',
              ' Season with fish sauce, lime juice, and sugar, adjusting to taste.',
              ' Serve the coconut soup hot, garnished with sliced chilies and fresh cilantro leaves.'
            ]
          },
          {
            TH_r_id: 20,
            name: 'Thai Spring Rolls',
            type: 'Thai',Description:                'Thai Spring Rolls are delicious appetizers made with rice paper wrappers filled with shrimp, vegetables, rice noodles, and mint. They are then rolled tightly and served with a flavorful peanut sauce for dipping.',
            serving: 'Makes 8-10 spring rolls',
            origin: 'Thai',
            CookingTime: 'Preparation: 30 mins, Cooking: 10 mins',
            ingredients: ['Rice Paper Wrappers', 'Shrimp', 'Vegetables', 'Rice Noodles', 'Mint', 'Peanut Sauce'],
            recipeId: 5,
            steps: [
              ' Prepare rice noodles according to package instructions, then drain and set aside.',
              ' Dip a rice paper wrapper into warm water to soften, then lay it flat on a clean surface.',
              ' Arrange cooked shrimp, julienned vegetables, and cooked rice noodles on the bottom third of the wrapper.',
              ' Sprinkle chopped mint over the filling ingredients.',
              ' Fold the bottom of the wrapper over the filling, then fold in the sides, and roll tightly to enclose the filling completely.',
              ' Repeat with the remaining wrappers and filling ingredients.',
              ' Serve the Thai spring rolls with peanut sauce for dipping.'
            ]
          }
    ]);
     console.log('Inserted sample recipe data');       
 }
async function showRecipes(db) {
    const recipesCollection = db.collection('recipes');
    // Find all recipes
    const recipes = await recipesCollection.find({}).toArray();
    console.log('\n\nAll Recipes:');
    console.log(recipes);
}

main().catch(console.error);



// Delete recipe API
app.post('/delete-recipe', async (req, res) => {
  try {
      const { Category, recipeName } = req.body;

      console.log('Request body:', req.body);

      if (!Category || !recipeName) {
          return res.status(400).json({ error: 'Missing required fields' });
      }

      const collectionName = `${Category}_recipes`;
      const recipesCollection = db.collection(collectionName);

      // Delete the recipe
      const result = await recipesCollection.deleteOne({ name: recipeName });

      if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Recipe not found' });
      }

      res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Serve the delete.html file
app.get('/delete', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Delete.html'));
});
const storage = multer.memoryStorage(); // Adjust storage as needed
const upload = multer({storage: storage});

// Fetch recipes API
app.get('/api/:category_recipes', async (req, res) => {
  try {
      const category = req.params.category_recipes;
      const recipesCollection = db.collection(category);
      const recipes = await recipesCollection.find({}).toArray();
      res.json(recipes);
  } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Insert recipes API (optional)
app.post('/api/:category_recipes', async (req, res) => {
  try {
      const category = req.params.category_recipes;
      const recipesCollection = db.collection(category);
      await recipesCollection.insertMany(req.body);
      res.status(201).json({ message: 'Recipes inserted successfully' });
  } catch (error) {
      console.error('Error inserting recipes:', error);
      res.status(500).json({ error: 'Failed to insert recipes' });
  }
});

// Edit recipe API
app.post('/edit-recipe', upload.none(), async (req, res) => {
  try {
      const { recipe_name, Category, Description, Serving, CookingTime, Ingredient, Instructions } = req.body;

      console.log('Request body:', req.body);

      // Check if required fields are present
      if (!recipe_name || !Category || !Ingredient || !Instructions) {
          console.error('Missing required fields:', {
              recipe_name,
               Category,
              // Ingredient,
              // Instructions
          });
          return res.status(400).json({ error: 'Missing required fields' });
      }

      const collectionName = `${Category}_recipes`;
      const recipesCollection = db.collection(collectionName);

      // Find and delete the existing recipe
      await recipesCollection.deleteOne({ name: recipe_name });

      // Insert the new recipe details
      const newRecipe = {
          name: recipe_name,
         // Description: Description,
          type: Category,
          origin:Category,
          ingredients: Ingredient,
         description: Description || '',
         serving: Serving ,
         CookingTime : CookingTime ,
          steps: typeof Instructions === 'string' ? Instructions.split('\n') : []
      };

      await recipesCollection.insertOne(newRecipe);

      res.status(200).json({ message: 'Recipe updated/Added successfully' });
  } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Failed to update/add recipe' });
  }
});

 
// const mongoose = require('mongoose');
// // Middleware
// app.use(bodyParser.json());
// app.use(cors());


// // Recipe Schema
// const recipeSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   serving: String,
//   origin: String,
//   cookingTime: String,
//   ingredients: [String],
//   steps: [String]
// });

// const Recipe = mongoose.model('Recipe', recipeSchema);
// const Favorite = mongoose.model('Favorite', recipeSchema); // Reusing the same schema for simplicity

// // Add recipe to favorites
// app.post('/api/favorites', async (req, res) => {
//   try {
//     const favoriteRecipe = new Favorite(req.body);
//     await favoriteRecipe.save();
//     res.status(201).json({ message: 'Recipe added to favorites' });
//   } catch (error) {
//     console.error('Error adding recipe to favorites:', error);
//     res.status(500).json({ error: 'Failed to add recipe to favorites' });
//   }
// });

// // Get all favorite recipes
// app.get('/api/favorites', async (req, res) => {
//   try {
//     const favoriteRecipes = await Favorite.find();
//     res.json(favoriteRecipes);
//   } catch (error) {
//     console.error('Error fetching favorite recipes:', error);
//     res.status(500).json({ error: 'Failed to fetch favorite recipes' });
//   }
// });


