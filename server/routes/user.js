const express = require('express');
const {body} = require('express-validator');

const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const userController = require('../controllers/user');

const router = express.Router();

router.get(
    '/get',
    isAuth,
    userController.fetchData
);

router.get(
    '/all',
    isAuth,
    isAdmin,
    userController.fetchAll
);

router.put(
    '/edit',
    isAuth,
    userController.editUser,
);

router.delete(
    '/delete',
    isAuth,
    userController.deleteUser,
)

router.put(
    '/bookmark',
    isAuth,
    userController.putPlaylistBookmark,
);

module.exports = router;
