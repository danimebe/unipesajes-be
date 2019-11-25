const app = require('express')();

app.use(require('./category'));
app.use(require('./product'));
app.use(require('./user'));

module.exports = app;