const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectID } = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    res.json(req.body);

});
// re.json --- response in json, and send back body / get body 
// /auth/signup -- send post message, handle it with req and res function to get access to the body
// -- posted to the form of signup with example username and password, using json body which is the form of how the username and password is being displayed on the page endpoints of 4000/auth/signUp
// ther authroute takes the form post and returned the body contents of the signUp inputs. 
module.exports = authRouter;
