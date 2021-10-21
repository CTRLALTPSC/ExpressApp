const passport = require('passport');
const { Strategy } = require('passport-local');  // will send back an object, and we want

module.exports = function localStrategy() {
    passport.use(
        new Strategy(
            {    // all this is, is telling passport that when youre using local.strategy, this is the method youre going to call to figure it out //if someone can be logged in or not
                                   // new strategy constructor takes two pieces of information: 1st is object - this object has 2 pieces of info: the username field- so we are telling it that 'hey' over on index.ejs were submitting a form right here to auth/signup
                                   // when that form isposted, youre gonna get a username called username and a password called password. so we have to tell the local strategy what those two fields are called.
                usernameField: 'username',
                passwordField: 'password',       // gonna send that info:username and password to a function - username,password, and the done callback
            }, 
        (username, password, done) => {  // then, take username and password, go to a database, look up the user, validate password, then create user object out of that, but for now, create user const cuz we arent doing all that other work yet
        const user = { username, password, 'name': 'John' };
        done(null, user); // call done to say theres no errors and then the user we just created 
    }
 )
);
};