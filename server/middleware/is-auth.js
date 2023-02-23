const jwt = require('jsonwebtoken');

const key = process.env.KEY;

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')
        if (!authHeader) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader;
        const decodedToken = jwt.verify(token, key);
       
        if (!decodedToken) {
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
        }
        
        req.userId = decodedToken.userId;
        res.locals.userId = decodedToken.userId;
        next();
        
    } catch (error) {
        next(error);
    }
};