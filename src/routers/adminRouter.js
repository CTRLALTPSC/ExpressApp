const express = require('express'); // for adminrouter 
const debug = require('debug')('app:adminRouter')            // pass in file or section of code that we are in  // debug here like to kinda debug in mongo information and include it in adminRouter
const mongodb = require('mongodb'); // pull in mongodb -- installed in terminal 

const adminRouter = express.Router();



module.exports = adminRouter;   // ^ core pieces 