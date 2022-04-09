// express
const express = require('express');
// environment variables
require('dotenv').config();
// data base connector
const db = require('./db');
// cors
const cors = require('cors');

// express instance 
const app = express();

// use cors
app.use(cors());

// attach data to req.body
app.use(express.json());

// get all articles 
app.get('/api/v1/articles', async (req, res, next) => {

    try {

        // query database
        const results = await db.query('SELECT * FROM articles;');

        // send results
        res.status(200).json({
            results: results.rows
        });

        // handle error
    } catch (err) {

        next(err);
    }
});

// get individual article 
app.get('/api/v1/articles/:id', async (req, res, next) => {

    try {

        // query database
        const article = await db.query(`SELECT * FROM articles WHERE id = $1;`, [req.params.id]);

        // send back data
        res.status(200).json({
            article: article
        });

        // handle error
    } catch (err) {

        next(err);
    }
});

// get article's comments
app.get('/api/v1/articles/:id/comments', async (req, res, next) => {

    try {

        // query database
        const comments = await db.query(`SELECT * FROM comments WHERE article_id = $1;`, [req.params.id]);

        // send back data
        res.status(200).json({
            comments: comments
        });

        // handle error
    } catch (err) {

        next(err);
    }
});

// add comment 
app.post('/api/v1/articles/:id/comments', async (req, res, next) => {

    try {

        // post comment in database
        const comment = await db.query(`INSERT INTO comments (article_id, author, text) 
        VALUES ($1, $2, $3) returning *;`, [req.body.article_id, req.body.author, req.body.text]);

        // send comment back
        res.status(201).json({
            comment
        });

        // handle error
    } catch (err) {
        
        next(err);
    } 
})

// listen
const port = process.env.PORT || 3001;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    })
}

app.listen(port, () => {
    console.log(`Server now listening on PORT ${port}`);
});