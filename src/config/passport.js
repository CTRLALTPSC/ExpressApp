const passport = require('passport');



module.exports = function passportConfig(app){
  app.use(passport.initialize());
  app.use(passport.session());
  // two new pieces of middleware
}
// passing in app so now there is access to express app (app.js)