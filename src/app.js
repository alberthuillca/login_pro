const express = require('express');
const app = express();

app.set('port',process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(require('./controller/authController'));

module.exports = app;