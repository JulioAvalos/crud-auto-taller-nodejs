
var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT;
var router = express.Router();
var Taller = require('./app/models/taller');

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
 

router.route("/talleres")
    //get all workshops availables!
    .get(function (req, res) {
        Taller.find(function (err, talleres) {
            if (err)
                res.send(err);
            res.json(talleres);
        });
    })

    //create workshop
    .post(function (req, res) {

        var taller = new Taller();
        taller.taller = req.body.taller;
        taller.lat = req.body.lat;
        taller.lon = req.body.lon;

        // save the workshop and check for errors
        taller.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Workshop created!' });
        });

    });

router.route('/talleres/:taller_id')

    // get the workshop with that id (accessed at GET http://localhost:8080/api/talleres/:taller_id)
    .get(function (req, res) {
        Taller.findById(req.params.taller_id, function (err, taller) {
            if (err)
                res.send(err);
            res.json(taller);
        });
    })

    // update the bear with this id (accessed at PUT http://localhost:8080/api/talleres/:taller_id)
    .put(function (req, res) {

        // use our bear model to find the bear we want
        Taller.findById(req.params.taller_id, function (err, taller) {

            if (err)
                res.send(err);

            taller.taller = req.body.taller;
            taller.lat = req.body.lat;
            taller.lon = req.body.lon;

            // save the workshop
            taller.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Workshop updated!' });
            });

        });
    })

    // delete the workshop with this id (accessed at DELETE http://localhost:8080/api/talleres/:taller_id)
    .delete(function (req, res) {
        Taller.remove({
            _id: req.params.taller_id
        }, function (err, taller) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);
