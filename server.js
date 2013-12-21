var express = require('express'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    hbs = require('express-hbs'),
    passport = require('passport'),
    crypto = require('crypto'),
    Bookshelf = require('bookshelf'),
    messages = require('./util/messages'),
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
app.use(messages());

app.engine('hbs', hbs.express3({
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials',
        contentHelperName: 'content'
}));
app.set('view engine', 'hbs');
app.set('views', 'views');
helpers.registerhelpers(hbs);


require('./util/bookshelf')(Bookshelf);
require('./util/auth')(passport);
require('./routes')(app, passport);


app.listen(3000);
console.log('Listening on port 3000');
