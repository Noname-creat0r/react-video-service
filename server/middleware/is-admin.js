const User = require('../models/User');
const Types = require('mongoose').Types;

module.exports = async (req, res, next) => {
    try {
        const userId = res.locals.userId;

        if (!userId) {
            const error = new Error('Missing userId.');
            error.statusCode = 401;
            throw error;
        }
        
        //console.log(req.connection.remoteAddress);
        const user = await User.findOne({
            _id: Types.ObjectId(userId)
        });

        if (user.type !== 'Admin'){
            const error = new Error('User is not an admin.')
            error.statusCode = 403;
            throw error;
        }

        next();
        
    } catch (error) {
        next(error);
    }
}