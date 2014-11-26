var express = require("express");
var app = express();
var http = require("http").Server(app);

var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var expressLayouts = require("express-ejs-layouts"); //test

var config = require("./config");
var passport = require("passport");

//Configure Express
console.log('Configuring Express....');
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
app.use( session({
    secret: config.session.secret,
    saveUninitialized: true,
    resave: true
}));
app.use( passport.initialize() );
app.use( passport.session() );
app.use( methodOverride() );

//Initialize Passport
console.log('Checking Passport...');
require("./passport")(passport);

//Initialize Routes
console.log('Establishing Routes....');
require("./routes")(app, passport);

//Initialize database
console.log('Connecting to Database....');
require("./database/db");

console.log('Starting Server....');
http.listen( config.env.port, function(){
    console.log('Listening to port:\t%s', config.env.port );
});





var Manga = require("./database/models/ModelManga");

app.get('/', function(req, res){
    res.render('partials/home', {layout: 'layout'});
});

app.get('/manga/:manga_name', function(req, res) {
    var title = req.params.manga_name.replace(/-/g,' ');
    Manga.findOne({ title: title }).select('-sources').exec(function(err, data){
        if(err)
        {
            res.send(err);
            return;
        }
        res.render('partials/manga', { layout: 'layout', manga: data });
    });
});

app.get('/manga', function(req, res) {
    res.render('partials/browse-manga', { layout: 'layout' });
});

app.get('/genre', function(req, res) {
    res.render('partials/genres', { layout: 'layout' });
});