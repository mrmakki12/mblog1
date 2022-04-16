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
// mysql and its store
const mysql = require('mysql');
const MySQLStore = require('express-mysql-session')(session);
// bycrypt
const bcrypt = require('bcrypt');
// use cors
app.use(cors());

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// attach data to req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// create session store
const connection = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    createDatabaseTable: true,
});
const sessionStore = new MySQLStore({connectionLimit: 10}, connection);

// session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: sessionStore
}));


// login
app.post('/api/v1/login', (req, res) => {

    // get input from front
    const { username, password } = req.body;

    // find user 
    db.query(`SELECT * from users WHERE username = ?`, username, async (err, user) => {
        if(err) throw err;
        // user not found
        if(!user)  {
            res.status(404).json({message: "User Not Found"})
        }
        // compare passwords 
        const hashedPassword = await bcrypt.hash(password, 3);
        const matchedPassword = await bcrypt.compare(password, hashedPassword);
        // password doesn't match
        if(!matchedPassword) {
            res.status(403).json({message: "Bad Credentials", user, matchedPassword})
        } else {
        // user found
        req.session.user = { user: user[0].username } ;
        console.log(req.session);
        res.status(200).json({message: 'Success' , user})
        }
    })
    
})

// register 
app.post('/api/v1/register', async (req, res, next) => {
    
    // get input from user
    const { username, password } = req.body;

    try {
        // if user already exists
        db.query(`SELECT username FROM users WHERE username = ?`, username, (err, user) => {
            if (err) next(err);
            if (!user) res.status(404).json({message: 'User Not Found'});
        });

        // create user 
        const hashedPassword = await bcrypt.hash(password, 3);
        db.query(`INSERT INTO users (username, hashPassword) VALUES (?, ?)`, [username, hashedPassword], (err, user) => {
            if (err) next(err);
            res.status(200).json(user);
        })
    } catch (err) {
        next(err);
    }
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