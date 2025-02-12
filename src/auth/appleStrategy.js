const AppleStrategy = require('passport-apple');
const User = require('../models/user'); 

module.exports = new AppleStrategy(
    {
        clientID: process.env.APPLE_CLIENT_ID,
        teamID: process.env.APPLE_TEAM_ID,
        keyID: process.env.APPLE_KEY_ID,
        privateKeyString: process.env.APPLE_PRIVATE_KEY,
        callbackURL: process.env.APPLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOrCreate(profile);
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
);
