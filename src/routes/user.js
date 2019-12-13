const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');
const validateAdminToken = require('../middlewares/validateToken');

router.post('/api/user/signup', validateAdminToken, async (req, res) => {

    try {

        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'No token provided'
            })
        }

        const validateToken = jwt.verify(token, config.token);
        
        const userAdmin =  await User.findById(validateToken.id);
        console.log(userAdmin);

        if(!userAdmin.admin){
            return res.status(401).json({
                ok: false,
                message: "The user isn't an admin"
            })
        }

        const { username, email, password, admin } = req.body;

        
        const user = new User({
            username,
            email,
            password,
            admin
        });

        user.password = await user.encryptPassword(user.password);

        await user.save();

        res.status(201).json({
            ok: true,
            message: 'User created successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: error
        })
    }



})

router.post('/api/user/signin', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'User or password incorrect'
            })
        }

        const validatedPassword = await user.validatePassword(password);
        if (!validatedPassword) {
            return res.status(404).json({
                ok: false,
                message: 'User or password incorrect'
            })
        }

        const token = jwt.sign({ id: user._id }, config.token, {
            expiresIn: 60 * 60
        });

        res.status(200).json({
            ok: true,
            token
        })


    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;
