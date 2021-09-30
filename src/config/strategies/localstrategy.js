const passport = require('passport');
const { strategy } = require('passport-local');  // will send back an object, and we want

module.exports = function localStrategy(){
    passport.use(new Strategy)
}