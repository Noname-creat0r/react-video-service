const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');

const app = express();
const port = 8080;
const baseUrl = "mongodb://127.0.0.1:27017/ReactVideoService";

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use (bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 
        'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes); 
app.use('/user', userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(baseUrl)
    .then(result => {
        app.listen(port);

    })
    .catch(err => console.log(err));