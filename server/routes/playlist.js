const express = require('express');
const {body} = require('express-validator');

const isAuth = require('../middleware/is-auth');
const playlistController = require('../controllers/playlist');

const router = express.Router();

router.get(
    '/playlist:id',
    playlistController.getPlaylist
)

router.get(
    '/playlists',
    playlistController.getPlaylist
)

router.post(
    '/playlist',
    isAuth,
    playlistController.postPlaylist
)

module.exports = router;
