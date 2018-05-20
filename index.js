const express =require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))
app.use(passport.initialize())
//app.use(passport.session())
require('./config/passportConfig')(passport)
app.use(require('morgan')('dev'))
require('./routes/loginRoutes')(app);
require('./routes/testRoutes')(app)

app.listen(3001)

