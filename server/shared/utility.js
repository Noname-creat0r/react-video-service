const Video = require('../models/Video')
const Like = require('../models/Like')
const Dislike = require('../models/Dislike')
const mongoose = require('mongoose')

exports.updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

exports.handleLikeDislike = async (Model, req) => {
  const author = mongoose.Types.ObjectId(req.body.userId)
  const video = mongoose.Types.ObjectId(req.body.videoId)
  let action = ''

  const isRated = await Model.findOne({
    author,
    video
  })

  if (!isRated) {
    action = 'added'
    const newInstance = new Model({
      author,
      video
    })
    await newInstance.save()
  } else {
    action = 'removed'
    await isRated.remove()
  }

  return {
    model: Model.modelName,
    action
  }
}

exports.updateVideoLikes = async (video, author, action) => {
  const videoId = mongoose.Types.ObjectId(video)
  const authorId = mongoose.Types.ObjectId(author)

  const isDisliked = await Dislike.findOne({
    author: authorId,
    video: videoId
  })

  const videoDoc = await Video
    .findOne({ _id: videoId })
    .populate('author', ['name', 'avatar'])

  if (isDisliked) {
    await isDisliked.remove()
    videoDoc.$inc('dislikes', -1)
  }

  videoDoc.$inc('likes', action === 'added' ? 1 : -1)
  await videoDoc.save()
  return videoDoc.toObject()
}

exports.updateVideoDislikes = async (video, author, action) => {
  const videoId = mongoose.Types.ObjectId(video)
  const authorId = mongoose.Types.ObjectId(author)

  const videoDoc = await Video
    .findOne({ _id: videoId })
    .populate('author', ['name', 'avatar'])

  const isLiked = await Like.findOne({
    author: authorId,
    video: videoId
  })

  if (isLiked) {
    await isLiked.remove()
    videoDoc.$inc('likes', -1)
  }

  videoDoc.$inc('dislikes', action === 'added' ? 1 : -1)
  await videoDoc.save()
  return videoDoc
}

exports.sortByUploadDate = (docsArr, asc) => {
  return docsArr.sort((docA, docB) => {
    if (docA.createdAt > docB.createdAt) return asc ? 1 : -1
    if (docA.createdAt < docB.createdAt) return asc ? -1 : 1
    return 0
  })
}

exports.videoSort = (videosArr, property, asc) => {
  return videosArr.sort((videoA, videoB) => {
    if (videoA[property] > videoB[property]) return asc ? 1 : -1
    if (videoA[property] < videoB[property]) return asc ? -1 : 1
    return 0
  })
}

exports.throwError = (message, code) => {
  const error = new Error(message)
  error.statusCode = code
  throw error
}
