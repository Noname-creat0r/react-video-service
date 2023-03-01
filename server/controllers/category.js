const Types = require('mongoose').Types;
const Category = require('../models/Category');
const Video = require('../models/Video');

const { throwError } = require('../shared/utility');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({}).lean();
        res.status(200).json({ categories: categories});
    } catch(err) {
        next(err);
    };
};

exports.postCategory = async (req, res, next) => {
    try {
        if (!req.body.title) 
            throwError('Missing param in body', 400);
        
        const isAlreadyPosted = await Category.findOne({
            title: req.body.title,
        });

        if (isAlreadyPosted) 
            throwError('Category with this title is already exists', 400);
        
        const category = await Category.create({
            title: req.body.title,
        });
        await category.save();
    
        res.status(201).json({
            message: "Posted a category",
            category: category.toObject()
        });

    } catch(error) {
        next(error);
    }
};

exports.putCategory = async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.categoryId) 
            throwError('Missing param in body', 400);

        const category = await Category.findOne({
            _id: Types.ObjectId(req.body.categoryId)
        });

        if (!category) 
            throwError('There is no category with such id', 400);
        
        await category.updateOne({
            title: req.body.title
        });
        await category.save();

        const updatedCategory = await Category.findOne({
            _id: Types.ObjectId(req.body.categoryId)
        }).lean();

        res.status(200).json({
            message: 'Updated a category',
            category: updatedCategory,
        });

    } catch(error) {
        next(error);
    }
};

exports.deleteCategory = async (req, res, next) => {
    try {
        if (!req.query.categoryId) 
            throwError('Missing param in query', 400);

        const category = await Category.findOne({
            _id: new Types.ObjectId(req.query.categoryId)
        });
        
        if (!category)
            throwError('There is no such category to delete', 400);

        const defaultCategory = await Category.findOne({
            title: 'Any',
        });

        await Video.updateMany({
            category: category.title
        }, {
            category: defaultCategory.title || 'Any',
        });

        await category.delete();

        res.status(200).json({
            message: 'Category has been deleted',
            id: req.query.categoryId,
        })

    } catch(error){
        console.log(error);
        next(error);
    }
};