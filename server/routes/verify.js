var jwt = require('jsonwebtoken');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

// create application/x-www-form-urlencoded parser
var parser = bodyParser.urlencoded({ extended: false })

router.post('/', parser, function(req, res) {
    try {
        jwt.verify(req.body.mycookie, 'superprivatesecret');
        res.send('true');
    } catch(err){
        res.send('false');
    }
});

module.exports = router;