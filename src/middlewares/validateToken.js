const boom = require('@hapi/boom');
const config = require('../config/config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const validateAdminToken = async (req, res, next) => {

    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'No token provided'
            })
        }

        const validateToken = jwt.verify(token, config.token);

        const userAdmin = await User.findById(validateToken.id);

        if (!userAdmin.admin) {
            return res.status(401).json({
                ok: false,
                message: "The user isn't an admin"
            })
        }

        next();

    } catch (error) {
        next(boom.unauthorized(error));
    }
}

module.exports = validateAdminToken;