const express = require('express')

const storage = require('../db/storage')
const authController = require('../controllers/auth')

const router = express.Router()

router.get(
  '/guest',
  authController.initGuest
)

router.post(
  '/signup',
  storage.upload.single('avatar'),
  authController.signup
)

router.post('/signin', authController.signin)

module.exports = router
