var mongoose = require('mongoose');

var Schema = mongoose.Schema;



// create a schema
var pathCommentSchema = new Schema({

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        pathId: {
            type: String
        },
        parentId: {
            type: String
        },
        slug: {
            type: String
        },
        fullslug: {
            type: String
        },
        posted:{
            type: Date,
            default:  Date.now
        },
        text: {
            type: String
        }
    },
    {
        timestamps: true

    }
);

var pathComment = mongoose.model('pathComment', pathCommentSchema);

// make this available to our Node applications
module.exports = pathComment;

