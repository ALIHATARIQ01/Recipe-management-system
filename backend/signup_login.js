const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const LogInCollection = require("./signup"); // Ensure this path is correct for your project structure
const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect("mongodb+srv://AlihaTariq:aliha123@alihatariq.iex4sks.mongodb.net/?retryWrites=true&w=majority&appName=AlihaTariq", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, '/HtmlFiles');
const publicPath = path.join(__dirname, '/HtmlFiles');

app.use(express.static(publicPath));

// Set Content Security Policy headers to allow font loading
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://localhost:3000");
    next();
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(templatePath, 'signup.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(templatePath, 'login.html'));
});

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    };

    try {
        const checking = await LogInCollection.findOne({ name: req.body.username });
        if (checking) {
            res.send("User details already exist");
        } else {
            await LogInCollection.create(data);
            res.status(201).sendFile(path.join(templatePath, 'home.html'));
        }
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("An error occurred during signup. Please try again.");
    }
});

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection.findOne({ name: req.body.username });
        if (!check) {
            return res.status(404).send("User not found");
        }
        if (check.password === req.body.password) {
            if (check.email === "alihatariq01@gmail.com") {
                return res.status(201).sendFile(path.join(templatePath, 'home-ad.html'));
            } else {
                return res.status(201).sendFile(path.join(templatePath, 'home.html'));
            }
        } else {
            return res.status(401).send("Incorrect password");
        }
    } catch (error) {
        console.error("Error during login: ", error);
        return res.status(500).send("An error occurred during login. Please try again.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = LogInCollection;


















// const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");
// const LogInCollection = require("./signup"); // Ensure this path is correct for your project structure
// const app = express();
// const port = process.env.PORT || 3000;

// // MongoDB Connection
// mongoose.connect("mongodb+srv://AlihaTariq:aliha123@alihatariq.iex4sks.mongodb.net/?retryWrites=true&w=majority&appName=AlihaTariq", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected..."))
//     .catch(err => console.error("MongoDB connection error:", err));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// const templatePath = path.join(__dirname, '/HtmlFiles');
// const publicPath = path.join(__dirname, '/HtmlFiles');

// app.use(express.static(publicPath));

// // Set Content Security Policy headers to allow font loading
// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://localhost:3000");
//     next();
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(templatePath, 'signup.html'));
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(templatePath, 'login.html'));
// });

// app.post('/signup', async (req, res) => {
//     const data = {
//         name: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         confirm_password: req.body.confirm_password
//     };

//     try {
//         const checking = await LogInCollection.findOne({ name: req.body.username });
//         if (checking) {
//             res.send("User details already exist");
//         } else {
//             await LogInCollection.create(data);
//             res.status(201).sendFile(path.join(templatePath, 'home.html'));
//         }
//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(500).send("An error occurred during signup. Please try again.");
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const check = await LogInCollection.findOne({ name: req.body.username });
//         if (!check) {
//             return res.status(404).send("User not found");
//         }
//         if (check.password === req.body.password) {
//             return res.status(201).sendFile(path.join(templatePath, 'home.html'));
//         } else {
//             return res.status(401).send("Incorrect password");
//         }
//     } catch (error) {
//         console.error("Error during login: ", error);
//         return res.status(500).send("An error occurred during login. Please try again.");
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

// module.exports = LogInCollection;
