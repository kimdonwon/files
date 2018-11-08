var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var session = require('express-session');
// var mail = require('nodemailer');
// //var mongoose = require('mongoose');
// var smtp = mail.createTransport({
//   service : 'Gmail',
//   auth:{
//     user:'ehddnjs0728',
//     pass:''
//   }
// })
const fs = require('fs');
var mongo = require('mongoose');


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


var db = mongo.connection;
db.on('error',console.error);
db.once('open',function(){
  console.log("MongoDB gogo");
});
mongo.connect(
        `mongodb://${process.env.DB_HOST || 'localhost'}:27017/${
          process.env.DB || 'portfolio'
        }`,
      )
var Post = require('./models/post');


var port = process.env.PORT || 80;
var router = require('./router/MainControl')(app,fs,Post);
var server = app.listen(port, function(){
  console.log("gogo server " + port);
});










//test real zxcs
