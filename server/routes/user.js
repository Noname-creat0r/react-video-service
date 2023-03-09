const express = require('express')

const isAuth = require('../middleware/is-auth')
const isAdmin = require('../middleware/is-admin')
const userController = require('../controllers/user')
const storage = require('../db/storage')

const router = express.Router()

router.get(
  '/get',
  isAuth,
  userController.fetchData
)

router.get(
  '/all',
  isAuth,
  isAdmin,
  userController.fetchAll
)

router.post(
  '/',
  isAuth,
  isAdmin,
  storage.upload.single('avatar'),
  userController.postUser
)

router.put(
  '/',
  isAuth,
  isAdmin,
  storage.upload.any(),
  userController.putUser
)

router.delete(
  '/',
  isAuth,
  isAdmin,
  userController.deleteUser
)

router.put(
  '/bookmark',
  isAuth,
  userController.putPlaylistBookmark
)

module.exports = router
