
const express = require('express');
const debug = require('debug')('app:sessionsRouter');
const { MongoClient, ObjectID} = require('mongodb'); // pull in mongodb   

const sessions = require('../data/sessions.json');   // no longer in scr.scr since its in scr (folder)

// pulling express like previously in app.js
// creating sessionsrouter and routing it all, then last is to export sessionsrouter as module.exports
const sessionsRouter = express.Router();    // express hands over bundle of code called a router

sessionsRouter.use((req, res, next)=>{
  if(req.user){ // check if passport has dropped a user on the request
    next();
  } else {
    res.redirect('/auth/signIn');    // else, redirect to signin - if you didnt sign in, you cant get to the sessions page 
  }

})      // middleware IS A FUNCTION like every thing else is; this set will cover all of middleware for sessionsRouter; NEXT makes this piece middleware


sessionsRouter.route('/').get((req, res) => {
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
    
      const sessions = await db.collection('sessions').find().toArray(); //will pull everything out of database that is in session
                    // creating a collection called session         // instead of findOne().toArray(); - changed to findOne; find by id, object id is what we want... .findOne({_id: id}) wont work cuz id is a string, so create a new object id instead and search for that -- added new object to the top as a const
      res.render('sessions', { sessions });
          // pass in sessions, whatever we got out of our collection  
    } catch (error) {
      debug(error.stack);        // if something breaks, will know  
    }
    client.close();
    })();
   // res.render('sessions', {  // pass in object, pass in an array of sessions: title and description {deleted} -> pass sessions in on object instead
    //    sessions, // looping over sessions.map, pulling all sesions out of .json file for information under "learn more" 
    //                            // when sessions is rendering, object is getting passed in that which has sessions data in it 
    //});                
});

sessionsRouter.route('/:id').get((req, res) => {         // :id / whatever comes after will be passed into this router function
    const id = req.params.id;       // http://localhost:4000/sessions/sdfghdsfhh--> "hello single sessions sdfhsdkg" onto page
    const url =
   'mongodb+srv://dbUser:D0OSnIEY7l2Kvfrc@jsexample.kcxwf.mongodb.net?retryWrites=true&w=majority'  // from database (connector ig)                         
  const dbName = 'jsexample';
  
  (async function mongo(){          // creating little environment right here in the code ' {} ' thats going to allow mongo to run in that async fashion 
                                        // so everything from here is just going to execute in line as it goes 
    let client;
    try {   // below: need to open client
      client = await MongoClient.connect(url);  // no need for a 'promise' because await is being used which means that client will sit there and wait for mongodb to connect to the url 
      debug('Connected to the mongo DB');
    // debug statement above to know whats going on, then below this an instance is created of the database

      const db = client.db(dbName); //client that is back from mongoclient, the .dbname is now providing database  -- this database doesnt exist yet tho, mongo can selfcreate when its read to go and it will be ready to start dropping data
    
      const sessions = await db.collection('sessions').findOne({_id: new ObjectId(id)}); //will pull everything out of database that is in session
                    // creating a collection called session         // instead of findOne().toArray(); - changed to findOne; find by id, object id is what we want... .findOne({_id: id}) wont work cuz id is a string, so create a new object id instead and search for that -- added new object to the top as a const
      res.render('sessions', { sessions });
      } catch (error) {
          debug(error.stack);
      }     // pass in sessions, whatever we got out of our collection 
      client.close(); 
    })();
      res.render('sessions', {
        sessions: sessions[id],
    });
});

module.exports = sessionsRouter;

// need sessions data, that data is now being used here instead of app.js
// also pull data manipulation code out of app.js as well (/scr/data/ etc)
