const express = require('express')

const storage = require('../db/storage')
const authController = require('../controllers/auth')

const router = express.Router()

router.get(
  '/guest',
  authController.initGuest
)

router.post('/signin', authController.signin)

router.post(
  '/signup',
  storage.upload.single('avatar'),
  authController.signup
)

module.exports = router
