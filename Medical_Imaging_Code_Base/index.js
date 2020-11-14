// include the express module
var express = require("express");

// create an express application
var app = express();

// helps in extracting the body portion of an incoming request stream
//var bodyparser = require('body-parser');

// fs module - provides an API for interacting with the file system
var fs = require("fs");

// helps in managing user sessions
var session = require('express-session');

app.use(session({
  secret: "medical-img",
  saveUninitialized: true,
  resave: false}
));

app.use(express.static(__dirname + '/assets'));

// server listens on port 9999 for incoming connections
app.listen(process.env.PORT || 9999, () => console.log('Listening on port 9999'));


// Default page for app is home page
app.get('/',function(req, res) {
	
	res.sendFile(__dirname + '/html/home.html');
	
});

//routes user to Login page on clicking train
app.get('/login',function(req, res) {
	
	res.sendFile(__dirname + '/html/Login.html');
	
});

// work around for current lack of a true login session thing
app.get('/train',function(req, res) {
	if(req.session.loggedIn){
		res.sendFile(__dirname + '/html/Train.html');
	}
	else{
		res.sendFile(__dirname + '/html/Login.html');
	}
});

// About Us page
app.get('/aboutUs',function(req, res) {

	res.sendFile(__dirname + '/html/AboutUs.html');
	
});

// FAQ page 
app.get('/faqs',function(req, res) {

	res.sendFile(__dirname + '/html/FAQs.html');
	
});

// Create Account Page
app.get('/createAccountPage',function(req, res) {

	res.sendFile(__dirname + '/html/CreateAccount.html');
	
});

// Information Page
app.get('/information',function(req, res) {

	res.sendFile(__dirname + '/html/Information.html');
	
});

// Settings page
app.get('/settings',function(req, res) {

	res.sendFile(__dirname + '/html/Settings.html');

});

// Progress page
app.get('/progress',function(req, res) {

	res.sendFile(__dirname + '/html/Progress.html');

});

app.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/disclaimer', function(req, res) {

	res.sendFile(__dirname + '/html/Disclaimer.html');

});


// Post response for when a user submits the create account form
app.post('/postLogin', function(req, res) {
	req.session.loggedIn = 1;
    res.redirect('/train');

});

// Post response
app.post('/postDisclaimLogin', function(req, res) {
	req.session.clickedDisclaimer = 1;
	res.redirect('/login');
});


