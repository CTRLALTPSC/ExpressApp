// .json npm install note: if things go wack just do npm install of specific version
// nodemon package is addition to express that helps starts and saves every time file is changed
const express = require('express');
const chalk = require('chalk');                   // sets color on msgs to group together
const debug = require('debug')('app')            // pass in file or section of code that we are in
const morgan = require('morgan');
const path = require('path')

const PORT = process.env.PORT || 3000;        
const app = express();               

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

app.use('/sessions', sessionRouter);
// use middleware (use), everything that goes to sessions, implement sessionrouter [ holds all code necessary to deal with sessions route]

app.get('/', (req, res) => { 
 res.render('index', { title: 'MOM', data: ['a', 'b', 'c'] });  // array, pass pieces of data into index: create list in indexejx, then loop over data 
});

app.listen(PORT, () => {     
    debug(`listening on port ${chalk.green(PORT)}`);        // template string - debug only runs in debug mode
});  
