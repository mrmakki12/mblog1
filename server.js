// express
const express = require('express');
const app = express();

// environment variables
require('dotenv').config();

// data base connector
const db = require('./db');

// cors
const cors = require('cors');

// sessions
const session = require('express-session');

// passport and passport local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// session management and authentication section
// create session
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// initalize passport
app.use(passport.initialize());

// implement session
app.use(passport.session());

// testing onlyu
app.get('/users', (req, res) => {
    db.query(`SELECT * FROM users WHERE username = 'TyreeckGoat'`, (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result);
    })
})

// implement local strategy
passport.use(new LocalStrategy(
    function(username, password, done) {
        db.query(`SELECT * FROM users WHERE username = ?`, username, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user) {
                return done(null, false);
            }
            if(user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        })
    }
))

// use cors
app.use(cors({origin: '*'}));

// attach data to req.body
app.use(express.json());

// get all articles 
app.get('/api/v1/articles', async (req, res, next) => {

    // query database
    db.query('SELECT * FROM articles;', (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });

});

// get individual article 
app.get('/api/v1/articles/:id', async (req, res, next) => {

    // query database
    db.query(`SELECT * FROM articles WHERE id = ?;`, req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    }); 

});

// get article's comments
app.get('/api/v1/articles/:id/comments', async (req, res, next) => {

    // query database
    db.query(`SELECT * FROM comments WHERE article_id = ?;`, req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });

});

// add comment 
app.post('/api/v1/articles/:id/comments', async (req, res, next) => {

        // post comment in database
        db.query(`INSERT INTO comments (article_id, user_name, comments, created) 
        VALUES (?, ?, ?, ?)`, [req.body.article_id, req.body.user_name, req.body.comments, req.body.created], (err, result) => {
            if(err) {
                console.log(err);
            }
            res.send(result);
        });
});

// create article
app.post('/api/v1/articles/create', async (req, res, next) => {

    // post article in database
    db.query(`INSERT INTO articles (user_name, created, title, subtitle, mardown) 
    VALUES (?, ?, ?, ?, ?)`, ['TyreeckGoat', new Date().toISOString().substring(0, 10), req.body.title, req.body.subtitle, req.body.markdown], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

// edit article
app.put('/api/v1/articles/:id/edit', async (req, res, next) => {

    // update article
    db.query(`UPDATE articles SET created = ?, title = ?, subtitle = ?, mardown = ?
    WHERE id = ?;`, [new Date().toISOString().substring(0, 10), req.body.title, req.body.subtitle, req.body.markdown, req.params.id], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    })
});

// listen
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server now listening on PORT ${port}`);
});