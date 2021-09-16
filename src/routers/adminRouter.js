const express = require('express'); // for adminrouter 
const debug = require('debug')('app:adminRouter');          // pass in file or section of code that we are in  // debug here like to kinda debug in mongo information and include it in adminRouter
const { MongoClient } = require('mongodb'); // pull in mongodb -- installed in terminal  // mongodb.MongoClient --> destructure by pulling the mongoclient piece out of mongodb and use that directly 

const sessions = require('../data/sessions.json');   // no longer in scr.scr since its in scr -folder-  // -- DROPPED HERE CUZ THIS IS THE SESSIONS DATA THAT WE WANT TO CREATE UP IN THE MONGO DB

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url =
   'mongodb+srv://dbUser:D0OSnIEY7l2Kvfrc@jsexample.kcxwf.mongodb.net?retryWrites=true&w=majority'  // from database (connector ig)                         
  const dbName = 'jsexample';
  // pieces of info that are going to be used to drive application
  // when working with mongodb, can do one of three things: 
  // 1) callbacks -- are fine, are old school
  // 2) 'promises' have been around for a long time too
  // 3) --USE-- async/await: because it allows it to be a bit easier to read, so its easier to understand whats going on
  (async function mongo(){          // creating little environment right here in the code ' {} ' thats going to allow mongo to run in that async fashion 
                                        // so everything from here is just going to execute in line as it goes 
    let client;
    try {   // below: need to open client
      client = await MongoClient.connect(url);  // no need for a 'promise' because await is being used which means that client will sit there and wait for mongodb to connect to the url 
      debug('Connected to the mongo DB');
    // debug statement above to know whats going on, then below this an instance is created of the database

      const db = client.db(dbName); //client that is back from mongoclient, the .dbname is now providing database  -- this database doesnt exist yet tho, mongo can selfcreate when its read to go and it will be ready to start dropping data
    
      const response = await db.collection('sessions').insertMany(sessions);
                    // creating a collection called session
      res.json(response);
            // so far, weve just had res.send which will send back strings, to just send pieces of info back...
            // and a res.render which rendered index or session/sessions and ran it through the templating engine and rendered a page 
            // now -- use a res.json, back to the response, back to the browser thats getting it. 

    } catch (error) {
      debug(error.stack);        // if something breaks, will know  
    }

    }())
});

module.exports = adminRouter;   // ^ core pieces 