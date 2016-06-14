'use strict';

var Category = require('../models/category');
var _ = require('lodash');

module.exports = {
    index: function (req, res) {

        Category.find({}, function(err, categories){
            if (err){
                res.status(500).json(err).end();
                return;
            }

            res.json(categories).end();
        });

    },

    create: function (req, res) {
        var category = new Category(req.swagger.params.NewCategory.value);
        category.save(function(err){
            if (err){
                res.status(500).json(err).end();
                return;
            }
            res.json(
                { category:category}
            ).end();
        }) ;
    },

    show: function (req, res){
        Category.findById(req.swagger.params.categoryId.value, function (err, category) {
            if (err){
                res.status(500).json(err).end();
                return;
            }
            res.json(
                category
            ).end();
            });
    },

    update: function (req, res){
        Category.findById(req.swagger.params.categoryId.value, function(err, category){
            if (err){
                res.status(500).json(err).end();
                return;
            }
            _.assign(category, req.swagger.params.Category.value);
            category.save(function(err){
                if (err){
                    res.status(500).json(err).end();
                    return;
                }
                res.json(
                    category
                ).end();
            }) ;
        })
    },

    destroy: function (req, res){
        Category.findByIdAndRemove(req.swagger.params.categoryId.value, function(err, category){
            if (err){
                res.status(500).json(err).end();
                return;
            }

            res.json(
                category
            ).end();
        })
    }


};