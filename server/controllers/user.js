const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Playlist = require('../models/Playlist')
const Types = require('mongoose').Types
const UserType = require('../models/UserType')

const { throwError } = require('../shared/utility')

exports.fetchData = async (req, res, next) => {
  try {
    const userId = req.query.userId
    // console.log(userId);
    const user = await User.findOne({ _id: Types.ObjectId(userId) })
    // console.log(user);

    if (!user) {
      const error = new Error('Could not find user.')
      error.statusCode = 404
      throw error
    }

    const data = {
      name: user.name,
      type: user.type,
      avatar: user.avatar,
      playlistBookmarks: user.playlistBookmarks
    }

    res.status(200)
      .json({
        message: 'User data fetched. ',
        data
      })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.fetchAll = async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .lean()

    res
      .status(200)
      .json({
        users
      })
  } catch (error) {
    // console.log(error);
    next(error)
  }
}

exports.postUser = async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password ||
        !req.body.userType) {
      throwError('Missing body param', 400)
    }

    const user = await User.findOne({ email: req.body.email })
    if (user) {
      throwError('This user has already been posted', 404)
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    if (!hashedPassword) {
      throwError('Cannot unlock password...', 500)
    }

    const newUser = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      type: req.body.userType,
      avatar: req.file.id
    })

    await newUser.save()
    res
      .status(201)
      .json({
        message: 'Created a new user',
        user: newUser.toObject()
      })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.query.userId) {
      throwError('Missing query param', 400)
    }

    const user = await User.findOne({ _id: Types.ObjectId(req.query.userId) })
    await Playlist.deleteMany({ author: Types.ObjectId(req.query.userId) })

    user.delete()
    if (user.$isDeleted) {
      res
        .status(200)
        .json({
          message: 'Deleted a user',
          id: req.query.userId
        })
    } else {
      res
        .status(404)
        .json({
          message: 'There is no such user to delete'
        })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.putUser = async (req, res, next) => {
  try {
    if (!req.body.userId) {
      throwError('Missing query param!', 400)
    }

    const haveFiles = Array.isArray(req.files)

    const user = await User.findOne({
      _id: Types.ObjectId(req.body.userId)
    })

    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    if (!hashedPassword) {
      throwError('Cannot unlock password...', 500)
    }

    await user.updateOne({
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      password: hashedPassword || user.password,
      type: req.body.userType || user.type,
      avatar: haveFiles && req.files.length > 0 ? req.files[0].id : user.avatar
    })

    await user.save()

    const updatedUser = await User
      .findOne({ _id: user._id })
      .lean()

    res
      .status(200)
      .json({
        message: 'Updated a user',
        user: updatedUser
      })
  } catch (error) {
    next(error)
  }
}

exports.putPlaylistBookmark = async (req, res, next) => {
  try {
    if (!req.body.videoId || !req.body.playlistId ||
            !req.body.userId) {
      const error = new Error('Missing param in body.')
      error.statusCode = 400
      throw error
    }

    const user = await User.findOne({ _id: Types.ObjectId(req.body.userId) })

    const bookmarks = user.playlistBookmarks
    // console.log(bookmarks);
    const markId = bookmarks.findIndex(bookmark =>
      bookmark.playlist.toString() === req.body.playlistId)
    if (markId > -1) {
      bookmarks[markId].video = Types.ObjectId(req.body.videoId)
    } else {
      bookmarks.push({
        playlist: Types.ObjectId(req.body.playlistId),
        video: Types.ObjectId(req.body.videoId)
      })
    }
    user.save()

    res.status(200)
      .json({
        message: 'Playlist bookmarked',
        user: user.toObject()
      })
  } catch (error) {
    next(error)
  }
}
