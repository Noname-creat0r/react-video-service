const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const key = process.env.KEY;

exports.signup = (req, res, next) => {
    // validation

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt
        .hash(password, 12)
        .then(hasshedPassword => {
            const user = new User({
                email: email,
                password: hasshedPassword,
                name: name
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({message: 'New user has been signed up successfully.',
                userId: result._id});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
};

exports.signin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    /* TODO: - Check the local storage for server to look for 
             existing token to prevent signin if user hase already been
             signed in. 
             - Avatar uploading */

    User.findOne({email: email})
        .then((user) => {
            if (!user){
                const error = new Error('User with email: '+ email +' could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password for ' + email);
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                key,
            );

            const expirationDate = new Date().getTime() + 8639998;
            res.status(200).json({
                token: token,
                userId: loadedUser._id.toString(),
                expiresIn: expirationDate,
            });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};