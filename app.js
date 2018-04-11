var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://localhost/lpAPI', {useMongoClient: true});

var Lp = require('./models/lpModel');


var app = express();

var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    if (!req.accepts('application/json')) {
        res.status(400).send();
    } else {
        next();
    }
});

lpRouter = require('./Routes/lpRoutes')(Lp);

app.use('/api/lps', lpRouter);

app.get('/', function(req, res){
  res.send('Welcome to my api')
});

app.listen(port, function(){
  console.log('Running on PORT:' + port);
});



module.exports = app;
