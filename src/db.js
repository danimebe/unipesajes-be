const mongoose = require('mongoose');
const config = require('./config/config')


mongoose.connect(config.urldb, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;

    console.log('DB ONLINE!');
});
