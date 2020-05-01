var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get(
	"/auth/google",
	passport.authenticate("google", {prompt: 'select_account', scope: "email" })
);

router.get(
	"/auth/google/redirect",
	passport.authenticate("google", { failureRedirect: "http://localhost:3001/", session: false }),
	function(req, res) {
		res.cookie('jwt', jwt.sign({email: req.user.email}, 'superprivatesecret'));
		res.redirect("http://localhost:3001/");
	}
);

module.exports = router;
