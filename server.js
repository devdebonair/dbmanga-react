var express = require("express");
var app = express();
var http = require("http").Server(app);

var session = require("express-session");
var mongoose = require("mongoose");
//var MongoStore = require("connect-mongo")(session);
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var expressLayouts = require("express-ejs-layouts");

var config = require("./config");
var passport = require("passport");


//Configure Express
console.log('Configuring Express....');
app.use(function(req, res, next) { 
    if(req.headers.host === 'dbmanga.com') 
    { 
        res.writeHead(303, {'Location': 'http://www.dbmanga.com' + req.url});
        res.end();
    }
    else
    {
        next();
    }
}); 
app.use( express.static(__dirname + '/public') );
app.use( '/lib', express.static(__dirname + '/public/static') );
app.set( 'views', __dirname + '/public/views/' );
app.engine( 'html', require("ejs").__express );
app.set( 'view engine', 'html' );

app.use( expressLayouts );
app.set("layout extractScripts", true);
app.use( cookieParser() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( methodOverride() );
app.use( session( { secret: config.session.secret, resave: false, saveUninitialized: false } ) );

// Initialize database
// console.log('Connecting to Database....');
// require("./database/db")(mongoose, function(err){
   
   
    
    // if(!err)
    // {
    //     app.use( session({
    //         secret: config.session.secret,
    //         store: new MongoStore({
    //             mongooseConnection: mongoose.connection
    //         }),
    //         saveUninitialized: true,
    //         resave: false
    //     }));
    // }
    // app.use( passport.initialize() );
    // app.use( passport.session() );
    
    
    // Initialize Passport
    // console.log('Checking Passport...');
    // require("./passport")(passport);
    
    // Initialize Routes
    // console.log('Establishing Routes....');
    // require("./routes")(app, passport);
    
app.get('/', function(req, res){
    res.render('landing', {
        layout: false
    });
});


var MailChimpAPI = require("mailchimp").MailChimpAPI;
var darwin = null;

try { 
    darwin = new MailChimpAPI(config.mailchimp.apiKey, { version : '2.0' });
} catch (error) {
    console.log(error.message);
    darwin = null;
}

app.get('/beta', function(req, res){
    res.sendFile(__dirname + '/public/views/beta.html');
});

app.post('/beta', function(req, res){
    darwin.call('lists', 'member-info', { id: 'fc9170aaf8', emails: [{email: req.body.email}] }, function(err, data){
        if(data.success_count > 0)
        {
            req.session.isBetaValid = true;
            res.redirect(301, '/reader');
            return;
        }
        req.session.isBetaValid = false;
        res.redirect(301, '/reader');
    });    
});

app.get('/reader', function(req, res) {
    if(!req.session.isBetaValid)
    {
        res.redirect(301, '/');
        return;
    }
    
    res.render('partials/reader', { 
        layout: 'layout',
        meta:{ 
            title: 'Debonair Manga - Read Online for Free', 
            description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
            keywords: ''
        }
    });
});

app.get('*', function(req, res){
    res.redirect(301, '/');
});

console.log('Starting Server....');
http.listen( config.env.port, function(){
    console.log('Listening to port:\t%s', config.env.port );
});