const Types = require('mongoose').Types

const Playlist = require('../models/Playlist')
const { throwError } = require('../shared/utility')

exports.getPlaylists = async (req, res, next) => {
  try {
    // let playlists
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getUserPlaylists = async (req, res, next) => {
  try {
    if (!req.query.userId) {
      throwError('Missing query param!', 400)
    }

    const userPlaylists = await Playlist
      .find({ author: Types.ObjectId(req.query.userId) })
      .populate('videos')
      .lean()

    const message = `User ${req.query.userId} has ${userPlaylists.length} playlists at the moment.`

    res
      .status(200)
      .json({
        message,
        playlists: userPlaylists
      })
  } catch (error) {
    next(error)
  }
}

// unused
exports.getPlaylistVideoInfo = async (req, res, next) => {
  try {
    if (!req.query.playlistId) {
      throwError('Missing query param!', 400)
    }

    const playlist = await Playlist
      .findOne({ _id: Types.ObjectId(req.query.playlistId) })
      .populate('videos')
      .populate('author', ['name', 'avatar'])
      .lean()

    res
      .status(200)
      .json({
        message: 'Fetched playlist videos inforamtion successfully',
        playlist: [playlist]
      })
  } catch (error) {
    next(error)
  }
}

exports.postPlaylist = async (req, res, next) => {
  try {
    const thumbnailFileId = req.file.id
    if (!req.body.title || !req.body.userId) {
      throwError('Missing query param', 400)
    }

    const newPlaylist = new Playlist({
      author: Types.ObjectId(req.body.userId),
      title: req.body.title,
      description: req.body.description,
      thumbnail: thumbnailFileId
    })

    await newPlaylist.save()
    res
      .status(201)
      .json({
        playlist: newPlaylist.toObject(),
        message: 'New playlist was posted.'
      })
  } catch (error) {
    next(error)
  }
}

exports.putPlaylist = async (req, res, next) => {
  try {
    if (!req.body.playlistId) {
      throwError('Missing query param!', 400)
    }

    const haveFiles = Array.isArray(req.files)

    const playlist = await Playlist.findOne({
      _id: Types.ObjectId(req.body.playlistId)
    })

    await playlist.updateOne({
      title: req.body.title || playlist.title,
      description: req.body.description || playlist.description,
      thumbnail: haveFiles && req.files.length > 0 ? req.files[0].id : playlist.thumbnail
    })

    if (req.body.videoId) {
      const id = playlist.videos.findIndex(
        video => video._id.toString() === req.body.videoId
      )
      id === -1
        ? playlist.videos.push({
          _id: Types.ObjectId(req.body.videoId)
        })
        : playlist.videos.splice(id, 1)
    }

    await playlist.save()

    const updatedPlaylist = await Playlist
      .findOne({ _id: playlist._id })
      .populate('videos')
      .lean()

    res
      .status(200)
      .json({
        message: 'Added a video to playlist.',
        updatedPlaylist
      })
  } catch (error) {
    next(error)
  }
}

exports.deletePlaylist = async (req, res, next) => {
  try {
    if (!req.query.playlistId) {
      throwError('Missing query param!', 400)
    }

    const playlist = await Playlist.findOne({
      _id: Types.ObjectId(req.query.playlistId)
    })

    playlist.delete()
    if (playlist.$isDeleted) {
      res
        .status(200)
        .json({
          message: 'Playlist has been deleted',
          playlistId: req.query.playlistId
        })
    } else {
      res
        .status(404)
        .json({
          message: 'There is no playlist with this id'
        })
    }
  } catch (error) {
    next(error)
  }
}
