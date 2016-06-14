// grab the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema;




// create a schema
var pathSchema = new Schema({


        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],

        name: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        steps: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pathStep'
        }],

        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pathComment'
        }],

        individual: {
            type: Boolean,

        },

        group: {
            type: Boolean,

        },

        rating: {
            type: Number,
            min: 0,
            max: 5
        },

        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        originalPathId: {
            type: String,
            //required: true,
            //default: ""
        },

        clonedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        fromDateOfEnrolment: {
            type: Date,
            default: Date.now
        },

        toDateOfEnrolment: {
            type: Date
        }
    },
    {
        timestamps: true
    });

// the schema is useless so far
// we need to create a model using it
var Path = mongoose.model('Path', pathSchema);

// make this available to our Node applications
module.exports = Path;







