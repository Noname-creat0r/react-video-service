const mongoose = require('mongoose')

const Video = require('../models/Video')
const User = require('../models/User')
const Like = require('../models/Like')
const Dislike = require('../models/Dislike')
const Commentary = require('../models/Commentary')
// const Category = require('../models/Category')
const Playlist = require('../models/Playlist')
const methods = require('../db/methods')

const {
  handleLikeDislike,
  updateVideoLikes,
  updateVideoDislikes,
  sortByUploadDate,
  videoSort,
  throwError
} = require('../shared/utility')

exports.getVideosInfoByUserId = async (req, res, next) => {
  if (!req.query.userId) {
    throwError('Missing param in query', 400)
  }

  const videos = await Video
    .find({
      author: mongoose.Types.ObjectId(req.query.userId)
    })
    .populate('author', ['name', 'avatar'])
    .lean()

  res
    .status(200)
    .json({ videos })
}

exports.getVideoInfoById = async (req, res, next) => {
  if (req.query.videoId) {
    throwError('Missing param in query', 400)
  }

  const video = await Video
    .findOne({ _id: mongoose.Types.ObjectId(req.query.videoId) })
    .populate('author', ['name', 'avatar'])
    .lean()

  res
    .status(200)
    .json({ videos: video })
}

exports.getFilterVideoInfo = async (req, res, next) => {
  const videoName = req.query.videoName
  let videos = await Video
    .find({ title: { $regex: videoName, $options: 'i' } })
    .populate('author', ['name', 'avatar'])
    .lean()

  const filters = req.query.filters
  let filteredVideos = videos
  if (filters) {
    for (const filter of filters) {
      switch (filter.category) {
        case 'Category':
          if (filter.option !== 'Any') {
            filteredVideos = videos.filter(
              (video) => video.category === filter.option
            )
          }
          break

        case 'Sort':
          switch (filter.option) {
            case 'Upload date':
              filteredVideos = videoSort(videos, 'createdAt', false)
              break

            case 'Most likes':
              filteredVideos = videoSort(videos, 'likes', false)
              break
          }
          break

        case 'Type':
          break
      }
      videos = filteredVideos
    }
  }

  res
    .status(200)
    .json({ videos })
}

exports.getHomeVideoInfo = async (req, res, next) => {
  const info = await Video
    .find({})
    .populate('author', ['name', 'avatar'])
    .lean()

  res
    .status(200)
    .json({ videos: info })
}

exports.postVideo = async (req, res, next) => {
  const video = { ...req.files.video[0] }
  const videoFileId = video.id
  const thumbnail = { ...req.files.thumbnail[0] }
  const thumbnailFileId = thumbnail.id

  const mongoVideo = new Video({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    author: mongoose.Types.ObjectId(req.body.userId),
    thumbnail: thumbnailFileId,
    likes: 0,
    dislikes: 0,
    views: 0,
    file: videoFileId,
    length: video.size
  })

  mongoVideo
    .save()
    .then(result => {
      return result.populate('author')
    })
    .then(video => {
      res
        .status(201)
        .json({
          message: 'Posted video successfully',
          video: video.toObject()
        })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      // console.log(err);
      next(err)
    })
}

