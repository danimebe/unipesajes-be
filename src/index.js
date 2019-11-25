require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./db');

const server = () => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    app.use(require('./routes/index'));

    app.listen(process.env.PORT, () => {
        console.log('Server on port:', process.env.PORT);
    })
}

server();