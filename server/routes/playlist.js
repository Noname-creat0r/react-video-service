const express = require('express');
const {body} = require('express-validator');

const storage = require('../db/storage');
const isAuth = require('../middleware/is-auth');
const playlistController = require('../controllers/playlist');

const router = express.Router();

router.get(
    '/info:playlistId?',
    playlistController.getPlaylistVideoInfo,
)

router.get(
    ':userId?',
    playlistController.getUserPlaylists
)

router.get(
    '/',
    playlistController.getPlaylists
)

router.post(
    '/',
    isAuth,
    storage.upload.single('thumbnail'),
    playlistController.postPlaylist
)

router.put(
    '/',
    isAuth,
    storage.upload.any(),
    playlistController.putPlaylist,
)

router.delete(
    '/',
    isAuth,
    playlistController.deletePlaylist,
)
module.exports = router;
