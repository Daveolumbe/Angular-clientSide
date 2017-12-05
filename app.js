const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
// connect mongodb
mongoose.connect(config.database, { useMongoClient: true });

// checking connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database via ' + config.database);
});

const users = require('./routes/users');

// initialise app 
const app = express();

// Port number
const port = 3000;

// CORS middleware
app.use(cors());

// body parse middleware
app.use(bodyParser.json());



// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// set static folder
app.use(express.static(path.join(__dirname, 'public')))


app.use('/users', users)

// Index route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server
app.listen(port, () => {
    console.log('Server listen on port: ' + port);
});