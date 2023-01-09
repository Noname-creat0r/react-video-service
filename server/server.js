const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const multer= require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/tmp/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const app = express();
const port = 8080;
const baseUrl = "mongodb://127.0.0.1:27017/ReactVideoService";

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const videoRoutes = require('./routes/video');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(multer({ storage: fileStorage })
    .fields([
        { name: 'video', maxCount: 1 },
        { name : 'thumbnail', maxCount: 1}
    ])
);
app.use('./public/tmp', express.static(path.join(__dirname, '/public/tmp')));

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