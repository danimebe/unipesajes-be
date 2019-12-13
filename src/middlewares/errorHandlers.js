const boom = require('@hapi/boom');
const config = require('../config/config');

const withErrorStack = (error, stack) => {
    console.log(error);
    if (config.dev) {
        return { ...error, stack }
    }

    return error;
}

const wrapErrors = (error, req, res, next) => {
    if (error.isBoom) {
        next(boom.badImplementation(error));
    }

    next(error);
}

const logErrors = (error, req, res, next) => {
    next(error);
}

const errorHandler = (error, req, res, next) => {
    console.log(error);
    const { output: { statusCode, payload } } = error;
    res.status(statusCode);
    res.json(withErrorStack(payload, error.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler
}