const Types = require('mongoose').Types;

const Playlist = require('../models/Playlist');
const { insertVideoInfoInPlaylist, insertAuthorNames } = require('../shared/utility');

exports.getPlaylists = async (req, res, next) => {
    try {
        let playlists 
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.getUserPlaylists = async (req, res, next) => {
    try {
        if (!req.query.userId){
            const error = new Error('Missing userd id in query param!');
            error.statusCode = 400;
            throw error;
        }

        let userPlaylists = await Playlist.find({
            author: Types.ObjectId(req.query.userId)
        }).lean();
        
        const informedPlaylists = [];
        for await (let playlist of userPlaylists){
            playlist = await insertVideoInfoInPlaylist(playlist);
            informedPlaylists.push(playlist);
        }
        //console.log(informedPlaylists);
        //userPlaylists = await insertVideoInfoInPlaylist(userPlaylists);

        const message = `User ${req.query.userId} has ${userPlaylists.length} playlists at the moment.`;
        
        
        res.status(200).json({
            message: message,
            playlists: informedPlaylists
        });

    } catch (error) {
        //console.log(error);
        next(error);
    }
};

exports.getPlaylistVideoInfo = async (req, res, next) => {
    try {
        if (!req.query.playlistId) {
            const error = new Error('Missing playlist id in query param!');
            error.statusCode = 400;
            throw error;
        }
        let playlist = await Playlist.findOne({
            _id: Types.ObjectId(req.query.playlistId)
        }).lean();

        playlist = await insertVideoInfoInPlaylist(playlist);
        playlist = await insertAuthorNames([playlist]);
        //console.log(playlist);

        res.status(200).json({
            message: 'Fetched playlist videos inforamtion successfully',
            playlist: playlist,
        })
    } catch(error) {
        //console.log(error);
        next(error);
    }
};

exports.postPlaylist = async (req, res, next) => {
    try {
        //console.log(req.file);
        const thumbnailFileId = req.file.id;
        if (!req.body.title || !req.body.userId){
            const error = new Error('Missing querry params!');
            error.statusCode = 400;
            throw error;
        }

        const newPlaylist = new Playlist({
            author: Types.ObjectId(req.body.userId),
            title: req.body.title,
            description: req.body.description,
            thumbnail: thumbnailFileId,
        });
        //console.log(newPlaylist.toJSON());
        await newPlaylist.save();
        res.status(201).json({
            playlist: newPlaylist.toObject(),
            message: 'New playlist was posted.'
        });

    } catch(error) {
        console.log(error);
        next(error);
    }
};

exports.addVideoToPlaylist = async (req, res, next) => {
    try {
        
    } catch(error) {
        next(error);
    }
};

exports.putPlaylist = async (req, res, next) => {
    try {
        if (!req.body.playlistId){
            const error = new Error('Missing querry params!');
            error.statusCode = 400;
            throw error;
        }
        
        let playlist = await Playlist.findOne({
            _id: Types.ObjectId(req.body.playlistId)
        });

        if (req.body.videoId){
            const id = playlist.videos.findIndex((video) => 
                video._id.toString() ===  req.body.videoId);
            id === -1 ?
                playlist.videos.push({
                    _id: Types.ObjectId(req.body.videoId)
                }) : 
                playlist.videos.splice(id, 1);
        }

        await playlist.save();
        playlist = await insertVideoInfoInPlaylist(playlist.toObject());

        res.status(200).json({
            message: 'Added a video to playlist.',
            playlist: playlist,
        });

    } catch (error){
        console.log(error);
        next(error);
    }
};

exports.deletePlaylist = async (req, res, next) => {
    try {
        if (!req.query.playlistId){
            const error = new Error('Missing querry params!');
            error.statusCode = 400;
            throw error;
        }

        const playlist = await Playlist.findOne({ 
            _id: Types.ObjectId(req.query.playlistId)
        });

        playlist.delete();
        if (playlist.$isDeleted)
            res.status(200).json({
                message: 'Playlist has been deleted',
                playlistId: req.query.playlistId
            });
        else res.status(404).json({
            message: 'There is no playlist with this id',
        });
        
    } catch (error){
        //console.log(error);
        next(error);
    }
}