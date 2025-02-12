const passport = require('passport');
const localStrategy = require('./localStrategy');
// const googleStrategy = require('./googleStrategy'); // Uncomment when enabling Google login

passport.use(localStrategy);

module.exports = passport;