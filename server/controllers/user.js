const User = require('../models/User');

exports.fetchData = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
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
            res.statuts(200).json({ message: 'User data fetched. ', data: data});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};