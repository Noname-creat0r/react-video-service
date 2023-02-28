const express = require('express');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const categoryController = require('../controllers/category');


const router = express.Router();

router.post(
    '/',
    isAuth,
    isAdmin,
);

router.put(
    '/',
    isAuth,
    isAdmin,
);

router.delete(
    ':id?',
    isAuth,
    isAdmin,
)

module.exports = router;