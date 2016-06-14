var mongoose = require('mongoose');

var Schema = mongoose.Schema;



// create a schema
var pathStepSchema = new Schema({

        name: {
            type: String,
            required: true
        },
        deadline: {
            type: Date
        },
        completed: {
            type: Boolean
        },

        description: {
            type: String,
            required: true
        },

        notes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }]
    },
    {
        timestamps: true

    }
);

var pathStep = mongoose.model('pathStep', pathStepSchema);

// make this available to our Node applications
module.exports = pathStep;

