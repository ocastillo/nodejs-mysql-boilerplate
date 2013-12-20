var express = require('express'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    hbs = require('express-hbs'),
    passport = require('passport'),
    crypto = require('crypto'),
    Bookshelf = require('bookshelf'),
    helpers = require('./util/helpers');

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
app.use(function(req, res, next) {
    var error_messages = req.flash('error');
    var info_messages = req.flash('info');
    var success_messages = req.flash('success');
    res.locals.messages = [];
    for(var i in error_messages) {
        res.locals.messages.push({type: 'error', message: error_messages[i]});
    }
    for(var i in info_messages) {
        res.locals.messages.push({type: 'info', message: info_messages[i]});
    }
    for(var i in success_messages) {
        res.locals.messages.push({type: 'success', message: success_messages[i]});
    }   
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.engine('hbs', hbs.express3({
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials',
        contentHelperName: 'content'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');
helpers.registerhelpers(hbs);


// Bookshelf ORM
Bookshelf.mysqlAuth = Bookshelf.initialize({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'your_username',
        password : 'your_password',
        database : 'your_db_name'
    },
    // debug: true
});

require('./util/auth')(passport);
require('./routes')(app, passport);


app.listen(3000);
console.log('Listening on port 3000');
