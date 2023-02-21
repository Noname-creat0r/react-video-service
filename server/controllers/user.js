const User = require('../models/User');
const Playlist = require('../models/Playlist');
const Types = require('mongoose').Types;

exports.fetchData = (req, res, next) => {
    const userId = req.query.userId.toString();
    //console.log(userId);
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
                type: user.type,
                playlistBookmarks: user.playlistBookmarks,
            }
           // console.log({ message: 'User data fetched. ', data: data});
            res.status(200).json({ message: 'User data fetched. ', data: data});
        })
        .catch(err => {
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.putPlaylistBookmark = async (req, res, next) => {
    if (!req.body.videoId || !req.body.playlistId ||
        !req.body.userId){
        const error = new Error('Missing param in body.');
        error.statusCode(400);
        throw error;
    }
    
    try {
        const user = await User.findOne({
            _id: Types.ObjectId(req.body.userId)}
        );

        const bookmarks = user.playlistBookmarks;
        console.log(bookmarks);
        const markId = bookmarks.findIndex(bookmark =>
            bookmark.playlist === req.body.playlistId);
        if (markId > -1)
            bookmarks[markId].video = Types.ObjectId(req.body.videoId);
        else {
            bookmarks.push({
                playlist: Types.ObjectId(req.body.playlistId),
                video: Types.ObjectId(req.body.videoId),
            });
        }
        user.save();

        res.status(200).json({
            message: 'Playlist bookmarked',
            user: user.toObject(),
        });
        
    } catch(error) {
        console.log(error);
        next(error);
    }
};