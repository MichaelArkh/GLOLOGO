var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
  clientID: "422726650342-hlqa22lhrpaqg6hm0efrkji4arqrtqvs.apps.googleusercontent.com",
  clientSecret: "1C3UyX1pLjsRowVX7p626bly",
  callbackURL: "/auth/google/redirect"
},
function(accessToken, refreshToken, profile, done) {
  const User = {
    email: profile.emails[0].value
  }
  done(null, User);
}
));