# Recipe Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Recipe Management System is a comprehensive web application designed to facilitate the management and discovery of recipes. It provides two interfaces: one for users and one for administrators. The system allows for full CRUD (Create, Read, Update, Delete) operations on recipes, making it a robust platform for both managing and exploring culinary content.

## Features

### User Interface
- **View Recipes**: Browse through a categorized list of recipes.
- **Search Recipes**: Search for recipes using a substring in the search bar.
- **Favorite Recipes**: Mark recipes as favorites by clicking the heart button.

### Admin Interface
- **Sign Up and Log In**: Secure access for administrators to manage recipes.
- **Add Recipes**: Create new recipes with details like name, description, ingredients, and steps.
- **Edit Recipes**: Modify existing recipes to keep the information up-to-date.
- **Delete Recipes**: Remove recipes from the database permanently.

## Technologies Used

- **Frontend**:
  - HTML
  - CSS
  - JavaScript

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB

- **Tools and Libraries**:
  - Body-parser
  - Cors
  - MongoDB Native Driver

## Project Structure

```bash
.
├── config.js
├── package.json
├── public
│   ├── home.html
│   ├── recipes.html
│   ├── recipes.css
│   ├── recipes_user.html
│   └── admin.html
├── routes
│   └── api.js
├── server.js
└── README.md
```

## Setup and Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ALIHATARIQ01/recipe-management-system.git
   cd recipe-management-system
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `config.js` file:**
   ```javascript
   module.exports = {
       mongoURI: 'mongodb+srv://AlihaTariq:aliha123@alihatariq.iex4sks.mongodb.net/?retryWrites=true&w=majority&appName=AlihaTariq',
       dbName: 'recipe'
   };
   ```

4. **Start the server:**
   ```sh
   node server.js
   ```

5. **Open the application:**
   - **User Interface**: Open `home_user.html` in your browser.
   - **Admin Interface**: Open `home-ad.html` in your browser.

## Usage

### User Interface

1. **Viewing Recipes:**
   - Navigate to the homepage to see a list of recipes categorized by cuisine.
   - Click on a cuisine to view recipes of that category.

2. **Searching Recipes:**
   - Use the search bar to find recipes based on a substring.

3. **Favoriting Recipes:**
   - Click on the heart button on any recipe card to add it to your favorites.

### Admin Interface

1. **Sign Up/Log In:**
   - Admins need to sign up and log in to access admin features.

2. **Adding Recipes:**
   - Use the form to add new recipes, including name, description, ingredients, steps, and other details.

3. **Editing Recipes:**
   - Select a recipe to edit its details.

4. **Deleting Recipes:**
   - Remove a recipe from the database by selecting the delete option.

## API Endpoints

### Recipe Endpoints

- **Get All Recipes**
  - `GET /api/recipes`
  - Fetch all recipes from the database.
  - **Response Example:**
    ```json
    [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Spaghetti Carbonara",
        "description": "A classic Italian pasta dish",
        "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese"],
        "steps": ["Boil pasta", "Fry pancetta", "Mix all ingredients"],
        "serving": 4,
        "origin": "Italy",
        "cookingTime": "30 minutes"
      }
    ]
    ```

- **Get Recipe by ID**
  - `GET /api/recipes/:id`
  - Fetch a specific recipe by its ID.
  - **Response Example:**
    ```json
    {
      "_id": "60d21b4667d0d8992e610c85",
      "name": "Spaghetti Carbonara",
      "description": "A classic Italian pasta dish",
      "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese"],
      "steps": ["Boil pasta", "Fry pancetta", "Mix all ingredients"],
      "serving": 4,
      "origin": "Italy",
      "cookingTime": "30 minutes"
    }
    ```

- **Search Recipes**
  - `GET /api/search`
  - Search recipes based on a substring.
  - **Request Example:**
    ```sh
    GET /api/search?query=carbonara
    ```
  - **Response Example:**
    ```json
    [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Spaghetti Carbonara",
        "description": "A classic Italian pasta dish",
        "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese"],
        "steps": ["Boil pasta", "Fry pancetta", "Mix all ingredients"],
        "serving": 4,
        "origin": "Italy",
        "cookingTime": "30 minutes"
      }
    ]
    ```

### Admin Endpoints

- **Add Recipe**
  - `POST /api/admin/recipes`
  - Add a new recipe to the database.
  - **Request Example:**
    ```json
    {
      "name": "Spaghetti Carbonara",
      "description": "A classic Italian pasta dish",
      "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese"],
      "steps": ["Boil pasta", "Fry pancetta", "Mix all ingredients"],
      "serving": 4,
      "origin": "Italy",
      "cookingTime": "30 minutes"
    }
    ```

- **Edit Recipe**
  - `PUT /api/admin/recipes/:id`
  - Edit an existing recipe by its ID.
  - **Request Example:**
    ```json
    {
      "name": "Spaghetti Carbonara Updated",
      "description": "A classic Italian pasta dish with a twist",
      "ingredients": ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese", "Garlic"],
      "steps": ["Boil pasta", "Fry pancetta", "Mix all ingredients"],
      "serving": 4,
      "origin": "Italy",
      "cookingTime": "30 minutes"
    }
    ```

- **Delete Recipe**
  - `DELETE /api/admin/recipes/:id`
  - Delete a recipe by its ID.
  - **Response Example:**
    ```json
    {
      "message": "Recipe removed successfully"
    }
    ```

### Favorite Endpoints

- **Add to Favorites**
  - `POST /api/favorites`
  - Add a recipe to the user's favorites.
  - **Request Example:**
    ```json
    {
      "recipeId": "60d21b4667d0d8992e610c85",
      "name": "Spaghetti Carbonara",
      "description": "A classic Italian pasta dish"
    }
    ```

- **Get Favorite Recipes**
  - `GET /api/favorites`
  - Fetch all favorite recipes of the user.
  - **Response Example:**
    ```json
    [
      {
        "_id": "60d21b4667d0d8992e610c85",
        "name": "Spaghetti Carbonara",
        "description": "A classic Italian pasta dish"
      }
    ]
    ```

- **Delete from Favorites**
  - `DELETE /api/favorites/:id`
  - Remove a recipe from the user's favorites.
  - **Response Example:**
    ```json
    {
      "message": "Recipe removed from favorites"
    }
    ```

 
