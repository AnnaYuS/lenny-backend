var mongoose = require('mongoose');

var Schema = mongoose.Schema;



// create a schema
var categorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    slug: {
        type: String
    }
},
{
    timestamps: true

}
);

var Category = mongoose.model('Category', categorySchema);

// make this available to our Node applications
module.exports = Category;
