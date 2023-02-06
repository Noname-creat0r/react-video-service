const User = require('../models/User');
const Playlist = require('../models/Playlist');

exports.fetchData = (req, res, next) => {
    const userId = req.query.userId.toString();
    console.log(userId);
    User.findOne({_id: userId})
        .then(user => {
            if (!user){
                const error = new Error('Could not find user.');
                error.statusCode = 404;
                throw error;
            }
            // More to fetch soon
            const data = {
                name: user.name,
            }
            console.log({ message: 'User data fetched. ', data: data});
            res.status(200).json({ message: 'User data fetched. ', data: data});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

