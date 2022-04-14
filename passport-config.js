const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const db = require('./db');

module.exports = function (passport) {

    passport.use(new LocalStrategy(
        function(username, password, done) {
            db.query(`SELECT * FROM users WHERE username = ?`, username, (err, user) => {
                if(err) {
                    return done(err);
                }
                if(!user) {
                    return done(null, false);
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) throw err;
                    if(result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            })
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser((username, done) => {
        db.query(`SELECT * FROM users WHERE username = ?`, username, (err, user) => {
            if (err) return done(err);
            done(null, user);
        });
    });
};