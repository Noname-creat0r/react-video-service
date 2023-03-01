const express = require('express');
const isAdmin = require('../middleware/is-admin');
const isAuth = require('../middleware/is-auth');

const categoryController = require('../controllers/category');

const router = express.Router();

router.get(
    '/',
    categoryController.getCategories
);

router.post(
    '/',
    isAuth,
    isAdmin,
    categoryController.postCategory
);

router.put(
    '/',
    isAuth,
    isAdmin,
    categoryController.putCategory,
);

router.delete(
    ':id?',
    isAuth,
    isAdmin,
    categoryController.deleteCategory
)

module.exports = router;