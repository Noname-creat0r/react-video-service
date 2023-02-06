const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
require('dotenv').config({ path: './config.env' });

const app = express();
const port = process.env.SERVER_PORT;
const baseUrl = process.env.BASE_URL;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const videoRoutes = require('./routes/video');
const playlistRouter = require('./routes/playlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 
        'OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes); 
app.use('/user', userRoutes);
app.use('/home', homeRoutes);
app.use('/video', videoRoutes);
app.use('/playlist', playlistRouter);

// Error handling middleware
app.use((error, req, res, next) => {
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(baseUrl)
    .then(result => {
        app.listen(port, () => {
            console.log('App broadcasts on localhost:' + port);
        });
    })
    .catch(err => console.log(err));