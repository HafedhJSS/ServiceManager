const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 by default
//database connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testpfe', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('MongoDB connected successfully');
});


// paths
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 
app.get('/Login', (req, res) => {
    res.send('Login page ');
});
app.get('/Signup', (req, res) => {
    res.send('Signup page ');
});
app.get('/Request', (req, res) => {
    res.send('Request page');
}); 


// Start the server
//node server.js
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
