// pulling express like previously in app.js
// creating sessionsrouter and routing it all, then last is to export sessionsrouter as module.exports
const sessionsRouter = express.Router();    // express hands over bundle of code called a router
const sessions = require('../data/sessions.json');   // no longer in scr.scr since its in scr (folder)

sessionsRouter.route('/').get((req, res) => {
    res.render('sessions', {  // pass in object, pass in an array of sessions: title and description {deleted} -> pass sessions in on object instead
        sessions, // looping over sessions.map, pulling all sesions out of .json file for information under "learn more" 
                                // when sessions is rendering, object is getting passed in that which has sessions data in it 
    });                
});

sessionsRouter.route('/:id').get((req, res) => {         // :id / whatever comes after will be passed into this router function
    const id = req.params.id;       // http://localhost:4000/sessions/sdfghdsfhh--> "hello single sessions sdfhsdkg" onto page
    res.render('session', {
        session: sessions[id],      // pass in object through sessions from above request, not pass in object through its route, id will pass info onto page of session page
    });
});

module.exports = sessionsRouter;

// need sessions data, that data is now being used here instead of app.js
// also pull data manipulation code out of app.js as well (/scr/data/ etc)
