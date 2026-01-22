const express = require('express');
const pool = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);

app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            status: 'OK',
            dbTime: result.rows[0],
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database connection failed.' });
    }
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});