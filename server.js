var express = require('express'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    swig = require('swig'),
    passport = require('passport'),
    crypto = require('crypto'),
    Bookshelf = require('bookshelf'),
    messages = require('./util/messages');

var app = express();

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(expressValidator());
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('./public'));
//app.use(express.favicon(__dirname + '/public/images/shortcut-icon.png'));
app.use(messages());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// view caching
// app.set('view cache', false);
// swig.setDefaults({ cache: false });

require('./util/bookshelf')(Bookshelf);
require('./util/auth')(passport);
require('./routes')(app, passport);


app.listen(3000);
console.log('Listening on port 3000');
