var jwt = require('jsonwebtoken');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function(req, res) {
    try {
        jwt.verify(req.body.mycookie, 'superprivatesecret');
        res.send('true');
    } catch(err){
        console.log(req);
        res.send('false');
    }
});

module.exports = router;