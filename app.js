'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  mongoose.connect('mongodb://localhost:27017/lenny');
  mongoose.connection.on('error', console.error.bind(console, 'connnection error:'));
  mongoose.connection.once('open', function(){
    app.listen(8081, function(){
      console.log ('App listening on port 8081');
    });

  });


});
