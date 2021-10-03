// local strategy -- hand us a username and password, and were going to figure out whether or not youre authenticated 
// locally, in own codebase instead of doing a social login or an okta login or something like that. 

const passport = require('passport');
require('./strategies/localstrategy')();


module.exports = function passportConfig(app){
  app.use(passport.initialize());
  app.use(passport.session());
  // two new pieces of middleware
  // passing in app so now there is access to express app (app.js)

  passport.serializeUser((user, done)=>{
     done(null, user);
  });
  // takes a function, and pass back in the user and 'the done function' - let us know when its done 
  // pass that user object back on done, we just want to serialize the whole object 

  passport.deserializeUser((user, done)=>{
    // when its deserializing the user coming out of that cookie, its going to say 'hey, heres the user that I have'... we are gonna have the whole user in here instead of ID
    // so its going to just pass back on done
    done(null, user);
  });
}