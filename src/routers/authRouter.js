const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectID} = require('mongodb');

const authRouter = express.Router();

authRouter.route('/signup').post
// /auth/signup -- send post message 
module.exports = authRouter;
