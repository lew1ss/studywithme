const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await authService.registerUser(username, password);

        res.status(201).json({
            message: 'User registered successfully.',
            user,
        });
    } catch (err) {
        res.status(400).json({ err: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const data = await authService.loginUser(username,password);

        res.json(data);
    } catch (err) {
        res.status(401).json({ err: error.message });
    }
};

module.exports = {
    register,
    login,
};