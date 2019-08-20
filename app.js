const express = require("express");
const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const bodyParser = require ("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//db config
const db = require('./config/keys').mongoURI;

//passport config
require('./config/passport')(passport);

//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));

app.use('/', require("./routes/index"));
app.use('/', require("./routes/admin"));
app.use('/', require("./routes/auth"));

app.listen(port, () => console.log(`le harvey wenstein est là!`));