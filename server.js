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
const path = require('path');

// render static files from build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// use cors
app.use(cors({
    // credentials: true
}));

app.use(express.urlencoded({extended: true}))

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// attach data to req.body
app.use(express.json());

// create session store
const connection = mysql.createPool({
    host: process.env.HOST,
    port: 3306,
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
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: sessionStore
}));

// ensure authentication
const authenticated = (req, res, next) => {
    if(req.session.auth) {
        next();
    } else {
        res.redirect('/');
    }
}

// login
app.post('/api/v1/login', (req, res, next) => {

    // get input from front
    const { username, password } = req.body;

    // if user have session data destroy it
    // if(req.session) {
    //     res.redirect('/profile');
    // };   

    try {

        // find user 
        db.query(`SELECT * from users WHERE username = ?`, username, async (err, user) => {
            if(err) throw err;

            // user not found
            if(!user)  {
                res.status(404).json({message: "User Not Found"})
            } else {

                // compare passwords 
                console.log(user)
                const matchedPassword = await bcrypt.compare(password, user[0].hashPassword);

                // password doesn't match
                if(matchedPassword === false) {
                    res.json({message: "Bad Credentials", user, matchedPassword})
                } else {

                    // user found
                    req.session.user = user[0].username;
                    req.session.auth = true;
                    console.log(req.session);
                    res.status(200).send({message: 'Success' , user});
                }
            }
        })
        
    } catch (error) {
        next(error);
    }

});

// register 
app.post('/api/v1/register', async (req, res, next) => {
    
    // get input from user
    const { username, password } = req.body;

    try {
        // if user already exists
        db.query(`SELECT username FROM users WHERE username = ?`, username, (err, user) => {
            if (err) res.status(400).json({message: 'Error Occurred'})
            if (!user) res.status(400).json({message: 'User Not Found'});
        });

        // create user 
        const salt = await bcrypt.genSalt(2);
        const hashedPassword = await bcrypt.hash(password, salt);
        db.query(`INSERT INTO users (username, hashPassword) VALUES (?, ?)`, [username, hashedPassword], (err, user) => {
            if (err) next(err);
            res.status(200).json({message: 'User Created!', user});
        })
    } catch (err) {
        next(err);
    }
});

// logout 
app.post('/api/v1/logout', authenticated, (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect('/'); 
    })
});

// get user
app.get('/api/v1/user', authenticated, (req, res, next) => {
    // user should already be logged in, using session data to get data
    db.query(`SELECT * FROM users WHERE username = ?`, req.session.user, (err, user) => {
        if(err) next(err);
        res.send(user);
    });
});

// add/edit description
app.put('/api/v1/description', authenticated, (req, res, next) => {
    // grab input from user
    const { description } = req.body;

    // find description based on session data
    db.query(`UPDATE users SET description = ? WHERE username = ?`, [description, req.session.user], (err, result) => {
        console.log(description, req.session.user);
        if(err) next(err);
        res.sendStatus(200);
    });

});

// get all articles 
app.get('/api/v1/articles', authenticated, async (req, res, next) => {

    // query database
    db.query('SELECT * FROM articles;', (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });

});

// get individual article 
app.get('/api/v1/articles/:id', authenticated, async (req, res, next) => {

    // query database
    db.query(`SELECT * FROM articles WHERE id = ?;`, req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    }); 

});

// get aritcles belonging to user 
app.get('/api/v1/user/articles', authenticated, async (req, res, next) => {

    console.log(req.session.user);

    // using session data to get user's articles
    db.query(`SELECT * FROM articles WHERE user_name = ?`, req.session.user, (err, result) => {
        if(err) next(err);
        res.send(result);
    })
});

// delete article belonging to user
app.delete('/api/v1/user/articles/delete', authenticated, async (req, res, next) => {

    // delete article
    db.query(`DELETE FROM articles WHERE id = ?`, req.body.id, (err, result) => {
        if(err) next(err);
    });

    // delete all comments belonging to article
    // db.query(`DELETE FROM comments WHERE article_id = ?`, req.body.id, (err, result) => {
    //     if(err) next(err);
    //     res.send(200);
    // });
});

// get article's comments
app.get('/api/v1/articles/:id/comments', authenticated, async (req, res, next) => {

    // query database
    db.query(`SELECT * FROM comments WHERE article_id = ?;`, req.params.id, (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });

});

// add comment 
app.post('/api/v1/articles/:id/comments', authenticated, async (req, res, next) => {

        // post comment in database
        db.query(`INSERT INTO comments (article_id, user_name, comments, created) 
        VALUES (?, ?, ?, ?)`, [req.body.article_id, req.session.user, req.body.comments, req.body.created], (err, result) => {
            if(err) {
                console.log(err);
            }
            res.send(result);
        });
});

// create article
app.post('/api/v1/articles/create', authenticated, async (req, res, next) => {

    // post article in database
    db.query(`INSERT INTO articles (user_name, created, title, subtitle, mardown) 
    VALUES (?, ?, ?, ?, ?)`, [req.session.user, new Date().toISOString().substring(0, 10), req.body.title, req.body.subtitle, req.body.markdown], (err, result) => {
        if(err) {
            console.log(err);
        }
        res.send(result);
    });
});

// edit article
app.put('/api/v1/articles/:id/edit', authenticated, async (req, res, next) => {

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