const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/api/user/signin', async (req, res, next) => {
    const { username, password } = req.body;
    const user = new User({
        username,
        password
    })
    user.password = await user.encryptPassword(user.password);
    user.save();
    res.status(201).json({
        ok: true,
        message: 'User registered succesfully'
    })
})

router.post('/api/user/signup', (req, res, next) => {
    res.send('ok');
})

module.exports = router;
