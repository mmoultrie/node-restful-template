var express = require('express');
var app = express();                 
var bodyParser = require('body-parser');
var config = require('./config');
var models = require('./models');
var router = require('./routes/router');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);

//enable cors for dev
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	next();
});


models.sequelize.sync().then(function () {
	app.listen(config.port);
});
console.log('Application is running on port: ' + config.port);