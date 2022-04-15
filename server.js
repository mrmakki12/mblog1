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
const options = {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    createDatabaseTable: true,
}
const connection = mysql.createConnection(options);
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
    console.log(req.body)

    // find user 
    db.query(`SELECT * from users WHERE username = 'TyreeckGoat'`, (err, user) =>{
        if(err) throw err;
        if(!user)  {
            res.send({message: "User Doesn't Exist Lil-bih"})
        } else {
            req.session.user = { user } ;
            console.log(req.session, user);
            res.send({message: 'You are logged in' })
        }
        // res.redirect('/profile');
    })
    
})

// register 
app.post('/api/v1/register', async (req, res) => {

    // get input from front
    const { username, password } = req.body;
    // check if user already exist
    db.query(`SELECT username from users WHERE username = ?`, username, async (user, err) => {
        if (err) throw err;
        if(user) res.status(409).send({message: 'User Already Exists!'});

        // create user
        const hashedPassword = await bcrypt.hash(password, 3);
        db.query(`INSERT INTO users (username, hashPassword) values` [username, hashedPassword], (err) => {
            if (err) throw err;
            res.redirect('/');
        });

    })
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