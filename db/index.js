// require pg to connect to postgres db
const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

// postgres://rfllaxqjoxpkdw:f994f0ad163cd7fca5565264067f51a3fddc55d18fcfccab776eed0f38a49a39@ec2-34-207-12-160.compute-1.amazonaws.com:5432/ddch46khuff2fa

// username: rfllaxqjoxpkdw
// password:f994f0ad163cd7fca5565264067f51a3fddc55d18fcfccab776eed0f38a49a39 