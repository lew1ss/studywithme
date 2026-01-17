const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool( {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Veritabanı bağlantı hatası: ', err);
        return;
    }
    console.log('Veritabanı bağlantısı başarılı.')
    release();
});

module.exports = pool;