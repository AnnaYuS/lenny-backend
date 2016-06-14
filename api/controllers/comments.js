'use strict';

var pathComment = require('../models/comment');
var Path = require('../models/path');
var _ = require('lodash');

module.exports = {
    index: function (req, res) {



        Path.findById(req.swagger.params.pathId.value)
            .populate('comments')
            .exec(function (err, path) {
                if (err) next(err);
                res.json(path.comments);
            });

    },

    create: function (req, res) {
        var comment = new pathComment(req.swagger.params.pathComment.value);
        comment.save(function(err){
            if (err){
                res.status(500).json(err).end();
                return;
            }
            Path.findById(req.swagger.params.pathId.value)
                .exec(function (err, path) {
                    if (err) next(err);
                    path.comments.push(comment._id);
                    path.save(function(err){
                        if (err){
                            res.status(500).json(err).end();
                            return;
                        }
                        res.json(
                            { comment:comment}
                        ).end();
                    });
                });

        }) ;
    },


};

