'use strict';

var Path = require('../models/path');
var _ = require('lodash');

module.exports = {
    index: function (req, res) {

        var filter = {};
        var categoryId = req.swagger.params.categoryId.value;
        if (categoryId) {
            filter.categories = categoryId;
        } // или {'$eq': categoryId}
        Path.find(filter)

        //Path.find(
        //    {'categories': {"$eq": req.swagger.params.categoryId.value } }

            //{'category._id':{$eq: categoryId}}

            //{ 'categories._id': categoryId }


        //)

            .populate('categories steps comments')

            .exec(function (err, path) {
                    if (err) {
                        res.status(500).json(err).end();
                        return;
                    }
                    res.json(path);
                });
            //res.json(paths).end();


},
    create: function (req, res) {
        var path = new Path(req.swagger.params.NewPath.value);
        path.save(function(err){
            if (err){
                res.status(500).json(err).end();
                return;
            }
            res.json(
                { path:path}
            ).end();
        }) ;
    },

    show: function (req, res){
        Path.findById(req.swagger.params.pathId.value)
            .populate('categories steps comments')
            .exec(function (err, path) {
                if (err) next(err);
                res.json(path);
            });
    },

    update: function (req, res){
        Path.findById(req.swagger.params.pathId.value, function(err, path){
            if (err){
                res.status(500).json(err).end();
                return;
            }
            _.assign(path, req.swagger.params.Path.value);
            path.save(function(err){
                if (err){
                    res.status(500).json(err).end();
                    return;
                }
                res.json(
                    path
                ).end();
            }) ;
        })
    },

    destroy: function (req, res){
        Path.findByIdAndRemove(req.swagger.params.pathId.value, function(err, path){
            if (err){
                res.status(500).json(err).end();
                return;
            }

            res.json(
                path
            ).end();
        })
    }
}