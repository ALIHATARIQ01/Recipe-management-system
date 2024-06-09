const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://AlihaTariq:aliha123@alihatariq.iex4sks.mongodb.net/?retryWrites=true&w=majority&appName=AlihaTariq", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Mongoose connected to MongoDB Atlas');
// })
// .catch((error) => {
//     console.error('Error connecting to MongoDB Atlas:', error.message);
// });

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    }
});

const LogInCollection = mongoose.model('LogInCollection', logInSchema);
console.log("Schema defined");

// Insert a sample document to ensure the collection is created
// const sampleData = new LogInCollection({
//     name: 'Sample User',
//     email: 'sampleuser@example.com',
//     password: 'samplepassword',
//     confirm_password: 'samplepassword'
// });



module.exports = LogInCollection;
