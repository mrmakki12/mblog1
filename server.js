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
        VALUES (?, ?, ?) returning *;`, [req.body.article_id, req.body.user_name, req.body.comments, req.body.created], (err, result) => {
            if(err) {
                console.log(err);
            }
            res.send(result);
        });
});

// listen
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server now listening on PORT ${port}`);
});