// express
const express = require('express');
const app = express();
// environment variables
require('dotenv').config();
// cookie parser
const cookieParser = require('cookie-parser');
// data base connector
const db = require('./db');
// cors
const cors = require('cors');
// sessions
const session = require('express-session');
// passport
const passport = require('passport');
const { prependListener } = require('./db');
// bycrypt
const bcrypt = require('bcrypt');

// use cors
app.use(cors({
    origin: '*',
    credentials: true
}));

// attach data to req.body
app.use(express.json());

// session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// cookie parser
app.use(cookieParser(process.env.SECRET));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config')(passport);

// login
app.post('/api/v1/login', passport.authenticate('local', (err, user, info ) => {
    if(err) throw err;
    if(!user) res.send('No User');
    req.logIn(user, err => {
        if(err) throw err;
        res.send('Login successful');
    })
}));

// register 
app.post('/api/v1/register', (req, res) => {

    // check if user exists
    db.query(`SELECT * FROM users WHERE username = ?`, req.body.username, async (err, result) => {
        if(err) throw err;
        if(result) {
            res.send('User Already Exists');
        }
        const hashPassword = await bcrypt.hash(req.body.hashPassword, 10);
        db.query(`INSERT INTO users (username, hashPassword) VALUES (?, ?)`, [req.body.username, hashPassword]);
    });
})


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