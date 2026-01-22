const pool = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

const registerUser = async (username, password) => {
    // kullanıcı var mı?
    const existingUser = await pool.query(
        'SELECT id FROM swm_users WHERE username = $1',
        [username]
    );

    if (existingUser.rows.length > 0) {
        throw new Error('Username already exists.');
    }

    const passwordHash = await hashPassword(password);

    const result = await pool.query(
        `INSERT INTO swm_users (username,password_hash)
         VALUES ($1, $2)
         RETURNING id, username`,
         [username, passwordHash]
    );

    return result.rows[0];
};

const loginUser = async (username,password) => {
    const result = await pool.query(
        'SELECT * FROM swm_users WHERE username = $1',
        [username]
    );

    if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
    }

    const user = result.rows[0];

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
        },
    };
};

module.exports = {
    registerUser,
    loginUser,
};