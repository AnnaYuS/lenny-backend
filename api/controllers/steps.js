'use strict';

var pathStep = require('../models/step');
var Path = require('../models/path');
var _ = require('lodash');

module.exports = {
    index: function (req, res) {



        Path.findById(req.swagger.params.pathId.value)
            .populate('steps')
            .exec(function (err, path) {
                if (err) next(err);
                res.json(path.steps);
            });

    },

    create: function (req, res) {
        var step = new pathStep(req.swagger.params.pathStep.value);
        step.save(function(err){
            if (err){
                res.status(500).json(err).end();
                return;
            }
            Path.findById(req.swagger.params.pathId.value)
                .exec(function (err, path) {
                    if (err) next(err);
                    path.steps.push(step._id);
                    path.save(function(err){
                        if (err){
                            res.status(500).json(err).end();
                            return;
                        }
                        res.json(
                            { step:step}
                        ).end();
                    });
                });

        }) ;
    }
};
