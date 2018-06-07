var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();  

router.get('/', function(req, res) {
    res.json({ message: 'Bienvenido a la API del taller!' });   
});

app.use('/workshop', router);

app.listen(port);
console.log('Magic happens on port ' + port);

