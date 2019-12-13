require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/config');

const {
    logErrors,
    wrapErrors,
    errorHandler
} = require('./middlewares/errorHandlers');

// BD CONECTION
require('./db');

const server = () => {

    // MIDDLEWARES
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use(require('./routes/index'));

    // ERROR HANDLERS MIDDLEWARES
    app.use(logErrors);
    app.use(wrapErrors);
    app.use(errorHandler);



    app.listen(config.port, () => {
        console.log('Server on port:', config.port);
    })
}

server();