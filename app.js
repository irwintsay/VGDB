// Dependencies
var express         = require('express'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    dotenv          = require('dotenv').config(),
    mongoose        = require('mongoose'),
    morgan          = require('morgan'),
    path            = require('path')

// Application, Port, Database
var app             = express(),
    port            = process.env.PORT || 6969,
    db              = process.env.MONGODB_URI || "mongodb://localhost/vgdb";

app.use(express.static('client/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client/public/views'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routing
var indexRouter     = require('./server/routes/index.js');
var apiUsersRouter  = require('./server/routes/api/users.js');
var apiAuthRouter   = require('./server/routes/api/auth.js');

app.use('/', indexRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/auth', apiAuthRouter);

// Connect to Database and Launch Application
mongoose.connect(db);
app.listen(port, function() {
  console.log("VGDB listening: " + port);
});
