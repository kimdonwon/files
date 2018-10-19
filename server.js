var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var session = require('express-session');
//var mongoose = require('mongoose');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(session({
  secret:'#$%^sad%$@',
  resave:false,
  saveUninitialized:true
}));
app.use(express.static('public'));

var port = process.env.PORT || 80;

var router = require('./router/MainControl')(app);

var server = app.listen(port, function(){
  console.log("gogo server " + port);
})
//test real zxcs
