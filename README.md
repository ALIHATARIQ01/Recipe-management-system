

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

The Recipe Management System is a web application that allows users to browse, search, and favorite recipes. The system includes two interfaces: one for users and one for administrators. Administrators can add, delete, and edit recipes, while users can view and favorite recipes. This system aims to provide a comprehensive and user-friendly platform for managing and discovering recipes.

## Features

### User Interface
- View a list of recipes categorized by cuisine.
- Search recipes based on a substring.
- Favorite recipes by clicking on a heart button.
- View detailed information about each recipe including ingredients and cooking steps.

### Admin Interface
- Sign up and log in as an admin.
- Add new recipes to the database.
- Edit existing recipes.
- Delete recipes from the database.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB

- **Tools and Libraries:**
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
       mongoURI: 'mongodb+srv://AlihaTariq:<passward>@alihatariq.iex4sks.mongodb.net/?retryWrites=true&w=majority&appName=AlihaTariq',
       dbName: 'recipe'
   };
   ```

4. **Start the server:**
   ```sh
   node server.js
   ```

5. **Open the application:**
   - User Interface: Open `public/recipes_user.html` in your browser.
   - Admin Interface: Open `public/admin.html` in your browser.

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

- **Get Recipe by ID**
  - `GET /api/recipes/:id`
  - Fetch a specific recipe by its ID.

- **Search Recipes**
  - `GET /api/search`
  - Search recipes based on a substring.

### Admin Endpoints

- **Add Recipe**
  - `POST /api/admin/recipes`
  - Add a new recipe to the database.

- **Edit Recipe**
  - `PUT /api/admin/recipes/:id`
  - Edit an existing recipe by its ID.

- **Delete Recipe**
  - `DELETE /api/admin/recipes/:id`
  - Delete a recipe by its ID.

### Favorite Endpoints

- **Add to Favorites**
  - `POST /api/favorites`
  - Add a recipe to the user's favorites.

- **Get Favorite Recipes**
  - `GET /api/favorites`
  - Fetch all favorite recipes of the user.

- **Delete from Favorites**
  - `DELETE /api/favorites/:id`
  - Remove a recipe from the user's favorites.

