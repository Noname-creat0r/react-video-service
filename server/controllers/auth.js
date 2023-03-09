const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const { throwError } = require('../shared/utility')

const User = require('../models/User')

const key = process.env.KEY

exports.initGuest = (req, res, next) => {
  const trialVideos = process.env.DEFAULT_TRIAL_VIDEOS
  if (!trialVideos) {
    throwError('Cannot procces the guest. Config error.', 500)
  }

  res
    .status(200)
    .json({ trialVideos: Number(trialVideos) })
}

exports.signup = async (req, res, next) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    if (!email || !password || !name || !req.file) {
      throwError('Fill in all the form inputs !', 400)
    }

    const avatarId = req.file.id
    const isSignedUp = await User.findOne({ email })

    if (isSignedUp) {
      throwError('There is signed up user with this email!', 403)
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    if (!hashedPassword) {
      throwError('Cannot unlock password...', 500)
    }

    const userData = {
      email,
      password: hashedPassword,
      name,
      avatar: avatarId
    }

    const user = await User.create({ ...userData })
    await user.save()

    res
      .status(201)
      .json({
        message: 'New user has been signed up successfully.',
        userId: user._id
      })
  } catch (error) {
    next(error)
  }
}

exports.signin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser

  console.log(req.ip)
  User
    .findOne({ email })
    .then((user) => {
      if (!user) {
        throwError('User with email: ' + email + ' could not be found.', 401)
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        throwError('Wrong password for ' + email, 401)
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        key
      )

      const expirationDate = new Date()
        .getTime() + 8639998
      res
        .status(200)
        .json({
          token,
          userId: loadedUser._id.toString(),
          expiresIn: expirationDate
        })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
