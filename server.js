var createError = require('http-errors');
var express = require('express');
const cors = require('cors')
// SOME LINES ARE COMMENTED CAUSE I´LL JUST STARTED WITH A BASIC CRUDS =)
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/routes'));
// app.use('/api', require('./routes/localRoutes'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
const hostname = '127.0.0.1';
const port = 8000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;