'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
var port = process.env.PORT || 8081;

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  mongoose.connect('mongodb://Lenny:2368239@ds015334.mlab.com:15334/lennylearny');
  mongoose.connection.on('error', console.error.bind(console, 'connnection error:'));
  mongoose.connection.once('open', function(){
    app.listen(port, function(){
      console.log ('App listening on port 8081');
    });

  });


});