exports.getVideo = (req, res, next) => {
  try {
    Video.find({ _id: mongoose.Types.ObjectId(req.query.id) })
      .then((video) => {
        if (!video) {
          const error = new Error('No such video.')
          error.statusCode = 404
          throw error
        }
        // console.log(video[0].file.toString());
        return video[0].file
      })
      .then((videoFileId) => {
        return methods
          .getGridBucket('videos')
          .find({ _id: videoFileId })
          .next()
      })
      .then((file) => {
        if (!file) {
          const error = new Error('No such video file.')
          error.statusCode = 500
          throw error
        }

        const videoSize = file.length
        const range = req.headers.range
        /* if (!range){
                    const error = new Error('Requires Range header.');
                    error.statusCode = 400;
                    throw error;
                } */
        if (range) {
          res.writeHead(200, {
            Connection: 'close',
            'Content-Length': videoSize,
            'Content-Type': file.contentType
          })
          methods
            .getGridBucket('videos')
            .openDownloadStreamByName(file.filename)
            .pipe(res)
        } else {
          // const CHUNK_SIZE = 261120;
          const parts = range.replace(/bytes=/, '')
            .split('-')
          const start = parseInt(parts[0], 10)
          const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1
          const contentLength = end - start + 1
          // console.log("start: " + start + ", end: " + end + ', videoSize: ' + videoSize);
          // console.log(videoSize);
          const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': file.contentType
          }

          res.writeHead(206, headers)

          methods
            .getGridBucket('videos')
            .openDownloadStreamByName(file.filename, {
              start,
              end
            })
            .pipe(res)
        }
      })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.postComment = async (req, res, next) => {
  try {
    const newComment = new Commentary({
      author: mongoose.Types.ObjectId(req.body.userId),
      video: mongoose.Types.ObjectId(req.body.videoId),
      text: req.body.text,
      likes: 0,
      dislikes: 0
    })

    const populatedComment = await newComment.populate('author', ['name', 'avatar'])
    await newComment.save()

    res
      .status(201)
      .json({
        message: 'Posted a comment',
        comment: [populatedComment.toObject()]
      })
  } catch (err) {
    next(err)
  }
}

exports.getComments = async (req, res, next) => {
  try {
    let comments = await Commentary
      .find({
        video: mongoose.Types.ObjectId(req.query.videoId)
      })
      .populate('author', ['name', 'avatar'])
      .lean()

    comments = sortByUploadDate(comments)
    res
      .status(201)
      .json({ comments })
  } catch (err) {
    next(err)
  }
}

exports.likeVideo = async (req, res, next) => {
  try {
    const result = await handleLikeDislike(Like, req)
    const updatedVideo = await updateVideoLikes(
      req.body.videoId,
      req.body.userId,
      result.action
    )
    res
      .status(200)
      .json({ video: [updatedVideo] })
  } catch (err) {
    next(err)
  }
}

exports.dislikeVideo = async (req, res, next) => {
  try {
    const result = await handleLikeDislike(Dislike, req)
    const updatedVideo = await updateVideoDislikes(
      req.body.videoId,
      req.body.userId,
      result.action
    )
    res
      .status(200)
      .json({ video: [updatedVideo] })
  } catch (err) {
    next(err)
  }
}

exports.postView = async (req, res, next) => {
  try {
    const videoId = req.body.videoId
    const token = req.body.token
    const trialVideos = req.body.trialVideos
    if (!token) {
      if (!trialVideos) {
        throwError('Missing param in body', 400)
      }
      if (Number(trialVideos) <= 0) {
        throwError('Sign in to watch unlimited number of videos!', 403)
      }
    }

    if (!videoId) {
      throwError('Missing param in body!', 400)
    }

    const video = await Video.findOne({
      _id: mongoose.Types.ObjectId(videoId)
    })
    video.$inc('views', 1)
    await video.save()

    res
      .status(200)
      .json({
        message: 'Viewed a video.',
        trialVideos: trialVideos ? Number(trialVideos) - 1 : 0
      })
  } catch (err) {
    next(err)
  }
}

exports.putVideo = async (req, res, next) => {
  try {
    if (!req.body.videoId) {
      throwError('Missing param in body', 400)
    }

    const videoId = mongoose.Types.ObjectId(req.body.videoId)
    const video = await Video.findOne({ _id: videoId })

    if (!video) {
      throwError('There is no such video to edit', 400)
    }

    const haveFiles = Array.isArray(req.files)
    let thumbnail, videoFile
    if (haveFiles) {
      thumbnail = req.files.find((file) => file.fieldname === 'thumbnail')
      videoFile = req.files.find((file) => file.fieldname === 'video')
    }

    await video.updateOne({
      title: req.body.title || video.title,
      description: req.body.description || video.description,
      category: req.body.category || video.category,
      thumbnail: thumbnail ? thumbnail.id : video.thumbnail,
      video: videoFile ? videoFile.id : video.file
    })

    await video.save()
    const updatedVideo = await Video
      .findOne({ _id: videoId })
      .populate('author', ['name', 'avatar'])
      .lean()

    res.status(200)
      .json({
        message: 'Updated a video',
        video: [updatedVideo]
      })
  } catch (error) {
    next(error)
  }
}

exports.deleteVideo = async (req, res, next) => {
  try {
    if (!req.query.videoId) throwError('Missing param in query.', 400)

    const videoId = mongoose.Types.ObjectId(req.query.videoId)
    const video = await Video.findOne({ _id: videoId })

    if (!video) {
      throwError('There is no such video to delete', 400)
    }

    await video.delete()
    await Like.deleteMany({ video: videoId })
    await Dislike.deleteMany({ video: videoId })

    for await (const playlist of Playlist.find()) {
      const deletedVideoId = playlist.videos.findIndex(
        (video) => videoId === video._id
      )
      if (deletedVideoId !== -1) {
        playlist.videos.splice(deletedVideoId, 1)
        await playlist.save()
      }
    }

    for await (const user of User.find()) {
      const deletedVideoId = user.playlistBookmarks.findIndex(
        (bookmark) => bookmark.video._id === videoId
      )
      if (deletedVideoId !== -1) { user.playlistBookmarks.splice(deletedVideoId, 1) }
      await user.save()
    }

    res
      .status(200)
      .json({
        message: 'Deleted a video',
        videoId: req.query.videoId
      })
  } catch (error) {
    next(error)
  }
}
