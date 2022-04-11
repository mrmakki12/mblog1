// require pg to connect to postgres db
const { Pool } = require('pg');

const pool = new Pool({
    user: 'rfllaxqjoxpkdw',
    database: 'ddch46khuff2fa',
    port: 5432,
    host: 'ec2-34-207-12-160.compute-1.amazonaws.com',
    password: 'f994f0ad163cd7fca5565264067f51a3fddc55d18fcfccab776eed0f38a49a39'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};

// postgres://rfllaxqjoxpkdw:f994f0ad163cd7fca5565264067f51a3fddc55d18fcfccab776eed0f38a49a39@ec2-34-207-12-160.compute-1.amazonaws.com:5432/ddch46khuff2fa

// username: rfllaxqjoxpkdw
// password:f994f0ad163cd7fca5565264067f51a3fddc55d18fcfccab776eed0f38a49a39 