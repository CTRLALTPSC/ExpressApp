// .json npm install note: if things go wack just do npm install of specific version
// nodemon package is addition to express that helps starts and saves every time file is changed
const express = require('express');
const chalk = require('chalk');                   // sets color on msgs to group together
const debug = require('debug')('app')            // pass in file or section of code that we are in
const morgan = require('morgan');
const path = require('path')

const PORT = process.env.PORT || 3000;        
const app = express();      
const sessionsRouter = express.Router();    // express hands over bundle of code called a router         

app.use(morgan('tiny'));            

app.use(express.static(path.join(__dirname, '/public/')));              

app.set('views', './src/views');             
app.set('view engine', 'ejs');       

// ---------------------
// app.get('/'  -- express will execute this function in the broswer
// send 2 variable 
// : request
// : response
//  app.get('/',(req, res)=>{ }npm )
// ---------------------

//---------------------
//app.get('/sessions');           // change brands to sessions on demo UI, executes 
//app.get('/sessions/sessionID');
//---------------------- instead.. encapsulate code and use USE

app.use('/sessions', sessionsRouter);
// use middleware (use), everything that goes to sessions, implement sessionrouter [ holds all code necessary to deal with sessions route]

sessionsRouter.route('/').get((req,res) => {
    res.render('sessions', {sessions: [  // pass in object, pass in an array of sessions: title and description  
        {title: 'Session 1', description: 'this is sessions 1'},
        {title: 'Session 2', description: 'this is sessions 2'},
        {title: 'Session 3', description: 'this is sessions 3'},
        {title: 'Session 4', description: 'this is sessions 4'},
        ],  // when sessions is rendering, object is getting passed in that which has sessions data in it 
    });                
});

sessionsRouter.route('/1').get((req,res) => {
    res.send('hello single sessions')
});

app.get('/', (req, res) => { 
 res.render('index', { title: 'MOM', data: ['a', 'b', 'c'] });  // array, pass pieces of data into index: create list in indexejx, then loop over data 
});

app.listen(PORT, () => {     
    debug(`listening on port ${chalk.green(PORT)}`);        // template string - debug only runs in debug mode
});  
