const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectID } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    //delete: res.json(req.body);
    // TODO create user
    req.login(req.body, ()=>{          // pass login to the body of the request which is the username and password, then execute function
    res.redirect('/auth/profile');        // once logged in, do res.redirect (another response option) to redirect to different route --- going to post to signup, create user, then log user in
                // re.json --- response in json, and send back body / get body 
                // /auth/signup -- send post message, handle it with req and res function to get access to the body
                // -- posted to the form of signup with example username and password, using json body which is the form of how the username and password is being displayed on the page endpoints of 4000/auth/signUp
                // the authroute takes the form post and returned the body contents of the signUp inputs. 
    })
});
authRouter.route('/profile').get((req, res)=>{      // passport has given login function that allows to log a user in, also if the user is logged in, its going to give us a user
    res.json(req.user);         // send back req.user 
})   // auth/profile but auth is raked into the route already, then do req and res

module.exports = authRouter;
