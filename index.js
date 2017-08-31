// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan'); // Logging 
const app = express();
const router = require('./router');
const config = require('./config');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
 mongoose.connect(config.getDbConnectionString(), function(error){
    if(error) console.log(error);
    console.log("connection successful", mongoose.connection.readyState);
});

// App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const port = process.env.PORT || 9000;
const server = http.createServer(app);


server.listen(port);
console.log('Server Listening on ... ', port);

